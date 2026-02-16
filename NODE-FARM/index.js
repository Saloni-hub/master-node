const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate")
const slugify = require("slugify")

// SERVER 
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8",
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8",
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8",
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const slug = dataObj.map((el) => slugify(el.productName,{lower:true}))

console.log(slug);

const server = http.createServer((req, res) => {
 const {query,pathname:pathName} = url.parse(req.url,true)

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardHtml = dataObj.map((el) => replaceTemplate(templateCard,el))
    const output = templateOverview.replace('{%PRODUCT_CARDS%}',cardHtml)
    res.end(output);
  } else if (pathName === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct,product)
    res.end(output);
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, () => {
  console.log("lisitening from 8000 port");
});

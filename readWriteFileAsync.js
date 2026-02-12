const fs = require('fs');

// non -blocking
fs.readFile('./txt/start.txt','utf-8' , (err,data1) => {
    console.log(data1);
    if(err) return console.log("error");
    
    
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2) => {
        console.log(data2);
        fs.readFile('./txt/input.txt','utf-8',(err,data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err => {
                console.log("file written");
                
            })
            
        })
    })    
})

console.log("Reading file!");


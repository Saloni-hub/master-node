const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json()); // convert body in json if not add middleware then body is undefined

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server", app: "natours" });
});

// app.post('/',(req,res) => {
//     res.status(200).send("youc can post to this endpoint")
// })
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

const getAllTours = (req, res) => {
  res.status(200).json({
    success: true,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
}

const getTour = (req, res) => {
  const { id: tourId } = req.params; //convert string to numbers thats why multiply by 1
  const tour = tours.find((tour) => tour.id === tourId * 1);
  if (!tour) {
    return res.send(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    success: true,
    data: {
      tour,
    },
  });
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    },
  );
}

const updateTour = (req, res) => {
  const { id: tourId } = req.params; //convert string to numbers thats why multiply by 1
  const tour = tours.find((tour) => tour.id === tourId * 1);
  if (!tour) {
    return res.send(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated tour here",
    },
  });
}

const deleteTour = (req, res) => {
  const { id: tourId } = req.params; //convert string to numbers thats why multiply by 1
  const tour = tours.find((tour) => tour.id === tourId * 1);
  if (!tour) {
    return res.send(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null
  });
}


// app.get("/api/v1/tours", getAllTours);

// app.get("/api/v1/tours/:id", getTour);

// app.post("/api/v1/tours", createTour);

// app.patch("/api/v1/tours/:id", updateTour);

// app.delete("/api/v1/tours/:id", deleteTour);


app.route("/api/v1/tours").get(getAllTours).post(createTour)
app.route("/api/v1/tours/:id").get(getTour).patch(updateTour).delete(deleteTour)


// listen
const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});

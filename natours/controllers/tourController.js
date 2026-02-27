// const fs = require("fs");
// const Tour = require("../models/tourModel");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// exports.checkId = (req,res,next,val) => {
//     if (val > tours.length) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }
//   next();
// }

// exports.checkBody = (req, res, next) => {
//   const { name, price } = req.body || {};

//   if (!name || !price) {
//     return res.status(400).json({
//       status: "fail",
//       message: "name or price not provided",
//     });
//   }
//   next();
// }

// exports.getAllTours = (req, res) => {
//   res.status(200).json({
//     success: true,
//     requestedAt: req.requestTime,
//     results: tours.length,
//     data: {
//       tours: tours,
//     },
//   });
// };

// exports.getTour = (req, res) => {
//   const { id: tourId } = req.params; //convert string to numbers thats why multiply by 1
//   const tour = tours.find((tour) => tour.id === tourId * 1);

//   res.status(200).json({
//     success: true,
//     data: {
//       tour,
//     },
//   });
// };

// exports.createTour = (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: "success",
//         data: {
//           tour: newTour,
//         },
//       });
//     },
//   );
// };

// exports.updateTour = (req, res) => {
//   const { id: tourId } = req.params; //convert string to numbers thats why multiply by 1
//   const tour = tours.find((tour) => tour.id === tourId * 1);

//   res.status(200).json({
//     status: "success",
//     data: {
//       tour: "Updated tour here",
//     },
//   });
// };

//  exports.deleteTour = (req, res) => {
//   res.status(204).json({
//     status: "success",
//     data: null,
//   });
// };

// without json file and using mongoose to create tours in the database

const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      success: true,
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // await newTour.save();
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
 try {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
 } catch (error) {
  res.status(400).json({
    status: "fail",
    message: error,
  });
 }
};

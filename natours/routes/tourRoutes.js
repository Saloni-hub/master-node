const express = require("express");

const router = express.Router();
const tourController = require("../controllers/tourController");

const { getAllTours, createTour, getTour, updateTour, deleteTour, checkId,checkBody } =
  tourController || {};

// app.get("/api/v1/tours", getAllTours);

// app.get("/api/v1/tours/:id", getTour);

// app.post("/api/v1/tours", createTour);

// app.patch("/api/v1/tours/:id", updateTour);

// app.delete("/api/v1/tours/:id", deleteTour);

router.param("id", checkId);

// CREATE chackbody middleware check body contians name and price property if not send 400 add it in post handler stack

router.route("/").get(getAllTours).post(checkBody,createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;

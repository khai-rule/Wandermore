const Trip = require("../../models/Trip");

const newTripSeed = async (req, res) => {
  const seedTrip = {
    departureDate: "2022-12-17", //not sure if this will work
    returnDate: "2023-01-07", //not sure if this will work
    country: "Iceland",
    activityPreference: "Adventure",
    accomodationPreference: "Other",
    pax: 2,
    paxInfo: "No dietary restriction",
    otherInfo: "Camping",
    activities: ["639b3025f670553ed36ca43c", "639b3025f670553ed36ca43d"]
  };
  await Trip.deleteMany({});

  const trip = await Trip.insertMany(seedTrip);

  res.json(trip);
};

module.exports = newTripSeed;
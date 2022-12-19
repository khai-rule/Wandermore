const Trip = require("../../models/Trip");

const newTripSeed = async (req, res) => {
  const seedTrip = {
    departureDate: "2022-12-29T00:00:00.000+00:00",
    returnDate: "2023-01-05T00:00:00.000+00:00", 
    country: "Iceland",
    activityPreference: "Adventure",
    accomodationPreference: "Other",
    pax: 2,
    paxInfo: "No dietary restriction",
    otherInfo: "Camping",
    activities: ["63a01f2ee048653abaa78847", "63a02030e048653abaa78850"]
  };
  await Trip.deleteMany({});

  const trip = await Trip.insertMany(seedTrip);

  res.json(trip);
};

module.exports = newTripSeed;

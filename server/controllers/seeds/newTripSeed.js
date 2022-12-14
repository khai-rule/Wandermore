const NewTrip = require("../../models/NewTrip");

const newTripSeed = async (req, res) => {
  const seedNewTrip = {
    departureDate: Date("2022-12-17"), //not sure if this will work
    returnDate: Date("2023-01-07"), //not sure if this will work
    country: "Iceland",
    activityPreference: "Adventure",
    accomodationPreference: "Other",
    pax: 2,
    paxInfo: "No dietary restriction",
    otherInfo: "Camping",
  };
  await NewTrip.deleteMany({});

  const newTrip = await NewTrip.insertMany(seedNewTrip);

  res.json(newTrip);
};

module.exports = newTripSeed;

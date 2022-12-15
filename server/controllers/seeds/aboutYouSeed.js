const AboutYou = require("../../models/AboutYou");
const User = require("../../models/User"); 

const seed = async (req, res) => {
  const seedAboutYou = {
      dateOfBirth: "20081996",
      hobbies: ["Cycling", "Bowling"],
      countryOfResidence : "Singapore",
      dietaryRestrictions: "Vegan",
      accessibility: "Nil",
      user: "639a7bad282f5a048d1f47bd"
  };
  await AboutYou.deleteMany({});

  const aboutYou = await AboutYou.insertMany(seedAboutYou);


  res.json(aboutYou);
};

module.exports = seed;

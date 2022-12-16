const AboutYou = require("../../models/AboutYou");


const seed = async (req, res) => {
  const seedAboutYou = {
      dateOfBirth: "20081996",
      hobbies: ["Cycling", "Bowling"],
      countryOfResidence : "Singapore",
      dietaryRestrictions: "Vegan",
      others: "Nil",
  };
  await AboutYou.deleteMany({});

  const aboutYou = await AboutYou.insertMany(seedAboutYou);


  res.json(aboutYou);
};

module.exports = seed;

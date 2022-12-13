const AboutYou = require("../../models/AboutYou");

const seed = async (req, res) => {
  const seedAboutYou = [
    {
      dateOfBirth: 20081996,
      hobbies: ["Cycling", "Bowling"],
      countryOfResidence : "Singapore",
      dietaryRestrictions: "Vegan",
      accessibility: "Nil"
  },
  {
    dateOfBirth: 20081926,
    hobbies: ["Cycling", "Water Sports"],
    countryOfResidence : "Malaysia",
    dietaryRestrictions: "Herbivore",
    accessibility: "Nil"
},

  ];
  await AboutYou.deleteMany({});

  const aboutYou = await AboutYou.insertMany(seedAboutYou);

  res.json(aboutYou);
};

module.exports = seed;

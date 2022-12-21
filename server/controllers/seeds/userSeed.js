const User = require("../../models/User");

const userSeed = async (req, res) => {
  //   const saltRounds = 10;
  const users = [
    {
      email: "johntan@gmail.com",
      firstName: "John",
      lastName: "Tan",
      password: "Jt1234",

      //   password: bcrypt.hashSync("1q2w3e4r", saltRounds),
    },
    {
      email: "bobbylee@hotmail.com",
      firstName: "Bobby",
      lastName: "Lee",
      password: "Bl4321",

      //   password: bcrypt.hashSync("qawsedrf", saltRounds),
    },
    {
      email: "janegoh@msn.com",
      firstName: "Jane",
      lastName: "Goh",
      password: "Jg1111",
      //   password: bcrypt.hashSync("azsxdcfv", saltRounds),
    },
  ];
  try {
    await User.deleteMany({});
    const newUser = await User.create(users);
    res.json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = userSeed;

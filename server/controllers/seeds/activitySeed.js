const Activity = require("../../models/Activity");

const seed = async (req, res) => {
  const seedActivity = {
    name: "Aurora Reykjavik",
    date: "30 Jan 2023",
    time: 1000,
    duration: 120,
    location: "Grandagarður 2, 101 Reykjavík, Iceland",
    photos: "https://guidetoiceland.imgix.net/198987/x/0/",
    description: "Learn how the northern lights are formed at Aurora Reykjavik, Iceland’s first educational and recreational northern lights center. Signs explain the history and science behind this natural phenomenon. The center will introduce you to folktales, local myths, and legends that will help you put the northern lights in the context of Icelandic culture. Watch a display of images of the phenomenon shot at various locations from the relaxing seats of the small movie theater. A gift shop offers a selection of souvenirs made by Icelanders, along with a complimentary cup of coffee. The staff will give you helpful information on how to see the northern lights for yourself.",
  };
  await Activity.deleteMany({});

  const activity = await Activity.insertMany(seedActivity);

  res.json(activity);
};

module.exports = seed;

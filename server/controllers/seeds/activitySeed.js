const Activity = require("../../models/Activity");

const seed = async (req, res) => {
  const seedActivity = [
    {
      name: "Aurora Reykjavik",
      date: "30 Jan 2023",
      time: 1000,
      duration: 120,
      location: "Grandagarður 2, 101 Reykjavík, Iceland",
      photos: "https://guidetoiceland.imgix.net/198987/x/0/",
      description: "Learn how the northern lights are formed at Aurora Reykjavik, Iceland’s first educational and recreational northern lights center. Signs explain the history and science behind this natural phenomenon. The center will introduce you to folktales, local myths, and legends that will help you put the northern lights in the context of Icelandic culture. Watch a display of images of the phenomenon shot at various locations from the relaxing seats of the small movie theater. A gift shop offers a selection of souvenirs made by Icelanders, along with a complimentary cup of coffee. The staff will give you helpful information on how to see the northern lights for yourself.",
    },
    {
        name: "Reykjavik Food Walk - Local Foodie Adventure in Iceland",
        date: "01 Feb 2023",
        time: 1400,
        duration: 150,
        location: "Grandagarður 2, 101 Reykjavík, Iceland",
        photos: ["https://i0.wp.com/hiddeniceland.is/wp-content/uploads/2019/10/Reykjavi%CC%81k-Food-Walk-Wake-up-Reykajvi%CC%81k-Hidden-Iceland-3.jpg?fit=1440%2C960&ssl=1", "https://images.ctfassets.net/a68ipajj4t9l/4dfUf1gsPXz2pap1LiAOzT/a7db672b03e6f3e4a3c472379c904f80/WR01.jpg?w=2400&q=60"],
        description: "Local food, city & history tour of Reykjavik.In the tastiest sight seeing tour in Iceland, we explore down town Reykjavik through delicious local cuisines that you would never come across in your typical “to-do in Iceland” itinerary! You will stroll around the city and visit 5-6 wonderful local restaurants with a fun & knowledgeable guide by your side.In our tours you will have a chance to try the best local cuisines of Iceland in each season, like the delicious Icelandic lamb, home made Icelandic ice cream from a secret family recipe, an authentic catch of the day, Icelandic cheese, a hot dog from the famous Icelandic hot dog stand and much more!If you like to experience Reykjavik, Iceland’s history, unique cuisine, local restaurants and make new friends, you should definitely join our Reykjavik Food Walk. Just make sure you show up hungry!",
    },
];

  await Activity.deleteMany({});

  const activity = await Activity.insertMany(seedActivity);

  res.json(activity);
};

module.exports = seed;
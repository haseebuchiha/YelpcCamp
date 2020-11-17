const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 590; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fac3059eef35b2f139c0c56',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            geometry : {
                type : "Point", 
                coordinates : [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/creepbruh/image/upload/v1605532344/YelpCamp/xkjwsclels9oedvemlhq.jpg',
                  filename: 'YelpCamp/xkjwsclels9oedvemlhq'
                },
                {
                  url: 'https://res.cloudinary.com/creepbruh/image/upload/v1605532346/YelpCamp/gxwlkf2ddfwxzuqkkghg.jpg',
                  filename: 'YelpCamp/gxwlkf2ddfwxzuqkkghg'
                },
                {
                  url: 'https://res.cloudinary.com/creepbruh/image/upload/v1605532346/YelpCamp/skxmbu9tqn7qudgoauji.jpg',
                  filename: 'YelpCamp/skxmbu9tqn7qudgoauji'
                }
              ],
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
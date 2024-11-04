const mongoose = require('mongoose');
const Perfume = require('./models/Perfume');
// const db = require('./config/db');
const fs = require('fs');
require('dotenv').config();
const path = require('path');



mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("connected to mongodb"))
.catch(err => console.error("could not connect to mongodb", err))


async function seedPerfumes() {
  const perfumes = [
    {
      name: 'Cool Water',
      
      price:'$40',
      image: path.join(__dirname, './images/pf-1.svg'), // Adjust path as necessary
    },
    {
        name: 'Lataffa',
        
        price:'$80',
        image: path.join(__dirname, './images/sp-2.svg'), // Adjust path as necessary
      },
      {
        name: 'CK',
        
        price:'$50',
        image: path.join(__dirname, './images/sp-3.svg'), // Adjust path as necessary
      },
      {
        name: 'Armani code',
        
        price:'$120',
        image: path.join(__dirname, './images/sp-4.svg'), // Adjust path as necessary
      },
      {
        name: 'Gucci Bloom',
        
        price:'$100',
        image: path.join(__dirname, './images/sp-5.svg'), // Adjust path as necessary
      },
      {
        name: 'Chanel No 5',
        
        price:'$40',
        image: path.join(__dirname, './images/sp-6.svg'), // Adjust path as necessary
      },

    // Add more perfumes as needed
  ];

  for (const perfume of perfumes) {
    const image = fs.readFileSync(perfume.image);
    // Assuming you're storing the image in Base64 or a similar format
    const newPerfume = new Perfume({
      name: perfume.name,
      price: perfume.price,
      image: image.toString('base64'), // Convert to Base64
    });

    await newPerfume.save();
    console.log(`Seeded: ${perfume.name}`);
  }

  mongoose.connection.close();
}

seedPerfumes().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
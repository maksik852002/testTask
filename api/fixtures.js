const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Category = require('./models/Category');
const nanoid = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
  }, {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    token: nanoid(),
  }, {
    username: 'user2',
    password: '123',
    role: 'user',
    token: nanoid()
  });

  await Category.create({
    title: 'Politic',
    description: 'Article about politic'
  }, {
    title: 'Arts',
    description: 'Article about arts'
  }, {
    title: 'Sports',
    description: 'Article about sports'
  });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});
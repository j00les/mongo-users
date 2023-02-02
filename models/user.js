const MongoModels = require("mongo-models");
const Joi = require("joi");

const schema = Joi.object({
  _id: Joi.object(),
  name: Joi.string().required(),
  age: Joi.number(),
  address: Joi.string(),
});

class User extends MongoModels {
  static create(name, age, address) {
    //the data to be inserted
    const document = new User({
      name,
      age,
      address,
    });
    return this.insertOne(document);
  }

  static getAll() {
    return this.find();
  }
}

User.collectionName = "dsme-users";
User.schema = schema;
module.exports = User;

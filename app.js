const express = require("express");
const app = express();
const PORT = 3000;
const { MongoClient } = require("mongodb");
const User = require("./models/user");
const MongoModels = require("mongo-models");

const connection = {
  uri: "mongodb://localhost:27017",
  db: "dsme-users",
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res, next) => {
  try {
    const findUsers = await User.getAll();
    res.status(200).json(findUsers);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can't find users" });
  }
});

app.post("/users", async (req, res, next) => {
  try {
    const { name, age, address } = req.body;
    const user = await User.create(name, age, address);

    res.status(200).json({ message: "User created sucesfully" });
  } catch (error) {
    res.status(400).json({ message: "Can't create user" });
  }
});

async function main() {
  await MongoModels.connect(connection, {});
  await app.listen(PORT, () => {
    console.log("listening to", PORT);
  });
}

main();

require("dotenv").config()
const express = require("express");
 const cors = require("cors");

const app = express();
const port = 5000;
 app.use(cors());
 app.use(express.json());

// users routes middle ware
const dbConnection = require("./db/dbConfig");
const usersRoutes = require("./routers/usersRoute");
const questionRoutes =require("./routers/questionsRoute")
const answerRoutes = require("./routers/answersRoute");

// users routes middle ware
app.use("/api/users", usersRoutes);
// questions routes middle ware
app.use("/api/questions", questionRoutes);
// answers routes middle ware
app.use("/api/answers", answerRoutes);

async function start(){
    try {
       const result = await dbConnection.execute("select 'test'");
      await app.listen(port)
      console.log("dbConnect stablished")
      console.log(`listening on ${port}`)
    } catch (error) {
        console.log(error.message)
    }
};

start();


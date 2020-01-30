const express = require("express");
const mongojs = require("mongojs");

const logger = require("morgan");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "fitness";
const collections = ["Workout"];

// are these needed below?
var mongoose = require('mongoose');

const Fitness = require("./schema.js");

mongoose.connect('mongodb://localhost/fitness', { useNewUrlParser: true });
//
var path = require("path");

const db = mongojs(databaseUrl, collections);
db.on("error", error => {
    console.log("Database Error:", error);
});


app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// // Post an exercise to the mongoose database
// app.post("/api/workouts/:id", ({ body }, res) => {
//     // Save the request body as an object called book
//     const workouts = body;
//     // If we want the object to have a boolean value of false,
//     // we have to do it here, because the ajax post will convert it
//     // to a string instead of a boolean
//     Fitness.create( 
//         workouts
//         ,(err,data)=>{
//       if (err){
//         console.log(err)
//       } else {
//         res.json(data)
//       }
//     })
//   });
app.get("/api/workouts", (req, res) => {
    //console.log("This is the PUT request.")
    Fitness.find({})
        .then(data => {
            res.json(data);
        })
        .catch(e => {
            res.status(500)
        })
});

app.put("/api/workouts/:id", (req, res) => {
    // Save the request body as an object called book
    let exercise = req.body;
    const id = { _id:mongojs.ObjectId(req.params.id) };

    Fitness.findOne(id)
        .then(workout => {
            // console.log(JSON.stringify(workout))
            // console.log(workout)

           // exercise = JSON.parse( JSON.stringify(exercise));
           // workout = JSON.parse( JSON.stringify(workout));
            //delete workout._id;
            workout.exercises.push(exercise)
            workout.totalDuration += exercise.duration;
            console.log(workout);
            
            console.log("This is the PUT request.")
            Fitness.updateOne( id, workout )
                .then(data => {
                    res.json(data);
                })
                .catch(e => {
                    console.log(e)
                    res.status(500)
                })

        });
  
});


app.post("/api/workouts", (req, res) => {
    // Save the request body as an object called book
    const workouts = req.body;
    console.log("This is the post request.")
    Fitness.create(workouts)
        .then(data => {
            res.json(data);
        })
        .catch(e => {
            res.status(500)
        })
});




app.listen(3000, () => {
    console.log("App running on port 3000!");
});
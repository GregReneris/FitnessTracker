var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
    type:  String, // String is shorthand for {type: String}
    name: String,
    duration:  Number,
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number, 
});

var workoutSchema = new Schema({

    day: { type: Date, default: Date.now },
    totalDuration: { type: Number, default: 0 },
    exercises: [exerciseSchema]
    //     {
    //         type:  String, // String is shorthand for {type: String}
    //         name: String,
    //         duration:  Number,
    //         weight: Number,
    //         reps: Number,
    //         sets: Number,
    //         distance: Number, 
    //     }
    // ]
});





const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;


// let workoutSeed = [
//     {
//       day: new Date().setDate(new Date().getDate()-10),
//       exercises: [
//         {
//           type: "resistance",
//           name: "Bicep Curl",
//           duration: 20,
//           weight: 100,
//           reps: 10,
//           sets: 4
//         }
//       ]
//     }]
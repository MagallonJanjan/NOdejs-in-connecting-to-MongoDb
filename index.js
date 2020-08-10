// Configuration part
// ------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3231

// Create express app
const app = express();
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
});



// Set up default mongoose connection
let db_url = 'mongodb://127.0.0.1/db_exercise';
mongoose.connect(db_url, { useNewUrlParser: true });
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//
// Let's start the exercise :
//
// During ALL the exercise the requests have to be connected with the database
//
// Context : We want to create a web application to manage a motorcyle Championship. 
// ------------------------------------------------------------

// Import Models
const Rider = require('./models/rider.model');
const Motorcycle = require('./models/motorcycle.model');


// Question 1 - Create a HTTP Request to add a riders in the database :
// When we create a rider he doesn't have a score yet. 
 
app.post('/riders', (req, res) =>{
     let riderToCreate = new Rider(
         {
             firstName: req.body.firstname,
             lastName: req.body.lastname,
             age:req.body.newAge,
             score: req.body.newscore  
         }
     )

     riderToCreate.save((err, rider) =>{
        console.log("First")
        if(err){
            res.send(err);
        }
        res.json(rider);
     });

     console.log("Second")

 })

 

// Question 2 - Create a HTTP Request to fetch all the riders :
 app.get('/riders',(req,res)=>{
    Rider.find({},(err,found)=>{
        res.json(found);
    })
 });

// Question 3 - Create a HTTP Request to fetch one rider :
    app.get('/riders/:riderId', (req,res) =>{
    var raider = req.params.riderId;
        Rider.findById(raider, (err, result)=>{
        if(err){
            res.send(err)
        }
        res.json(result)
    })
})

// Question 4 - Create a HTTP Request to update firstName or/and lastName of a rider :
app.put('/riders/:riderToUpdate', (req, res) =>{
    const elemToUpdate = {
        firstName : req.body.firstName,
        lastName : req.body.lastName
    }
    var riderId = req.params.riderToUpdate;
    console.log(riderId);

     Rider.findByIdAndUpdate(riderId, elemToUpdate,(err,result) =>{
        if(err){
            res.send(err)
        }
        res.json("Updated Successfully");
    })
})

// Question 5 - Create a HTTP Request to ADD score of a rider :
// app.put('/riders/updated/:riderids',(req,res)=>{
//     var rideridS = req.params.riderids;
//     var addScore = req.body.addscore;

//    Rider.findById({"_id" : rideridS},(err,rider) => {
//        if(err){
//            res.send(err)
//        }
//         // rider.score.push(addScore)
//         rider.score ="juihui";
//         rider.save()
//         res.send("Successfully Added")      
//    })
   
// })


// Question 6 - Create a HTTP Request to delete one rider :
    app.delete('/riders/:riderId', (req,res)=>{
        var id = req.params.riderId;
        Rider.findByIdAndDelete(id, (err,result)=>{
            if(err){
                res.send(err)
            }
            res.json(result)
        })
    })

// Question 7 - Create a HTTP Request to create motorcycles :
// For create a motorcycle you will need to create the model first.
   
app.post('/motorcycle',(req,res)=>{
    let motorcycleToCreate = new Motorcycle(
            {
                manufacturer: req.body.manufacturer,
                displacement: req.body.displacement,
                weight:req.body.weight,
                riderId:req.body.newId
            }
        );
   
        motorcycleToCreate.save((err, motor) =>{
           if(err){
               res.send(err);
           }
           res.json(motor);
        })

    })

// Question 8 - Create a HTTP Request to fetch all the motorcycles:
    app.get('/motorcycle', (req,res)=>{
        Motorcycle.find({},(err,found)=>{
        res.json(found);
    });
})

// Question 9 - Create a HTTP Request to fetch all the motorcycles associate to one rider:
    app.get('/motorcycle/:riderid', (req, res)=> {
        var rides = req.params.riderid;

            Motorcycle.find({"riderId" : rides } ,(err, result)=>{
                if(err){
                    return(err)
                }
                res.json(result)
            })
        })


// BONUS 10 - Create a HTTP Request to to get the riders ranking
app.get('/riders/rank/',(req, res)=>{

})

//


// code to delete motorcycle by its Id
app.delete('/motorcycle/:motorid',(req,res)=>{
    var motor = req.params.motorid;

    Motorcycle.findByIdAndDelete(motor,(err,result)=>{
        if(err){
            res.send(err)
        }
        res.json(result)
    })
})









// End of the exercise
// ------------------------------------------------------------
// listen for requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
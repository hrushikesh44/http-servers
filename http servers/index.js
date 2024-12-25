const fs = require("fs");
const express = require ('express');
const app = express();

const users = [{
    userName : "John",
    kidneys : [{
        healthy : false 
    }]
}]

app.use(express.json());

app.get("/", function(req, res) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (i = 0; i < johnKidneys.length ;i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys ;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.post("/", function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy
    })
    res.json({
        msg : "Done!"
    })
})

app.put("/", function(req, res){
    if (allHealthyKidneys()){

        res.status(411).json({
            msg :"Wrong Input"
        })
    }else{
        for(i = 0; i < users[0].kidneys.length; i++){
            users[0].kidneys[i].healthy = true ;
           }
        res.json({
           msg : "Done!"
        });
    } 

})

app.delete("/", function(req, res){
    if(isThereAtLeastOneUnhealthyKidney()){
        const newKidneys = [];
        for(i = 0; i < users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy : true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({ 
            msg : "Done!"
        })
    }else{
        res.status(411).json({
            msg :"Wrong Input"
        })
    }

})

function isThereAtLeastOneUnhealthyKidney(){
    let atLeatOneUnhealthyKidney = false;
    for(i = 0; i < users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atLeatOneUnhealthyKidney = true;
        }
    }
    return atLeatOneUnhealthyKidney;
}

function allHealthyKidneys(){
    let isThereOneUnhealthyKidney = false ;
    for( i = 0; i < users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy){
            isThereOneUnhealthyKidney = true;
        }
    }
    return isThereOneUnhealthyKidney;
}

app.listen(3000);

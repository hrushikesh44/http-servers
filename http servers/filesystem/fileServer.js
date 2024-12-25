const express = require ('express');
const fs = require ('fs');

const app = express();

app.get("/files/:fileName", function(req, res){
    const name = req.params.fileName;
    fs.readFile(name , "utf-8", function(err,data){
        res.json({
            file : data
        })
    })
})

app.post("/files/:fileName/:content", function(req, res){
    const name = req.params.fileName;
    const content = req.params.content;
    fs.writeFile(name, content ,function(err, data){
        res.json({
            msg : "Done!!"
        })
    })
})

app.listen(3000);
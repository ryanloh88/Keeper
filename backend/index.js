const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")

app.use(express.static('public'))
app.use(express.urlencoded({extended:true})) //this line is to parse any information from forms
app.use(cors())
app.use(express.json()) //important to recognize incoming request object as JSON object
app.set('view engine', 'ejs')
const PORT = 4000

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/keeperDB');
}

const notesSchema = new mongoose.Schema(
    {title:String,
    content:String}
)
const Note = mongoose.model("Note",notesSchema)

// const note2 = new Note({
//     title:"day 3", 
//     content:"Hello there"
// })
// note2.save()


app.get("/api", function(req, res){
  Note.find(function(err,results){
    if (err){
      console.log(err)
    }else{
        res.json(results)   
    }
  })
});
app.post('/api/post',(req,res)=>{
    let title = req.body.title
    let content = req.body.content

    const newNote = new Note ({
            title: title,
            content: content
        })
    newNote.save()
})
app.post('/api/delete',(req,res)=>{

    Note.findByIdAndDelete({_id:req.body._id},(err) =>{
        if (err){
            console.log(err)
        }else{
            console.log("successfully deleted item")
        }
    })
})
app.post('/api/update',(req,res)=>{
    let title = req.body.title
    let content = req.body.content
    Note.findByIdAndUpdate({_id:req.body._id},{
        title: title,
        content: content
    },(err) =>{
        if (err){
            console.log(err)
        }else{
            console.log("successfully updated item")
        }
    })
})



app.listen(PORT, function(){
  console.log(`Server started on port ${PORT}.`);
});


const express=require('express');
const app=express();

app.use(express.json())
let students=[];
let mentors=[];

app.get("/students",(req,res) => {
    res.json(students)
})

app.get("/mentors",(req,res) => {
    res.json(mentors)
})

app.post("/students",(req,res) => {
    studentdata= {
        name:req.body.name,
        id:req.body.id,
        mentor:null
    }
    students.push(studentdata)
    res.json({
        message:"success"
    })
})

app.post("/mentors",(req,res) => {
    mentorsdata= {
        name:req.body.name,
        id:req.body.id
    }
    mentors.push(mentorsdata)
    res.json({
        message:"success"
    })
})

app.get("/student/:id",(req,res)=>{
    if(students[req.params.id - 1]){
        res.json(students[req.params.id - 1])
    }else{
        res.json({
            message:"no record available"
        })
    }
 })
  
 app.put("/student/:id/:mentorid",(req,res)=>{
    if(students[req.params.id - 1]){
        if(students[req.params.id-1].mentor === null){
            students[req.params.id-1].mentor = req.params.mentorid;
            res.json({
                message:"success"
            })
        }
        else{
            res.json({
                message:"mentor already assigned"
            })
        }
    }else{
        res.json({
            message:"no record available"
        })
    }
 })
 
 app.delete("/student/:id",(req,res)=>{
    let studentData = students.find(student=> student.id == req.params.id);
    let index = students.indexOf(studentData)
    // console.log(index)
    students.splice(index,1)
    res.json({
        message: "record deleted"
    })
 })
 



const port=process.env.PORT || 3000;;
app.listen(port,()=>{
    console.log('listening to port ${port}')
})
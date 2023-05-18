const express=require("express");

const CourseInfo=require('./model/courseDB')
//2. Initializing Express
const app=new express();
const path=require("path");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
//cors policy
app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Headers", " X-Requested-With, Content-Type");
    res.setHeader('Access-Control-Allow-Methods',"GET,POST,PUT,DELETE");

    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.static(path.join(__dirname,'/build')));

var cors = require('cors')

app.use(cors())


//3. API Creation
app.get('/',(req,res)=>{
    res.send("congratulations!!! Server is up")
})



// app.get('/api',(req,res)=>{
//     res.json({"name":"meera","place":"clt"})
// })
//create
app.post('/api/create',(req,res)=>{
    try{
    console.log(req.body);//server data
   let ictcourse= new CourseInfo(req.body);//passing the data to db
   ictcourse.save();//save data into db 
   res.send("Data Added");
    }
    catch(error){
        res.status(500).send(error);
    }
})

//read
app.get('/api/view',async (req,res)=>{
    try{
        let result=await CourseInfo.find();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error);
    }
})
//Single item
app.post('/api/singleview',async (req,res)=>{
    try{
        console.log(req.body._id)
        let result=await CourseInfo.findById(req.body._id);
        res.json(result);
        console.log(result)
    }
    catch(error){
        res.status(500).send(error);
    }
})

//Course Description   
app.post('/api/description',async (req,res)=>{
    try{

        let result=await CourseInfo.find(req.body)
        
        res.json(result);
       //console.log(result)
      }
    catch(error){
        res.status(500).send(error);
    }
   
})

//update
app.post('/api/update',async (req,res)=>{
    try{
let result=await CourseInfo.findByIdAndUpdate(req.body._id,req.body)
res.send("Data Updated")   
}
    catch(error){
        res.status(500).send(error);
    }
})

//Delete
app.post('/api/delete', async (req, res) => {
    // const id = req.params.id
    // const query = { _id: ObjectId(id) }
    try{
    //     let result = await dataCollection.deleteOne(query)
    //     res.send(result)
    //
    let result=await CourseInfo.findByIdAndDelete(req.body._id);
    res.json({"success":"Deleted"})

}
catch(error){
res.status(500).send(error);
}
   
})

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
 });


//4. Setting PORT Number
app.listen(3001,()=>{
    console.log("Server is at port 3001")
})
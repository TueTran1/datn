const express = require('express')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const cors = require('cors')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('./User.js')
require('./Detection.js')
require('./Department.js')
require('./Position.js')
require('./Dayoff.js')
require('./Salary.js')

const User = mongoose.model('User')
const Detection = mongoose.model('Detection')
const Department = mongoose.model('Department')
const Position = mongoose.model('Position')
const Dayoff = mongoose.model('Dayoff')
const Salary = mongoose.model('Salary')

app.use(cors())
// parse application/x-www-form-urlencoded

// app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));
app.use(bodyParser.json({limit: "50mb"}));

// parse application/json
app.use(express.json())

const JWT_SECRET = 'E2831E78F46FD6C2735E4E3A3494623D4C3C1C7B9823633DE94D611AFA525459'
const port = 5000
const mongoUrl = 'mongodb+srv://tranthanhtue:tuetran123@cluster0.lsnutbu.mongodb.net/blog-database'

mongoose.connect(mongoUrl)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((e)=>{
  console.log(e)
})


app.post('/register', async(req, res) => {
    const { username,password,fullname,address,phonenumber,email,departmentID,positionID,gender,role,dob,start} = req.body
    // console.log(req.body)
    const encryptedPassword = await bcryptjs.hash(password,10)

    try {
      const isUsernameExist = await User.exists({username: username})
      const isPhonenumberExist = await User.exists({phonenumber: phonenumber})
      const isEmailExist = await User.exists({email: email})      

      if(isUsernameExist){
        return res.json({status:'Username already exists'})
      }
      if(isEmailExist){
        return res.json({status:'Email already exists'})
      }
      if(isPhonenumberExist){
        return res.json({status:'phonenumber already exists'})
      }

    await User.create(
      {
        username:username,
        password:encryptedPassword,
        fullname:fullname,
        address:address,
        phonenumber:phonenumber,
        email:email,
        department:departmentID,
        position:positionID,
        gender:gender,
        role:role,
        dob:dob,
        start:start,
      }
     )
     res.send({status:'User Created Successfully'})
    }
    catch(err) {
      res.send({status:'error',data:err})

    }
})

app.post('/departmentCreate', async(req, res) => {
  const { departmentName,description} = req.body
  try {
    await Department.create(
    {
      departmentName:departmentName,
      description:description,
    }
   )
   res.send({status:'Department Created'})
  }
  catch(err) {
    res.send({status:'error',data:err})

  }
})

app.post('/positionCreate', async(req, res) => {
  const { positionName,description} = req.body
  try {
    await Position.create(
    {
      positionName:positionName,
      description:description,
    }
   )
   res.send({status:'Position Created'})
  }
  catch(err) {
    res.send({status:'error',data:err})

  }
})


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  
  if (!user) {
    return res.json({ status: "User Not found" });
  }
  if (await bcryptjs.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET);

    
    if (res.status(201)) {
      return res.json({ status: "Login Successfully", data: token });
    } else {
      return res.json({ status: "error" });
    }
  }
  res.json({ status: "Invalid Password", error: "InvAlid Password" });
});

app.put("/change-password", async (req, res) => {
  const { userID,password,newpassword } = req.body;

  const user = await User.findOne({ _id:userID });
  if (!user) {
    return res.json({ status: "User Not found" });
  }
  const checkPassword = await bcryptjs.compare(password, user.password)
  if (checkPassword) {
    const encryptedPassword = await bcryptjs.hash(newpassword,10)
    await User.updateOne({_id: userID},{password: encryptedPassword})
    res.send({ status: "Password Changed" })
  }
  else{
    res.send({ status: "Wrong Current Password" })
  }
});

app.put("/change-password-from-admin", async (req, res) => {
  const { userID,password,newpassword } = req.body;

  const user = await User.findOne({ _id:userID });
  if (!user) {
    return res.json({ status: "User Not found" });
  }
  else{
    const encryptedPassword = await bcryptjs.hash(newpassword,10)
    await User.updateOne({_id: userID},{password: encryptedPassword})
    res.send({ status: "Password Changed" })
  }
});

app.post('/userDetail', async(req,res)=>{
  const {token} = req.body
  
  try{
    const user = jwt.verify(token,JWT_SECRET, (err, res)=>{
      if(err){
        return'token expired'
      }
      return res
    })
    // console.log(user)
    if(user=='token expired'){
      return res.send({status:'error',data:'token expired'})
    }

    const usernameDetail = user.username
    User.findOne({username: usernameDetail}).then((data)=>{
      res.send({status:'ok',data:data})
      // console.log(data)
    }).catch((err)=>{
      res.send({status:'error',data:err})
    })
  }catch(err){

  }
})

app.post('/detectionDetail', async(req,res)=>{
  const {token} = req.body
  try{
    const user = jwt.verify(token,JWT_SECRET, (err, res)=>{
      if(err){
        return'token expired'
      }
      return res
    })
    console.log(user)
    if(user=='token expired'){
      return res.send({status:'error',data:'token expired'})
    }
    const usernameDetail = user.username
    Detection.find({username: usernameDetail}).then((data)=>{
      res.send({status:'ok',data:data})
    }).catch((err)=>{
      res.send({status:'error',data:err})
    })
  }catch(err){

  }
})

app.get("/getAllUsers",async(req, res)=>{
  try{
    const allUser = await User.find({}).populate("department","departmentName -_id")
    .populate("position","positionName -_id");
    res.send({status:'ok',data:allUser})
  } catch (err){
    console.log(err)
  }
})

app.post("/particularUser",async(req, res)=>{
  console.log(req.body)
  const { username } = req.body;
  try{
    User.find({username: username}).
    then((data)=>res.send({status:'ok',data:data}).
    catch((err)=>{res.send({status:'error',data:err})}))
  } catch (err){
    console.log(err)
  }
})

app.get("/getAllDetections",async(req, res)=>{
  try{
    const allDetection = await Detection.find({}).populate("user");
    res.send({status:'ok',data:allDetection})
  } catch (err){
    console.log(err)
  }
})

app.get("/getExecutiveAndDeparment",async(req, res)=>{
  try{
    const allExecutive = await User.find({});
    const allDepartment = await Department.find({});

    res.send({status:'ok',data:{executive:allExecutive, department:allDepartment}});
  } catch (err){
    console.log(err)
  }
})

app.get("/getPositionAndDeparment",async(req, res)=>{
  try{
    const allPosition = await Position.find({});
    const allDepartment = await Department.find({});

    res.send({status:'ok',data:{position:allPosition, department:allDepartment}});
  } catch (err){
    console.log(err)
  }
})

app.delete('/deleteUser',async(req,res) => {
  const {userID}=req.body;
  try {
    // const findUser = await User.findById(userID);
    const deleteUser = await User.deleteOne({_id:userID});
    
    res.send({status:'ok',data:deleteUser });
  } catch (error) {
    res.send({status:'error',data:error})
  }
})

app.delete('/delete-position',async(req,res) => {
  const {positionID}=req.body;
  try {
    // const findUser = await User.findById(userID);
    const deletePosition = await Position.deleteOne({_id:positionID});
    
    res.send({status:'Position Removed',data:deletePosition });
  } catch (error) {
    res.send({status:'error',data:error})
  }
})

app.delete('/delete-salary',async(req,res) => {
  const {salaryID}=req.body;
  try {
    // const findUser = await User.findById(userID);
    const deleteSalary = await Salary.deleteOne({_id:salaryID});
    
    res.send({status:'Salary Removed',data:deleteSalary });
  } catch (error) {
    res.send({status:'error',data:error})
  }
})

app.delete('/delete-department',async(req,res) => {
  const {departmentID}=req.body;
  try {
    // const findUser = await User.findById(userID);
    const deleteDepartment = await Department.deleteOne({_id:departmentID});
    
    res.send({status:'Department Removed',data:deleteDepartment});
  } catch (error) {
    res.send({status:'error',data:error})
  }
})

app.put("/update-image", async (req, res) => {
  const { userID,base64 } = req.body;
  try {
    await User.updateOne({_id: userID},{image: base64})
    res.send({ status: "Update Successfully" })

  } catch (error) {
    res.send({ status: "error", data: error });

  }
})

app.put("/personal-update", async (req, res) => {
  const { userID,username,fullname,address,phonenumber,email,gender,role,dob,start,stop } = req.body;
  try {
    const isUsernameExist = await User.findOne({username: username,_id: {$ne: userID}})
      const isPhonenumberExist = await User.findOne({phonenumber: phonenumber,_id: {$ne: userID}})
      const isEmailExist = await User.findOne({email: email,_id: {$ne: userID}})      

      if(isUsernameExist){
        return res.json({status:'Username already exists'})
      }
      if(isEmailExist){
        return res.json({status:'Email already exists'})
      }
      if(isPhonenumberExist){
        return res.json({status:'phonenumber already exists'})
      }
    else{
      await User.updateOne({_id: userID},{
      username: username,
      fullname: fullname,
      address: address,
      phonenumber: phonenumber,
      email: email,
      gender: gender,
      role: role,
      dob: dob,
      start: start,
      stop: stop,
    })
    res.send({ status: "Update successfully" })}
    

  } catch (error) {
    res.send({ status: "error", data: error });

  }
})

app.put("/employee-update", async (req, res) => {
  const { userID,positionID,departmentID } = req.body;
  // console.log(req.body)
  try {
    await User.updateOne({_id: userID},{
      position: positionID,
      department: departmentID,
    })
    res.send({ status: "Update successfully" })

  } catch (error) {
    res.send({ status: "error", data: error });

  }
})

app.post("/get-info", async (req, res) => {
  const { userID } = req.body;
  try {
    await User.findOne({_id: userID}).lean()
    .populate("department","_id departmentName")
    .populate("position","_id positionName ")
    .then((data)=>{
      res.send({status:'ok',data:data})
    }).catch((err)=>{
      res.send({status:'error',data:err})
    })

  } catch (error) {
    res.send({status:'error',data:error})
  }
})

app.post("/user-detection-by-date", async (req, res) => {
  const { userID } = req.body;
  try {
    await Detection.find({user: userID})
    .then((data)=>{
      res.send({status:'ok',data:data})
    }).catch((err)=>{
      res.send({status:'error',data:err})
    })

  } catch (error) {
    res.send({status:'error',data:error})
  }
})

app.post('/dayoff-request', async(req, res) => {
  const { id,user,started,timespan,description} = req.body
  try {
    await Dayoff.create(
    {
      _id:id,
      user:user,
      started:started,
      timespan:timespan,
      description:description
    }
   )
   res.send({status:'Dayoff Requested'})
  }
  catch(err) {
    res.send({status:'error',data:err})
  }
})
  
app.post("/get-requested-dayoff-by-user",async(req, res)=>{
  const { userID} = req.body
  try{
    const allDayoff = await Dayoff.find({user:userID}).populate("user");
    res.send({status:'ok',data:allDayoff});
  } catch (err){
    console.log(err)
  }
})

app.get("/get-all-dayoff",async(req, res)=>{
  try{
    const allDayoff = await (await Dayoff.find({}).populate("user","role username fullname start stop department position _id"))

    res.send({status:'ok',data:allDayoff});
  } catch (err){
    console.log(err)
  }
})

app.put("/update-dayoff", async (req, res) => {
  const { dayoffID,condition } = req.body;
  try {
    await Dayoff.updateOne({_id: dayoffID},{condition: condition})
    res.send({ status: "Dayoff Updated" })

  } catch (error) {
    res.send({ status: "error", data: error });

  }
})

app.post('/salary-create', async(req, res) => {
  const { userID,updated,salary} = req.body
  try {
    await Salary.create(
    {
      user:userID,
      updated:updated,
      salary:salary
    }
   )
   res.send({status:'Salary Created'})
  }
  catch(err) {
    res.send({status:'error',data:err})

  }
})

app.post("/get-salary-by-user",async(req, res)=>{
  const { userID} = req.body
  try{
    const allSalary = await Salary.find({user:userID});

    res.send({status:'ok',data:allSalary});
  } catch (err){
    console.log(err)
  }
})

app.post("/get-latest-salary-by-user",async(req, res)=>{
  const { userID} = req.body
  try{
    const allSalary = await Salary.find({user:userID}).sort({$natural: -1}).limit(1);

    res.send({status:'ok',data:allSalary});
  } catch (err){
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

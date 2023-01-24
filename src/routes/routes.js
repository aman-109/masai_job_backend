const express=require("express")

const router=express.Router()

const {signupUser}=require("../controller/signup")
const {loginUser}=require("../controller/login")
const {getAllJobs,addJob,deleteJob}=require("../controller/job")

router
.post("/signup",signupUser)
.post("/login",loginUser)

.get("/admin",getAllJobs)
.post("/admin/addjobs",addJob)
.delete("/admin/job/:id",deleteJob)


module.exports=router
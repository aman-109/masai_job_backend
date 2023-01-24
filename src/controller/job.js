const Job = require("../model/job.model");


const getAllJobs = async (req, res) => {
    let query = req.query.q;
    let filter = req.body.type;
  
    if (filter) {
      let jobs = await Job.find({ type: filter });
      if (!jobs) {
        return res.status(401).send({ message: "job not found" });
      } else {
        return res.status(200).send(jobs);
      }
    } else if (query) {
      let jobs = await searchJob(query);
      if (!jobs) {
        return res.status(401).send({ message: "job not found" });
      } else {
        return res.status(200).send(jobs);
      }
    } else {
      let jobs = await getJob();
      if (jobs) {
        return res.status(200).send(jobs);
      } else {
        return res.status(401).send({ message: "something went wrong" });
      }
    }
  };


  const getJob = async (id) => {
    if (!id) {
      let jobs = await Job.find();
      return jobs;
    }
    let job = await Job.findOne({ _id: id });
    return job;
  };


  const searchJob = async (query) => {
    await Job.createIndexes({ name: "text" });
    let job = await Job.find({ $text: { $search: query } });
  
    if (job) {
      return job;
    } else {
      return false;
    }
  };



  // Add Product in database
const addJob = async (req, res) => {
    let data = req.body;
    try {
      let job = await Job.create({ ...data });
      res
        .status(200)
        .send({ status: true,new:job, message: "Job Posted successfully" });
    } catch (e) {
      res.status(401).send({ status: false, message: "something went wrong" });
    }
  };
  
  // Delete product
  const deleteJob = async (req, res) => {
    let { id } = req.params;
    try {
      let job = await Job.findOneAndDelete({ _id: id });
      res
        .status(200)
        .send({ status: true, message: "Job deleted successfully" });
    } catch (error) {
      res.status(401).send({ status: false, message: "something went wrong" });
    }
  };


  module.exports={getAllJobs,addJob,deleteJob}
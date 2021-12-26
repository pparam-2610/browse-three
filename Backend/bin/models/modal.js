const mongoose = require("mongoose");

const modalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  //   size: {
  //     type: Number,
  //     required: true,
  //   },
});

// modalSchema.pre('find',(next)=>{
//   this.
// })

modalSchema.post("find", function (result) {
  console.log(this instanceof mongoose.Query); // true
  // prints returned documents
  console.log("find() returned " + JSON.stringify(result));
  for (let i = 0; i < result.length; i++) {
    result[i]["link"] = `${process.env.S3_URI}${result[i]["link"]}`;
  }
  // prints number of milliseconds the query took
  // console.log("find() took " + (Date.now() - this.start) + " millis");
});

modalSchema.post("findOne", function (result) {
  console.log(this instanceof mongoose.Query); // true
  // prints returned documents
  console.log("find() returned " + JSON.stringify(result));
  // for (let i = 0; i < result.length; i++) {

  if (result) result["link"] = `${process.env.S3_URI}${result["link"]}`;
  // }
  // prints number of milliseconds the query took
  // console.log("find() took " + (Date.now() - this.start) + " millis");
});

module.exports = mongoose.model("modal", modalSchema);

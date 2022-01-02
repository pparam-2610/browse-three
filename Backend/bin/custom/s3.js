const AWS = require("aws-sdk");
const fs = require("fs");
const uniqid = require("uniqid");

// const s3 = new AWS.S3({
//   accessKeyId: "AKIATNIICP3PJYT2KUA" || process.env.AWS_ID,
//   secretAccessKey:
//     "KfW5rFwBMKIGrmlCDpw1ARRhJiuQHfnRnfAwOhyb" || process.env.AWS_SECRET,
//   region: "ap-south-1" || process.env.AWS_S3_REGION,
//   signatureVersion: "v4",
// });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
const s3 = new AWS.S3({
  // accessKeyId: "AKIATNIICP3PJYT2KUA" || process.env.AWS_ID,
  // secretAccessKey:
  //   "KfW5rFwBMKIGrmlCDpw1ARRhJiuQHfnRnfAwOhyb" || process.env.AWS_SECRET,
  // region: "ap-south-1" || process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-south-1",
  // signatureVersion: "v4",
});
const uploadFile = async (fileName, name) => {
  return new Promise((resolve, reject) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);
    console.log("FileContent: ", fileContent);
    // Setting up S3 upload parameters
    const params = {
      // Bucket: "mythreestore" || process.env.AWS_BUCKET,
      Bucket: "mythreestore",
      Key: `${uniqid()}_${name.replace(/\s/g, "")}`, // File name you want to save as in S3
      Body: fileContent,
    };
    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
        console.log(err);
        throw err;
      }
      resolve(data);
    });
  });
};

const deleteFile = async (fileName) => {
  return new Promise((resolve, reject) => {
    // Setting up S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName, // File name you want to delete from S3
    };

    // deleting file from bucket
    s3.deleteObject(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getSignedURL = async (bucket, fileName, expriySeconds) => {
  return s3.getSignedUrl("getObject", {
    Bucket: bucket,
    Key: fileName,
    Expires: expriySeconds,
  });
};

module.exports = { s3, uploadFile, getSignedURL, deleteFile };

const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const multer = require("multer");
const Modal = require("../models/modal");
// const { Op } = require('sequelize');

// const Images = require('../models/images');
// const Blog = require('../models/blog');
// const Relation = require("../models/relation");

// const customError = require('../custom/errors');

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("./uploads")); // save the initial images in uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, `${uniqid()}${file.originalname.replace(/\s/g, "")}`); // rename the image with a unique ID + file name
  },
});

// check the file format before saving....
const multerFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname);
  if (
    ext == ".avi" ||
    ext == ".mp4" ||
    ext == ".mov" ||
    ext == ".png" ||
    ext == ".img" ||
    ext == ".jpg" ||
    ext == ".jpeg" ||
    ext == ".PDF" ||
    ext == ".PNG" ||
    ext == ".IMG" ||
    ext == ".JPG" ||
    ext == ".JPEG" ||
    ext == ".glb"
  ) {
    cb(null, true);
  } else {
    cb("Only pdf and images are allowed", false);
  }
};

exports.uploadImage = multer({
  storage: imageStorage,
  fileFilter: multerFilter,
});
const { getSignedURL, uploadFile, deleteFile } = require("../custom/s3");

exports.add = async (req, res) => {
  console.log("The data is: ", req.body.name, req.file);
  const name = req.body.name;

  key = await uploadFile(path.join(req.file.path), req.file.originalname);
  fs.unlinkSync(path.join(req.file.path));
  console.log("The key is: ", key);

  try {
    const newModal = new Modal({ name: name, link: key.Key });
    await newModal.save();
    return res.json({
      data: {
        modal: newModal,
      },
      error: false,
    });
  } catch (e) {
    console.log(`***** ERROR : ${req.originalUrl} ${e}`);
    return res.json({
      data: "Upload Unsuccessful",
      error: true,
    });
  }
};

exports.get = async (req, res) => {
  try {
    // if (!req.body.id) throw customError.dataInvalid;
    let modals = await Modal.find({});
    return res.status(200).json({
      error: false,
      details: {
        message: "Data Found Successfully",
        data: modals,
      },
    });
  } catch (error) {
    console.log(`***** ERROR : ${req.originalUrl} ${error}`);
    return res.status(error.code || 500).json({
      error: true,
      details: error,
    });
  }
};

// //   exports.updateImages = async (req, res) => {
// //     try {
// //       if (!req.body.id || !req.body.type || !req.files)
// //         throw customError.dataInvalid;
// //       let images = await Images.findByPk(req.body.id);
// //       req.files.map(async (file, i) => {
// //         key = await uploadFile(path.join(file.path), file.originalname);
// //         await images.update({
// //           type: req.body.type,
// //           sequence: req.body.sequence,
// //           key: key.Key,
// //         });
// //         fs.unlinkSync(path.join(file.path));
// //       });
// //       return res.status(200).json({
// //         error: false,
// //         details: {
// //           message: 'Images updated',
// //         },
// //       });
// //     } catch (error) {
// //       console.log(`***** ERROR : ${req.originalUrl} ${error}`);
// //       return res.status(error.code || 500).json({
// //         error: true,
// //         details: error,
// //       });
// //     }
// //   };

//   exports.deleteImages = async (req, res) => {
//     try {
//       if (!req.body.id) throw customError.dataInvalid;
//       let images = await Images.findByPk(req.body.id);
//       if (!images) throw customError.dataInvalid;
//       await deleteFile(images.key);
//       await images.destroy();
//       await Relation.destroy({
//         where:{
//           image_id:req.body.id
//         }
//       })
//       return res.status(200).json({
//         error: false,
//         details: {
//           message: 'Images Deleted',
//         },
//       });
//     } catch (error) {
//       console.log(`***** ERROR : ${req.originalUrl} ${error}`);
//       return res.status(error.code || 500).json({
//         error: true,
//         details: error,
//       });
//     }
//   };

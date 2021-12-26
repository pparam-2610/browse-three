const Modal = require("../models/modal");

exports.checkName = async (req, res, next) => {
  try {
    console.log("idhar aaya", req.params.name);
    let modals = await Modal.findOne({ name: req.params.name });
    if (modals) {
      console.log("dhdhdhdhdhdhdhdhdhdh");
      return res.json({
        error: true,
        details: {
          message: `Modal with the given name already exists`,
        },
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(error.code || 401).json({
      error: true,
      details: {
        message: `Modal with the given name already exists`,
      },
    });
  }
};

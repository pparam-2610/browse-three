const router = require("express").Router();
const modalController = require("../controllers/modal");
// const authConrtoller = require("../custom/authmiddleware");

// Add modal
router.post(
  "/add",
  modalController.uploadImage.single("images"),
  modalController.add
);

module.exports = router;

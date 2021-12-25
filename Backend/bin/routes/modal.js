const router = require("express").Router();
const modalController = require("../controllers/modal");
// const authConrtoller = require("../custom/authmiddleware");

// Add modal
router.post(
  "/add",
  modalController.uploadImage.single("images"),
  modalController.add
);

router.get(
  "/get",
  // modalController.uploadImage.single("images"),
  modalController.get
);

module.exports = router;

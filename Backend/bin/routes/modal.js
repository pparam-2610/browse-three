const router = require("express").Router();
const modalController = require("../controllers/modal");
const modalMiddleware = require("../custom/modalMiddleware");

// Add modal
router.post(
  "/add/:name",
  modalMiddleware.checkName,
  modalController.uploadImage.single("images"),
  modalController.add
);

router.get(
  "/get",
  // modalController.uploadImage.single("images"),
  modalController.get
);

router.get("/get/:name", modalController.getOne);

router.get("/getRecent", modalController.getRecent);

module.exports = router;

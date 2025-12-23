const express = require("express");
const router = express.Router();
const servicesController = require("../controllers/servicesController");
const { auth, admin } = require("../middleware/auth");

router.get("/", servicesController.getServices);
router.post("/", auth, admin, servicesController.addService);
router.delete("/:id", auth, admin, servicesController.deleteService);

module.exports = router;

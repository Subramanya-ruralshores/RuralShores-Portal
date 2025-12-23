const express = require("express");
const router = express.Router();
const servicesController = require("../controllers/servicesController");
const { auth, adminAuth } = require("../middleware/auth");

router.get("/", servicesController.getServices);
router.post("/", auth, adminAuth, servicesController.addService);
router.delete("/:id", auth, adminAuth, servicesController.deleteService);

module.exports = router;

const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
const { auth } = require("../middleware/auth");

router.get("/", aiController.getProjects);
router.post("/", auth, aiController.addProject);
router.delete("/:id", auth, aiController.deleteProject);

module.exports = router;

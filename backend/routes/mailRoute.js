const express = require("express");

const { sendAttachment } = require("../controllers/userController");

const router = express.Router();

router.route("/sendMail").post(sendAttachment);

module.exports = router;

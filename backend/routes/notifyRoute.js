const express = require("express");
const {
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middleware/authorization");
const {
  fileRecieved,
  fileApproved,
} = require("../controllers/notificationController");

const router = express.Router();

router
  .route("/recieved")
  .post(isAuthenticatedUser, authorizeRoles(["admin"]), fileRecieved);
router
  .route("/approved")
  .post(isAuthenticatedUser, authorizeRoles(["user"]), fileApproved);

module.exports = router;

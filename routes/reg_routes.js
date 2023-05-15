const express = require("express");
const { registerValidation, otherPeople } = require("../middleware/validation");
const {
  regiterSignup,
  userlogin,
  homePage,
  otherPage,
  getId,
  getToken,
  patchIt,
} = require("../controller/reg_controller");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/register", registerValidation, regiterSignup);

router.post("/login", userlogin);

router.get("/getid", getId);

router.get("/get" , auth, getToken);

router.get("/home", auth, homePage);

router.patch("/patch/:id", patchIt);

router.post("/place", otherPeople, auth, otherPage);

module.exports = router;

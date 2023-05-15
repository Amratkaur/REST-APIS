const userSchema = require("../model/model");
const otherSchema = require("../model/placeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// for registering
const regiterSignup = async (req, res) => {
  try {
    const email = req.body.email;
    const doubleCheck = await userSchema.find({ email });
    if (doubleCheck.length > 0) {
      res.json("email and password already in use");
    } else {
      const register = await new userSchema(req.body);
      await register.save();
      res.status(200).json({ message: "registration done, now do login" });
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// for login
const userlogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userGmail = await userSchema.findOne({ email });
    const isMatch = await bcrypt.compare(password, userGmail.password);
    const token = await userGmail.generateAuthToken();

    if (isMatch) {
      res.status(201).send({ token });
    } else {
      res.json("invaid name and password");
    }
  } catch (error) {
    res.send(error);
  }
};
// for home page
const homePage = async (req, res) => {
  try {
    const studentReg = await new userSchema(req.body);
    await studentReg.save();
    res.send(
      "place you can visit in surat are 1.dumas 2. gopi talav 3. mela, 4. whereever you want to go"
    );
  } catch (error) {
    res.status(400).send(error);
  }
};
// people who have token
const otherPage = async (req, res) => {
  try {
    const place = req.body.place;
    const checkPlace = await otherSchema.find({ place });
    if (checkPlace.length > 0) {
      res.json({ message: "this place is present in db" });
    } else {
      const register = await new otherSchema(req.body);
      await register.save();
      res
        .status(200)
        .json({ message: "you can visited now the place you have mentioned" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
// to get all id who has registered
const getId = async (req, res) => {
  try {
    const get = await userSchema.find(req.body);
    res.status(201).send(get);
  } catch (error) {
    res.status(400).send(error);
  }
};
// to get all people who has token
const getToken = async (req, res) => {
  try {
    const _id = req.user.id;
    const get1 = await userSchema.findById({ _id });
    res.send(get1);
  } catch (error) {
    res.status(400).send(error);
  }
};

const patchIt = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = await userSchema.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(update);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  regiterSignup,
  userlogin,
  homePage,
  otherPage,
  getId,
  getToken,
  patchIt,
};

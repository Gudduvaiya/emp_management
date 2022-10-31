const express = require("express");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const jwtkey = "emp_management";
const empModel = require("../../db/UserSchema");
const holidayModel = require("../../db/HolidaySchema");

const {
  ValidateProfileUpdateMiddleware,
  ValidateSignupMiddleware,
  ValidateUpdatePassMiddleware,
  ValidateAddHolidayMiddleware,
  ValidateHolidayUpdateMiddleware,
  VerifyToken,
  VerifyIsAdminMiddlewear,
  VerifySingleUserMiddlewear,
} = require("../middlewear/auth_middlewears");
require("../../db/config");

const router = express.Router();
const saltRounds = 10;

//add user API
router.post(
  "/user",
  [ValidateSignupMiddleware, VerifyToken,VerifyIsAdminMiddlewear],
  async (req, res) => {
    const { password } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      //gaurd block
      if (err) {
        console.log(err);
        res.send("error");
      }

      try {
        // console.log(hash);
        const temp = req.body;
        temp["password"] = hash;
        let data = empModel(temp);
        let result = await data.save();
        res.json({message: 'User added successfully!', user: result});
      } catch (err) {
        const errorMessage = err.toString();
        console.log("Error is ", errorMessage);
        if (errorMessage.includes("username_1")) {
          res.status(400).json({
            error: "Username already exists!",
          });
        } else if (errorMessage.includes("email_1")) {
          res.status(400).send({ Error: "Email already exists!" });
        } else {
          res.status(400).json({ error: errorMessage });
        }
      }
    });
  }
);

// fetch all employee data
router.get("/user", [VerifyToken, VerifyIsAdminMiddlewear], async (req, res) => {
  let data = await empModel.find().select("-password");
  res.send(data);
});

//fetch required employee

router.get("/user/:id", [VerifyToken, VerifySingleUserMiddlewear], async (req,res)=>{
    const id = ObjectId(req.params.id);
	let data= await empModel.findOne({_id: id})
	res.send(data)
})

//update passwords
router.post(
  "/user/update-pass/:e_id",
  [ValidateUpdatePassMiddleware,VerifyToken],
  async (req, res) => {
    const { oldPassword, password } = req.body;
    // let temp = req.body;
    const data = await empModel.findOne({ username: req.params.e_id });
    bcrypt.compare(oldPassword, data.password, (err, result) => {
      if (result) {
        if (oldPassword == password) {
          res.send({ Error: "Both Passwords are same, Nothing to update!" });
        } else {
          bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
              console.log(err);
              res.send("error");
            }
            console.log(hash);
            // temp["password"] = hash;
            let updatepass = await empModel.updateOne(
              { username: req.params.e_id },
              { $set: { password: hash } }
            );

            if (updatepass.matchedCount && updatepass.modifiedCount) {
              res.send({ Success: "Password Update Successfully!" });
            }
          });
        }
      } else {
        res.send({ Error: "Old Password is wrong!" });
      }
    });
  }
);

//update employee data
router.put(
  "/user/update/:e_id",
  [ValidateProfileUpdateMiddleware, VerifyToken],
  async (req, res) => {
    let data = await empModel.updateOne(
      { username: req.params.e_id },
      { $set: req.body }
    );
    if (data.matchedCount && !data.modifiedCount) {
      res.send({ Error: "Nothing to Update!" });
    } else if (data.modifiedCount) {
      res.send({ Error: "Updated Successfully!" });
    } else if (!data.matchedCount) {
      res.send({ Error: "User not Found!" });
    }
  }
);

//Remove Employee
router.delete("/user/remove/:e_id", [VerifyToken,VerifyIsAdminMiddlewear], async (req, res) => {
  let data = await empModel.deleteOne({ username: req.params.e_id });
  data.deletedCount
    ? res.send({ result: "Deleted Successfully!" })
    : res.status(404).send({ result: "User not Found!" });
});

//Login Employee
router.post("/user/login", async (req, res) => {
  if (req.body.username && req.body.password) {
    const { password, username } = req.body;
    const data = await empModel.findOne({ username });
    if (data) {
      bcrypt.compare(password, data.password, function (err, result) {
        if (result) {
          jwt.sign({ id: data.id, is_admin: data.is_admin }, jwtkey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
              res.json({ Error: "Something went wrong!" });
            } else {
              res.json({
                data,
                AuthToken: token,
              });
            }
          });
        } else {
          res.send({ Error: "Invalid Credentials!" });
        }
      });
    } else {
      res.send({ Error: "User not found!" });
    }
  } else {
    res.send({ Result: "Please enter your username and password!" });
  }
});

// Holiday Section Starts

// Add Holiday API
router.post("/holiday", [ValidateAddHolidayMiddleware, VerifyToken,VerifyIsAdminMiddlewear], async (req, res) => {
  try {
    let data = holidayModel(req.body);
    let result = await data.save();
    res.send(result);
  } catch (err) {
    const error = err.toString();
    if (error.includes("duplicate key error") && error.includes("date_1")) {
      res.send({ Error: "Holiday Date is already Declaired!" });
      console.log(`Error is ${error}`);
    } else {
      res.send({ Error: "Something went wrong! Check console" });
      console.log(`Error is ${error}`);
    }
  }
});

//Fetch Holodays
router.get("/holiday", VerifyToken, async (req, res) => {
  let data = await holidayModel.find();
  res.send(data);
});

//update Holidays
router.put(
  "/holiday/update/:id",
  [ValidateHolidayUpdateMiddleware, VerifyToken,VerifyIsAdminMiddlewear],
  async (req, res) => {
    try {
      const id = ObjectId(req.params.id);
      let hid = await holidayModel.findOne({ _id: id });
      if (!hid) {
        res.send({ Error: "Holiday not Found!" });
      }
      let data = await holidayModel.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      if (data.matchedCount && !data.modifiedCount) {
        res.send({ Error: "Nothing to Update!" });
      } else if (data.modifiedCount) {
        res.send({ Error: "Updated Successfully!" });
      }
    } catch (err) {
      const error = err.toString();
      if (error.includes("string of 12 bytes or a string of 24 hex")) {
        res.json({ Error: "Invalid ID" });
      } else {
        res.send({ Error: "Something went wrong! Check console" });
        console.log(`Error is ${error}`);
      }
    }
  }
);

//Delete Holidays
router.delete("/holiday/remove/:id", [VerifyToken,VerifyIsAdminMiddlewear], async (req, res) => {
  try {
    const id = ObjectId(req.params.id);
    let hid = await holidayModel.findOne({ _id: id });
    if (!hid) {
      res.send({ Error: "Holiday not Found!" });
    }
    let data = await holidayModel.deleteOne({ _id: req.params.id });
    if (data.deletedCount) {
      res.send({ result: "Deleted Successfully!" });
    }
  } catch (err) {
    const error = err.toString();
    if (error.includes("string of 12 bytes or a string of 24 hex")) {
      res.json({ Error: "Invalid holiday id!" });
    } else {
      res.send({ Error: "Something went wrong! Check console" });
      console.log(`Error is ${error}`);
    }
  }
});

module.exports = router;

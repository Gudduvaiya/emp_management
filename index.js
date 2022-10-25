const exp = require("express");
const bcrypt = require("bcrypt");
require("./db/config");
const empModel = require("./db/emp_model");
const holidayModel = require("./db/holiday_model");

const saltRounds = 10;

const app = exp();
app.use(exp.json());

//Middleware for update emp
function UpdateMiddleware(req, res, next) {
  if (req.body.password || req.body.email) {
    res.send({ Error: "Can't Update Password or Email!" });
  } else {
    next();
  }
}
//add user API
app.post("/emp/add-emp", async (req, res) => {
  const { password } = req.body;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    //gaurd block
    if (err) {
      console.log(err);
      res.send("error");
    }

    try {
      console.log(hash);
      const temp = req.body;
      temp["password"] = hash;
      let data = empModel(temp);
      let result = await data.save();
      res.send(result);
    } catch (err) {
      const errorMessage = err.toString();
      console.log("Error is ", errorMessage);
      if (errorMessage.includes("id_1")) {
        res.status(400).json({
          error: "Employee ID is already Exists!",
        });
      } else if (errorMessage.includes("email_1")) {
        res.status(400).send({ Error: "Email alreay Exists!" });
      } else {
        res.status(400).json({ error: errorMessage });
      }
    }
  });
});

// fetch employee data
app.get("/emps", async (req, res) => {
  let data = await empModel.find().select("-password");
  res.send(data);
});

//update passwords
app.post("/emp/update_pass/:e_id", async (req, res) => {
  const { oldPassword, password } = req.body;
  // let temp = req.body;
  const data = await empModel.findOne({ id: req.params.e_id });
  bcrypt.compare(oldPassword, data.password, (err, result) => {
    if (result) {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
          console.log(err);
          res.send("error");
        }
        console.log(hash);
        // temp["password"] = hash;
        let updatepass = await empModel.updateOne(
          { id: req.params.e_id },
          { $set: { password: hash } }
        );
        res.send(updatepass);
      });
    } else {
      res.send({ Error: "Old Password is wrong!" });
    }
  });
});

//update employee data
app.put("/emp/update/:e_id", UpdateMiddleware, async (req, res) => {
  let data = await empModel.updateOne(
    { id: req.params.e_id },
    { $set: req.body }
  );
  res.send(data);
});

//Remove Employee
app.delete("/emp/remove/:e_id", async (req, res) => {
  let data = await empModel.deleteOne({ id: req.params.e_id });
  data.deletedCount
    ? res.send({ result: "Deleted Successfully!" })
    : res.send({ result: "No Data found to delete!" });
});

//Login Employee
app.post("/emp/login", async (req, res) => {
  if (req.body.id && req.body.password) {
    const { password, id } = req.body;
    const data = await empModel.findOne({ id });
    if (data) {
      bcrypt.compare(password, data.password, function (err, result) {
        if (result) {
          res.send(data);
        } else {
          res.send({ Error: "Invalid Credentials!" });
        }
      });
    } else {
      res.send({ Error: "Employee not found!" });
    }
  } else {
    res.send({ Result: "Please enter your employee id and password!" });
  }
});

// Holiday Section Starts

// Add Holiday API
app.post("/holiday/add", async (req, res) => {
  try {
    let data = holidayModel(req.body);
    let result = await data.save();
    res.send(result);
  } catch (err) {
    const error = err.toString();
    if (error.includes("duplicate key error") && error.includes("name_1")) {
      res.send({ Error: "Holiday Name is already Declaired!" });
      console.log(`Error is ${error}`);
    } else {
      res.send({ Error: "Something went wrong! Check console" });
      console.log(`Error is ${error}`);
    }
  }
});

//Fetch Holodays
app.get("/holiday", async (req, res) => {
  let data = await holidayModel.find();
  res.send(data);
});

//update Holidays
app.put("holiday/update/:id", async (req, res) => {
  let data = await holidayModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(data);
});

//Delete Holidays
app.delete("/holiday/remove/:id", async (req, res) => {
  let data = await holidayModel.deleteOne({ _id: req.params.id });
  data.deletedCount
    ? res.send({ result: "Deleted Successfully!" })
    : res.send({ result: "No Data found to delete!" });
});

app.listen(4500);

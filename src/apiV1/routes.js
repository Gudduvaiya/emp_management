const express = require("express");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");

const empModel = require("../../db/UserSchema");
const holidayModel = require("../../db/HolidaySchema");
const {
	ValidateProfileUpdateMiddleware,
	ValidateSignupMiddleware,
	ValidateUpdatePassMiddleware,
	ValidateAddHolidayMiddleware,
	ValidateHolidayUpdateMiddleware,
	VerifyTokenMiddlewear,
	VerifyIsAdminMiddlewear,
	VerifyIsAdminOrSelfMiddlewear,
} = require("../middlewear/auth_middlewears");
const {USER_NOT_FOUND} = require('../constants.js');
require("../../db/config");

const router = express.Router();
const saltRounds = 10;
const jwtkey = "emp_management";

//add user API
router.post(
	"/user",
	[ValidateSignupMiddleware, VerifyIsAdminMiddlewear],
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
				res.json({ message: "User added successfully!", user: result });
			} catch (err) {
				const errorMessage = err.toString();
				console.log("Error is ", errorMessage);
				if (errorMessage.includes("username_1")) {
					res.status(400).json({
						error: "Username already exists!",
					});
				} else if (errorMessage.includes("email_1")) {
					res.status(400).send({ error: "Email already exists!" });
				} else {
					res.status(400).json({ error: errorMessage });
				}
			}
		});
	}
);

// fetch all employee data
router.get("/user", VerifyIsAdminMiddlewear, async (req, res) => {
	let data = await empModel.find().select("-password");
	res.send(data);
});

//fetch required employee
router.get("/user/:username", VerifyIsAdminOrSelfMiddlewear, async (req, res) => {
	let data = await empModel.findOne({ username: req.params.username });
	res.send(data);
});

//update passwords
router.post(
	"/user/update-pass/:e_id",
	[ValidateUpdatePassMiddleware, VerifyTokenMiddlewear],
	async (req, res) => {
		const { oldPassword, password } = req.body;
		// let temp = req.body;
		const data = await empModel.findOne({ username: req.params.e_id });
		bcrypt.compare(oldPassword, data.password, (err, result) => {
			if (result) {
				if (oldPassword == password) {
					res.send({
						error: "Both Passwords are same, Nothing to update!",
					});
				} else {
					bcrypt.hash(
						password,
						saltRounds,
						async function (err, hash) {
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

							if (
								updatepass.matchedCount &&
								updatepass.modifiedCount
							) {
								res.send({
									Success: "Password update successfully!",
								});
							}
						}
					);
				}
			} else {
				res.send({ error: "Old password is wrong!" });
			}
		});
	}
);

//update employee data
router.put(
	"/user/update/:e_id",
	[VerifyIsAdminMiddlewear, ValidateProfileUpdateMiddleware],
	async (req, res) => {
		let data = await empModel.updateOne(
			{ username: req.params.e_id },
			{ $set: req.body }
		);
		if (data.matchedCount && !data.modifiedCount)
			res.status(400).send({ error: "Nothing to Update!" });
		else if (data.modifiedCount)
			res.send({ data: "Updated Successfully!" });
		else if (!data.matchedCount)
			res.status(404).send({ error: USER_NOT_FOUND });
	}
);

//Remove Employee
router.delete(
	"/user/remove/:e_id",
	VerifyIsAdminMiddlewear,
	async (req, res) => {
		const data = await empModel.findOne({ username: req.params.e_id });
		const deleted = await empModel.deleteOne({ username: req.params.e_id });
		deleted.deletedCount
			? res.send({ data: `${data.name} Deleted Successfully!` })
			: res.status(404).send({ error: USER_NOT_FOUND });
	}
);

//Login Employee
router.post("/user/login", async (req, res) => {
	if (req.body.username && req.body.password) {
		const { password, username } = req.body;
		const data = await empModel.findOne({ username });
		if (data) {
			bcrypt.compare(password, data.password, function (err, result) {
				if (result) {
					jwt.sign(
						{ id: data.id, is_admin: data.is_admin },
						jwtkey,
						{ expiresIn: "2h" },
						(err, token) => {
							if (err) {
								res.status(500).json({
									error: "Something went wrong!",
								});
							} else {
								res.json({
									data,
									token: token,
								});
							}
						}
					);
				} else {
					res.status(401).send({ error: "Invalid Credentials!" });
				}
			});
		} else {
			res.status(404).send({ error: USER_NOT_FOUND });
		}
	} else {
		res.status(400).send({
			error: "Please enter your username and password!",
		});
	}
});

// Holiday Section Starts

// Add Holiday API
router.post(
	"/holiday",
	[ValidateAddHolidayMiddleware, VerifyIsAdminMiddlewear],
	async (req, res) => {
		try {
			let data = holidayModel(req.body);
			let result = await data.save();
			res.send({data: result});
		} catch (err) {
			const error = err.toString();
			if (
				error.includes("duplicate key error") &&
				error.includes("date_1")
			) {
				console.log(`Error is ${error}`);
				res.status(400).send({ error: "Holiday Date is already declaired!" });
			} else {
				console.log(`Error is ${error}`);
				res.status(500).send({ error: "Something went wrong! Check console" });
			}
		}
	}
);

//Fetch Holodays
router.get("/holiday", VerifyTokenMiddlewear, async (req, res) => {
	let data = await holidayModel.find();
	res.send(data);
});

//update Holidays
router.put(
	"/holiday/update/:id",
	[ValidateHolidayUpdateMiddleware, VerifyIsAdminMiddlewear],
	async (req, res) => {
		try {
			const id = ObjectId(req.params.id);
			let hid = await holidayModel.findOne({ _id: id });
			if (!hid) {
				res.send({ error: "Holiday not Found!" });
			}
			let data = await holidayModel.updateOne(
				{ _id: req.params.id },
				{ $set: req.body }
			);
			if (data.matchedCount && !data.modifiedCount) {
				res.send({ error: "Nothing to Update!" });
			} else if (data.modifiedCount) {
				res.send({ error: "Updated Successfully!" });
			}
		} catch (err) {
			const error = err.toString();
			if (error.includes("string of 12 bytes or a string of 24 hex")) {
				res.json({ error: "Invalid ID" });
			} else {
				res.send({ error: "Something went wrong! Check console" });
				console.log(`Error is ${error}`);
			}
		}
	}
);

//Delete Holidays
router.delete(
	"/holiday/remove/:id",
	VerifyIsAdminMiddlewear,
	async (req, res) => {
		try {
			const id = ObjectId(req.params.id);
			let hid = await holidayModel.findOne({ _id: id });
			if (!hid) {
				res.send({ error: "Holiday not Found!" });
			}
			let data = await holidayModel.deleteOne({ _id: req.params.id });
			if (data.deletedCount) {
				res.send({ result: "Deleted Successfully!" });
			}
		} catch (err) {
			const error = err.toString();
			if (error.includes("string of 12 bytes or a string of 24 hex")) {
				res.json({ error: "Invalid holiday id!" });
			} else {
				res.send({ error: "Something went wrong! Check console" });
				console.log(`Error is ${error}`);
			}
		}
	}
);

module.exports = router;

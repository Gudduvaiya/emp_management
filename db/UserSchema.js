const mongoose = require("mongoose");
mongoose.pluralize(null);

const UserSchema = new mongoose.Schema({
	is_admin: { type: Boolean, default: false },
	username: { type: String, unique: true },
	name: String,
	email: { type: String, unique: true },
	desigation: String,
	joined_on: { type: String, default: Date.now() },
	password: String,
});

module.exports = mongoose.model("user", UserSchema);

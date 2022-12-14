const mongoose = require("mongoose");
mongoose.pluralize(null);

const HolidaySchema = new mongoose.Schema({
	name: { type: String },
	date: { type: String, default: "Not Available!", unique: true },
	day: String,
});

module.exports = mongoose.model("holiday", HolidaySchema);

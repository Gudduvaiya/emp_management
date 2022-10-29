const ValidateProfileUpdateMiddleware = (req, res, next) => {
	if (req.body.password || req.body.email)
		res.send({ Error: "Can't Update Password or Email!" });
	else next();
};

module.exports = { ValidateProfileUpdateMiddleware };

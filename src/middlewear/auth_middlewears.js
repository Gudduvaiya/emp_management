const jwt = require("jsonwebtoken");
const jwtkey = "emp_management";
const ObjectId = require("mongodb").ObjectId;
const empModel = require("../../db/UserSchema");

const VerifyIsAdminMiddlewear = (req, res, next) => {
	let token = req.headers["authorization"];
	if (token) {
	  token = token.split(" ");
	  jwt.verify(token[1], jwtkey, (err, decoded) => {
		if (err) {
		  res.status(401).send({ Error: "Invalid Token!" });
		} else {
			if (decoded.is_admin) next();
			else res.status(401).send({ Error: "Only an admin can access this." });
		}
	  });
	} else {
	  res.status(401).send({ Error: "Authorization token is required." });
	}
}

const VerifySingleUserMiddlewear=async(req,res,next)=>{
	
	let token=req.headers["authorization"]
	if (token) {
		token = token.split(" ");
		console.log(token[1]);
		jwt.verify(token[1], jwtkey, (err, valid) => {
		  if (err) {
			res.status(401).send({ Error: "Invalid Token!" });
		  } else {
			if (valid.is_admin || valid.id == req.params.id) next();
			else res.status(401).json({error: 'You are not authorized to fetch the data.'})
		  }
		});
	  } else res.status(401).json({error: 'Authorization token is required.'})
	  
}

const ValidateProfileUpdateMiddleware = (req, res, next) => {
  if (Object.keys(req.body || {}).length === 0) {
    res.send({ Error: "Request body can't be empty!" });
  } else if (req.body.password || req.body.email)
    res.send({ Error: "Can't update 'password' or 'email'!" });
  else next();
};

const ValidateHolidayUpdateMiddleware = (req, res, next) => {
	if (Object.keys(req.body || {}).length === 0) {
		res.send({ Error: "Request body can't be empty!" });
	  } else next();
};

const ValidateSignupMiddleware = (req, res, next) => {
  let err = [];
  const body = req.body;

  if (!body.name) {
    err.push("name is missing!");
  }
  if (!body.username) {
    err.push("username is missing!");
  }
  if (!body.email) {
    err.push("email is missing!");
  }
  if (!body.password) {
    err.push("password is missing!");
  }
  if (!body.desigation) {
    err.push("desigation is missing!");
  }
  if (!body.joined_on) {
    err.push("joined_on is missing!");
  }
  if (err.length) {
    res.status(400).json({
      error: "Required data missing.",
      description: err,
    });
  } else {
    next();
  }
};

const ValidateUpdatePassMiddleware = (req, res, next) => {
  const body = req.body;
  if (Object.keys(req.body || {}).length === 0) {
    res.send({ Error: "Request body can't be empty!" });
  } else if (!body.oldPassword) {
    res.send({ Error: "Please Enter Your Old Password to poccessed!" });
  } else if (!body.password) {
    res.send({ Error: "Please Enter Your new Password to poccessed!" });
  } else next();
};

// Holiday Section
const ValidateAddHolidayMiddleware = (req, res, next) => {
  let err = [];
  const body = req.body;

  if (!body.name) {
    err.push("name is missing!");
  }
  if (!body.date) {
    err.push("date is missing!");
  }
  if (!body.day) {
    err.push("day is missing!");
  }
  if (err.length) {
    res.status(400).json({
      error: "Required data missing.",
      description: err,
    });
  } else {
    next();
  }
};

const VerifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ");
    console.log(token[1]);
    jwt.verify(token[1], jwtkey, (err, valid) => {
      if (err) {
        res.status(401).send({ Error: "Invalid Token!" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ Error: "Authorization token is required." });
  }
};

module.exports = {
  ValidateProfileUpdateMiddleware,
  ValidateSignupMiddleware,
  ValidateUpdatePassMiddleware,
  ValidateAddHolidayMiddleware,
  ValidateHolidayUpdateMiddleware,
  VerifyToken,
  VerifyIsAdminMiddlewear,
  VerifySingleUserMiddlewear
};

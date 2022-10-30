const ValidateProfileUpdateMiddleware = (req, res, next) => {
	if(Object.keys(req.params).length===0){
		res.send({Error:"Enter Username in Parameter to poccessed!"})
	}
	if(Object.keys(req.body || {}).length === 0){
		res.send({Error:"Please Enter records in Body!"})
	}
	else if (req.body.password || req.body.email)
		res.send({ Error: "Can't Update Password or Email!" });
	else next();
};

const ValidateSignupMiddleware=(req,res,next)=>{
	const body=req.body
	if(Object.keys(body || {}).length === 0){
		res.send({Error:"Please Enter records in Body!"})
	}
	else if(!body.name){
		res.send({Error:"Please Enter Name to poccessed!"})
	}
	else if(!body.username){
		res.send({Error:"Please Enter Username to poccessed!"})
	}
	else if(!body.email){
		res.send({Error:"Please Enter Email to poccessed!"})
	}
	else if(!body.password){
		res.send({Error:"Please Enter Password to poccessed!"})
	}
	else if(!body.desigation){
		res.send({Error:"Please Enter Designation to poccessed!"})
	}
	else{
		next()
	}
}

const ValidateUpdatePassMiddleware=(req,res,next)=>{
	const body=req.body
	if(Object.keys(body || {}).length === 0){
		res.send({Error:"Please Enter records in Body!"})
	}
	else if(!body.oldPassword){
		res.send({Error:"Please Enter Your Old Password to poccessed!"})
	}
	else if(!body.password){
		res.send({Error:"Please Enter Your new Password to poccessed!"})
	}
}

module.exports = { ValidateProfileUpdateMiddleware,ValidateSignupMiddleware, ValidateUpdatePassMiddleware };

const authRouter = require("express").Router();
const { User,validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


authRouter.post("/register", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

authRouter.post("/login", async (req, res) => {
	try {
	  const { email, password } = req.body;
	  const user = await User.findOne({ email });
	  if (!user) {
		return res.status(400).json({ msg: "User not found" });
	  } else {
		bcrypt.compare(password, user.password, async (err, result) => {
		  if (result) {
			const token = jwt.sign(
			  { userId: user._id },
			  process.env.JWT_SECRET_KEY
			);
			res.status(200).json({ token, userId: user._id });
		  }
		});
	  }
	} catch (error) {
	  console.log(error);
	}
  });



module.exports = {authRouter};

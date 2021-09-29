const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
	console.log("password", req.body.password);
	const newUser = new User({
		username: req.body.username,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.CRYPT_SECRET_KEY
		).toString(),
		email: req.body.email,
	});

	try {
		const user = await newUser.save();
		return res.status(201).json(user);
	} catch (err) {
		console.log(err.message);
		return res.status(500).json(err);
	}
});

// LOGIN
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).json("Incorrect username or user does not exist");
		}
		const bytes = CryptoJS.AES.decrypt(
			user.password,
			process.env.CRYPT_SECRET_KEY
		);
		const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

		if (originalPassword !== req.body.password) {
			return res.status(401).json("Incorrect password!");
		}

		const accessToken = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: "5d" }
		);

		const { password, ...info } = user._doc;

		return res.status(200).json({ ...info, accessToken });
	} catch (err) {
		console.log(err.message);
		return res.status(500).json(err);
	}
});

module.exports = router;

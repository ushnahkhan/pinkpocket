const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed
    });

    res.json(user);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json("Wrong password");

    const token = jwt.sign(
        { _id: user._id, name:user.name,role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token });
};
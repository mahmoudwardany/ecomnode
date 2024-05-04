const { hashPassword } = require("../../helper/hashPassword");
const { validRegister, userModel } = require("../../models/userModel");

const registerController = async (req, res) => {
        const { firstName, lastName, age, email, password } = req.body;

  const { error } = validRegister({firstName, lastName, age, email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists", success: false });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({firstName, lastName, age, email, password:hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "Registered successfully", success: true, newUser });
  } catch (error) {
    return res.status(400).json({ message: "Failed to register", success: false, error });
  }
};

module.exports = registerController;

import {User} from "../models/user.model.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: `All Fields are required` });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: `User is already registered` });
    }

    //creating a new user
    const newUser = await User.create({ name, email, password });
    return res.status(201).json({
      message: `User registered successfully`,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `Server Error` });
  }
};

export { registerUser };

import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_TOKEN = process.env.JWT_TOKEN;

export const Register = async (req, res) => {
  try {
    const { username, role, image, phone, password, address } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { phone } });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким номером уже существует" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const user = await User.create({
      username,
      role,
      image,
      phone,
      password: hashedPassword,
      address,
    });

    // Create a JWT token
    const token = jwt.sign({ userID: user.id }, JWT_TOKEN, {
      expiresIn: "400h",
    });

    // Respond with the token and user info
    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось создать пользователя",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(400).json({ message: "нет такого пользовователя" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Неверные учетные данные" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_TOKEN, {
      expiresIn: "400h",
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        image: user.image,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "не удалось войти", error: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ message: "нет такого пользовователя" });
    } else {
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получени пользавователя",
      error: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получени пользавователей",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, role, image, phone, password, address } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (username) {
      user.username = username;
    }

    if (role) {
      user.role = role;
    }

    if (image) {
      user.image = image;
    }

    if (password) {
      const heshPassword = await bcrypt.hash(password, 10);
      user.password = heshPassword;
    }
    if (phone) {
      const existingUser = await User.findOne({ where: { phone } });
      if (existingUser && existingUser.id !== userId) {
        res
          .status(400)
          .json({ message: "Пользователь с таким номером уже существует" });
      }
      user.phone = phone;
    }
    if (address) {
      user.address = address;
    }
    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлени пользавователя" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(400)
        .json({ message: "не удалось найти пользовователя" });
    }

    await user.destroy();
    res.status(200).json({ message: "пользовователь удален" });
  } catch (error) {
    res.status(500).json({ message: "не удалось удалить пользовователя" });
  }
};

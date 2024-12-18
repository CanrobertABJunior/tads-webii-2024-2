import { registerUser, loginUser, verifyUserEmail } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await loginUser(req.body);
    req.session.token = token;
    res.status(200);
    res.send("Login realizado com sucesso!");
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  console.log("req.query.token", req.query.token);
  try {
    const result = await verifyUserEmail(req.query.token);
    res.status(200);
    res.send("Email validado!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

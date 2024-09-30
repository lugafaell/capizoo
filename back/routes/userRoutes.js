const express = require("express");
const {
  addUser,
  getUsers,
  getUserByUsername,
  getUserById,
} = require("../models/userModel");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ message: "Erro ao buscar usuários", error: err });
  }
});

router.post("/users", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  try {
    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Nome de usuário já está em uso." });
    }

    const result = await addUser(username, password);

    res.status(200).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ message: "Erro ao criar usuário", error: err });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    res.status(200).json({ message: "Login bem-sucedido!", userId: user.id });
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
});

router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
});

module.exports = router;

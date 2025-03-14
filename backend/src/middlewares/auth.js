import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  const token = req.header("x-auth-token") || req.header("Authorization")?.split(" ")[1]; // Verifica os dois possíveis headers
  if (!token)
    return res
      .status(401)
      .json({ msg: "Acesso negado. Token não encontrado." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (!req.user)
      return res.status(401).json({ msg: "Usuário não encontrado" });
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token inválido ou Expirado" });
  }
};

export default auth;

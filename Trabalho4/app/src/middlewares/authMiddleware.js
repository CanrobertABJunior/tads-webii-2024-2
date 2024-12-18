import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.session.token || req.query.token;

  // Verifica se o token foi enviado na sessão
  if (!authHeader) {
    return res.status(401).json({ error: "Access token is required" });
  }

  try {
    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET); // Usa o authHeader como token

    // Verifica se o decoded contém o userId
    if (!decoded || !decoded.userId) {
        return res.status(403).json({ error: "Invalid token payload" });
    }

    // Adiciona o ID do usuário decodificado ao objeto de solicitação
    req.userId = decoded.userId;
    req.token = authHeader; // Armazena o token original

    // Chama o próximo middleware ou controlador
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

import prisma from "../models/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: "canjunior15@gmail.com",   // google app email
    pass: "kifh vtow okiv actq",   // google app password
  },
});

export const registerUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: '', // Remetente
    to: user.email, // Destinatário
    subject: "Email Verification",
    html: `<b>Welcome ${user.name}!</b><br/>Please click the link below to verify your email:<br/><a href="${verificationLink}">Verify Email</a>`,
  };

  // Enviar o e-mail de verificação
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending verification email.");
  }

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email, isVerified: true } });
  if (!user) throw new Error("Invalid credentials");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid email or password");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  return token;
};

export const verifyUserEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: { isVerified: true },
    });
    return { message: "Email verified successfully", user };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

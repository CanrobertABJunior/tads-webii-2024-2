// // npm init --yes
// // "start": "node --watch src/server.js"
// // npm run start        inicia a aplicacao rodando o comando start
// // npm i express        instalo o express
// // npm i                instala todas as dependencias
// //  "type": "module",   no package.json para forcar o projeto para um modulo js

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import sharedRoutes from "./routes/sharedRoutes.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'
import session  from 'express-session';



dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'development') {
    console.log("Running in development mode");
    dotenv.config({ path: '.env.development' });
} else if (NODE_ENV === 'production') {
    console.log("Running in production mode");
    dotenv.config({ path: '.env.production' });
}

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "1.0.0",
      description: "API para gerenciamento de tarefas, categorias e compartilhamentos.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/server.js"],
};


const swaggerSpecs = swaggerJsdoc(options);
export default swaggerSpecs;

const app = express();
app.use(express.json());

app.use(session({
    secret: process.env.JWT_SECRET,// deve ser transformado em uma variavel de ambiente
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    res.locals.userId = req.session.userId || null;
    next();
});

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
app.use("/categories", categoryRoutes);
app.use("/shared", sharedRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


/**
 * @swagger
 * tags:
 *   name: Health Check
 *   description: Rota de verificação de servidor
 */

/**
 * @swagger
 * /healthcheck:
 *   get:
 *     summary: Verifica se o servidor está no ar
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/healthcheck', (req, res) => res.send('OK'));

app.listen(3000, () => console.log("Server iniciou na porta 3000"));
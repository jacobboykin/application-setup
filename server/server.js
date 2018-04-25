import express from "express";
import { json, urlencoded } from "body-parser";
import http from "http";
import swaggerJSDoc from "swagger-jsdoc";
import morgan from "morgan";
import { serve, setup } from "swagger-ui-express";
import { logger } from "./src/utils";

const options = {
  swaggerDefinition: {
    info: {
      title: "Application Setup",
      version: "1.0.0"
    }
  },
  apis: ["./server.js"] // Path to the API docs
};

var swaggerSpec = swaggerJSDoc(options);
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(morgan("combined", { stream: logger.stream }));
/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Get's a list of users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: users
 */
app.get("/api/users", (req, res) => {
  res.json([
    {
      id: 1,
      username: "samsepi0l"
    },
    {
      id: 2,
      username: "D0loresH4ze"
    }
  ]);
});

app.use("/api-docs", serve, setup(swaggerSpec));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const port = 8000;
app.set("port", port);
const server = http.createServer(app);
server.listen(port, () => {
  logger.debug(`Visit http://localhost:${port}`);
});

export default server;

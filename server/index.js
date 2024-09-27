require("dotenv").config();

// Подключаем бэкенд на Express.
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const errorMiddleware = require("../server/middlewares/error-middleware.js");
const authRouter = require("./routes/auth.routes.js")


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use("/api", authRouter);
app.use(errorMiddleware);


// Подключаем Nuxt в режиме nuxt.render. В этом примере нет отдельного процесса с Nuxt.
// Nuxt работает в качестве middleware для Express без своего сервера на Connect.
const { loadNuxt, build } = require("nuxt");
const isDev = process.env.NODE_ENV !== "production";
async function start() {
  const nuxt = await loadNuxt(isDev ? "dev" : "start");
  app.use(nuxt.render);
  if (isDev) {
    build(nuxt);
  }

  app.listen(process.env.PORT, () => {
    if (process.env.NODE_ENV !== "production") {
      console.log(">>SERVER UP ON PORT:", process.env.PORT);
    }
  });
}

// Запуск приложения.
start();

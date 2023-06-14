require("dotenv").config();
// require("module-alias/register")

// const { addAliases} = require("module-alias")

// addAliases({
//   "@base": `${__dirname}`,
//   "@config": `${__dirname}/${process.env.V}/config`,
//   "@controllers": `${__dirname}/${process.env.V}/controllers`,
//   "@middleware": `${__dirname}/${process.env.V}/middleware`,
//   "@models": `${__dirname}/${process.env.V}/models`,
//   "@repo": `${__dirname}/${process.env.V}/repository`,
//   "@routes": `${__dirname}/${process.env.V}/routes`,
//   "@utils": `${__dirname}/${process.env.V}/utils`,
//   "@validator": `${__dirname}/${process.env.V}/validator`,
// });

//@package
const express = require("express");
const { createServer } = require("http");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const $port = 8080;
const app = express();
const server = createServer(app);

async function run_server() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose
      .connect(
        "mongodb+srv://lananganggoro3:lanang123456789@cluster0.vjs26tq.mongodb.net/?retryWrites=true&w=majority"
      )
      .then((res) => {
        console.info("Connected to database");
      });

    app.use(helmet({ hidePoweredBy: true, frameguard: true }));
    app.use(
      cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] })
    );
    app.use(express.json());

    app.get("/ping", (req, res, next) => {
      res.status(200).json({
        pesan: "pong!",
        sukses: false,
      });
    });

    app.get("*", (req, res) => {
      res.status(404).json({
        pesan: "Endpoint tidak ditemukan",
        sukses: false,
      });
    });

    app.use("/jual-pupuk", require("./routes/jual-pupuk.route"))
    app.use("/sampah", require("./routes/sampah.route"))
    app.use("/tukar-sampah", require("./routes/tukar-sampah.route"))

    server.listen($port, () => {
      console.info("server", `Connected to port http://localhost:${$port}`);
    });
  } catch (error) {
    console.error(`mongoose : ${error.message}`);
  }
}

run_server();

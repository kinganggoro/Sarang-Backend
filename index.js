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

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SampahModel = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  jenis_sampah: String,
  harga: Number,
  _createdDate: { type: Date, default: new Date() },
});
const TukarSampah = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  nama: String,
  alamat: String,
  no_telp: String,
  jenis_sampah: String,
  harga_per_kilo: Number,
  jumlah_sampah: Number,
  total_harga: Number,
  _createdDate: { type: Date, default: new Date() },
});
const JualPupuk = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  nama: String,
  alamat: String,
  no_telp: String,
  jumlah_pupuk: Number,
  harga_per_liter: Number,
  total_harga: Number,
  _createdDate: { type: Date, default: new Date() },
});

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

    const $sampahModel = mongoose.model("sampah", SampahModel);
    const $tukarSampahModel = mongoose.model("tukar_sampah", TukarSampah);
    const $jualPupukModel = mongoose.model("jual_pupuk", JualPupuk);

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

    // sampah endpoint
    app.get("/sampah", async (req, res, next) => {
      res.status(200).json({
        hasil: await $sampahModel.find(),
        sukses: false,
      });
    });

    app.post("/sampah", async (req, res, next) => {
      try {
        if (!req.body?.jenis_sampah || !req.body?.harga) {
          return res.status(400).json({
            pesan: "Sampah Tidak Valid",
            sukses: false,
          });
        }

        const newSampah = new $sampahModel({
          ...req.body,
        });

        await newSampah.save();

        res.status(201).json({
          pesan: "Sampah berhasil tambahkan",
          sukses: true,
        });
      } catch (error) {
        res.status(500).json({
          pesan: "Error Server",
          sukses: false,
        });
      }
    });

    app.post("/sampah/:id", async (req, res, next) => {
      try {
        if (!req.params?.id) {
          return res.status(400).json({
            pesan: "Sampah Tidak Valid",
            sukses: false,
          });
        }

        await $sampahModel.findByIdAndUpdate(req.params?.id, {
          ...req.body,
        });

        // await newSampah.save();

        res.status(201).json({
          pesan: "Sampah berhasil perbarui",
          sukses: true,
        });
      } catch (error) {
        res.status(404).json({
          pesan: `Sampah dengan id ${req.params.id} tidak ditemukan`,
          sukses: false,
        });
      }
    });

    app.delete("/sampah/:id", async (req, res, next) => {
      try {
        const target = await $sampahModel.findById(req.params.id);
        if (!target._id) {
          return res.status(400).json({
            pesan: `Sampah dengan id ${req.params.id} tidak ditemukan`,
            sukses: false,
          });
        }
        await $sampahModel.deleteOne({ _id: req.params.id });
        res.status(200).json({
          pesan: "Sampah berhasil dihapus",
          hasil: target,
          sukses: false,
        });
      } catch (error) {
        res.status(404).json({
          pesan: `Sampah dengan id ${req.params.id} tidak ditemukan`,
          sukses: false,
        });
      }
    });

    // tukar-sampah ndpoint
    app.get("/tukar-sampah", async (req, res, next) => {
      res.status(200).json({
        hasil: await $tukarSampahModel.find(),
        sukses: false,
      });
    });
    app.post("/tukar-sampah", async (req, res, next) => {
      try {
        if (
          !req.body?.nama ||
          !req.body?.alamat ||
          !req.body?.no_telp ||
          !req.body?.jenis_sampah ||
          !req.body?.harga_per_kilo ||
          !req.body?.jumlah_sampah ||
          !req.body?.total_harga
        ) {
          return res.status(400).json({
            pesan: "Tukar Sampah Tidak Valid",
            sukses: false,
          });
        }

        const newTukarSampah = new $tukarSampahModel({
          ...req.body,
        });

        await newTukarSampah.save();

        res.status(201).json({
          pesan: "Tukar Sampah berhasil tambahkan",
          sukses: true,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          pesan: "Error Server",
          sukses: false,
        });
      }
    });
    app.post("/tukar-sampah/:id", async (req, res, next) => {
      try {
        if (!req.params?.id) {
          return res.status(400).json({
            pesan: "Tukar Sampah Tidak Valid",
            sukses: false,
          });
        }

        await $tukarSampahModel.findByIdAndUpdate(req.params?.id, {
          ...req.body,
        });

        res.status(201).json({
          pesan: "Tukar Sampah berhasil perbarui",
          sukses: true,
        });
      } catch (error) {
        res.status(404).json({
          pesan: `Tukar Sampah dengan id ${req.params.id} tidak ditemukan`,
          sukses: false,
        });
      }
    });
    app.delete("/tukar-sampah/:id", async (req, res, next) => {
      try {
        const target = await $tukarSampahModel.findById(req.params.id);
        if (!target._id) {
          return res.status(400).json({
            pesan: `Tuker Sampah dengan id ${req.params.id} tidak ditemukan`,
            sukses: false,
          });
        }
        await $tukarSampahModel.deleteOne({ _id: req.params.id });
        res.status(200).json({
          pesan: "Tukar Sampah berhasil dihapus",
          hasil: target,
          sukses: false,
        });
      } catch (error) {
        res.status(404).json({
          pesan: `Tukar Sampah dengan id ${req.params.id} tidak ditemukan`,
          sukses: false,
        });
      }
    });

    // jual-pupuk ndpoint
    app.get("/jual-pupuk", async (req, res, next) => {
      res.status(200).json({
        hasil: await $jualPupukModel.find(),
        sukses: false,
      });
    });
    app.post("/jual-pupuk", async (req, res, next) => {
      try {
        if (
          !req.body?.nama ||
          !req.body?.alamat ||
          !req.body?.no_telp ||
          !req.body?.harga_per_liter ||
          !req.body?.jumlah_pupuk ||
          !req.body?.total_harga
        ) {
          return res.status(400).json({
            pesan: "Form Pupuk Tidak Valid",
            sukses: false,
          });
        }

        const newJualPupuk = new $jualPupukModel({
          ...req.body,
        });

        await newJualPupuk.save();

        res.status(201).json({
          pesan: "Jual Pupuk berhasil tambahkan",
          sukses: true,
        });
      } catch (error) {
        res.status(500).json({
          pesan: "Error Server",
          sukses: false,
        });
      }
    });
    app.post("/jual-pupuk/:id", async (req, res, next) => {
      try {
        if (!req.params?.id) {
          return res.status(400).json({
            pesan: "Jual Pupuk Tidak Valid",
            sukses: false,
          });
        }

        await $jualPupukModel.findByIdAndUpdate(req.params?.id, {
          ...req.body,
        });

        res.status(201).json({
          pesan: "Jual Pupuk berhasil perbarui",
          sukses: true,
        });
      } catch (error) {
        res.status(404).json({
          pesan: `Jual Pupuk dengan id ${req.params.id} tidak ditemukan`,
          sukses: false,
        });
      }
    });
    app.delete("/jual-pupuk/:id", async (req, res, next) => {
      try {
        const target = await $jualPupukModel.findById(req.params.id);
        if (!target._id) {
          return res.status(400).json({
            pesan: `Jual Pupuk dengan id ${req.params.id} tidak ditemukan`,
            sukses: false,
          });
        }
        await $jualPupukModel.deleteOne({ _id: req.params.id });
        res.status(200).json({
          pesan: "Jual Pupuk  berhasil dihapus",
          hasil: target,
          sukses: false,
        });
      } catch (error) {
        res.status(404).json({
          pesan: `Jual Pupuk dengan id ${req.params.id} tidak ditemukan`,
          sukses: false,
        });
      }
    });

    app.get("*", (req, res) => {
      res.status(404).json({
        pesan: "Endpoint tidak ditemukan",
        sukses: false,
      });
    });

    server.listen($port, () => {
      console.info("server", `Connected to port http://localhost:${$port}`);
    });
  } catch (error) {
    console.error(`mongoose : ${error.message}`);
  }
}

run_server();

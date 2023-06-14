const express = require('express');
const router = express.Router();
const $sampahModel = require("../models/sampah.model")

// sampah endpoint
router.get("/", async (req, res, next) => {
  res.status(200).json({
    hasil: await $sampahModel.find(),
    sukses: false,
  });
});

router.post("/", async (req, res, next) => {
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

router.post("/:id", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
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

module.exports = router
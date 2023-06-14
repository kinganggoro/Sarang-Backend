const express = require('express');
const router = express.Router();
const $jualPupukModel = require("../models/jual-pupuk.model")

// jual-pupuk ndpoint
router.get("/", async (req, res, next) => {
    res.status(200).json({
        hasil: await $jualPupukModel.find(),
        sukses: false,
    });
});
router.post("/", async (req, res, next) => {
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
router.post("/:id", async (req, res, next) => {
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
router.delete("/:id", async (req, res, next) => {
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

module.exports = router

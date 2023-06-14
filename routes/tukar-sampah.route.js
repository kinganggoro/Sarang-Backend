const express = require('express');
const router = express.Router();
const $tukarSampahModel = require("../models/tukar-sampah.model")

// tukar-sampah ndpoint
router.get("/", async (req, res, next) => {
	res.status(200).json({
		hasil: await $tukarSampahModel.find(),
		sukses: false,
	});
});
router.post("/", async (req, res, next) => {
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
router.post("/:id", async (req, res, next) => {
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
router.delete("/:id", async (req, res, next) => {
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

module.exports = router
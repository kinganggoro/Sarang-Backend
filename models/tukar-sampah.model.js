const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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

const $tukarSampahModel = mongoose.model("tukar_sampah", TukarSampah);

module.exports = $tukarSampahModel
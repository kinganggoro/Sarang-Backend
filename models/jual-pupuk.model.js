const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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

const $jualPupukModel = mongoose.model("jual_pupuk", JualPupuk);

module.exports = $jualPupukModel
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SampahModel = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    jenis_sampah: String,
    harga: Number,
    _createdDate: { type: Date, default: new Date() },
});

const $sampahModel = mongoose.model("sampah", SampahModel);

module.exports = $sampahModel
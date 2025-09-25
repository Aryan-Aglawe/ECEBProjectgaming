import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description: {type: Array, required: true},
    price: {type: Number, required: true },
    offerPrice: {type: Number, required: true },
    image: {type: Array, required: true },
    category: {type: String, required: true },
    sellerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    inStock: {type: Boolean, default: true },
}, { timestamps: true})

const Service = mongoose.models.service || mongoose.model('service', serviceSchema)

export default Service

import { v2 as cloudinary } from "cloudinary"
import Service from "../models/Service.js"

// Add Service : /api/service/add
export const addService = async (req, res)=>{
    try {
        let serviceData = JSON.parse(req.body.serviceData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        await Service.create({...serviceData, image: imagesUrl})

        res.json({success: true, message: "Service Added"})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get Services : /api/service/list
export const serviceList = async (req, res)=>{
    try {
        const services = await Service.find({})
        res.json({success: true, services})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get single Service : /api/service/id
export const serviceById = async (req, res)=>{
    try {
        const { id } = req.body
        const service = await Service.findById(id)
        res.json({success: true, service})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Update Service : /api/service/update
export const updateService = async (req, res)=>{
    try {
        const { id, ...updateData } = req.body
        await Service.findByIdAndUpdate(id, updateData)
        res.json({success: true, message: "Service Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Delete Service : /api/service/delete
export const deleteService = async (req, res)=>{
    try {
        const { id } = req.body
        await Service.findByIdAndDelete(id)
        res.json({success: true, message: "Service Deleted"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Change Service inStock : /api/service/stock
export const changeServiceStock = async (req, res)=>{
    try {
        const { id, inStock } = req.body
        await Service.findByIdAndUpdate(id, {inStock})
        res.json({success: true, message: "Stock Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

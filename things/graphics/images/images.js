import {
    Schema
} from 'mongoose'

const ImageSchema = new Schema({
    name: String,
    contentType: String,
    data: Buffer,
    assetPack: String,
    type: String,
})

ImageSchema.pre('save', function (next) {
    const image = this;
    const maxSizeInBytes = 2 * 1024 * 1024

    if (image.data && image.data.length > maxSizeInBytes) {
        const err = new Error('Image data exceeds the maximum allowed size of 2MB')
        next(err)
    } else {
        next()
    }
})

export default ImageSchema

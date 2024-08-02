import mongoose, {
  Schema
} from "mongoose"

import sharp from "sharp"
import ImageSchema from "../images/images.js"

const IconSchema = new Schema({
  id: String,
  name: String,
  flattenedImage: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  compositeImage: {
    type: String,
    default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='
  },
})

IconSchema.pre('save', async function (next) {
  const Image = mongoose.model('Image', ImageSchema)

    if (this.flattenedImage) {
      await Image.findByIdAndUpdate(this.flattenedImage, {
        data: await sharp(Buffer.from(this.compositeImage.split(",")[1], 'base64')).resize(250, 250).png().toBuffer(),
        contentType: 'image/png'
      })} else {
      const flattenedImage = new Image({
        contentType: 'image/png',
        data: await sharp(Buffer.from(this.compositeImage.split(",")[1], 'base64')).resize(250, 250).png().toBuffer(),
      })
    
      const savedImage = await flattenedImage.save()
    
      this.flattenedImage = savedImage._id
    }
  next()
})

export default IconSchema
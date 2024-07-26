import mongoose, {
  Schema
} from "mongoose"

const IconSchema = new Schema({
  id: String,
  name: String,
  src: String,
  components: [{
    type: Schema.Types.ObjectId,
    ref: 'Image'
  }],
  flattenedImage: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  }
})

IconSchema.pre('save', async function (next) {
  const Image = mongoose.model('Image')
  
  if (this.components && this.components.length > 0) {
    try {
      const componentImages = await Image.find({
        _id: {
          $in: this.components
        }
      })

      if (componentImages.length > 0) {
        const images = componentImages.map(img => img.data)
        let compositeImage = sharp(images[0])

        for (let i = 1; i < images.length; i++) {
          compositeImage = compositeImage.composite([{
            input: images[i],
            blend: 'over'
          }])
        }

        const flattenedImageBuffer = await compositeImage.toBuffer()

        if (this.flattenedImage) {
          await Image.findByIdAndUpdate(this.flattenedImage, {
            data: flattenedImageBuffer,
            filename: `${this.name}_flattened.png`,
            contentType: 'image/png'
          })
        } else {
          const flattenedImage = new Image({
            filename: `${this.name}_flattened.png`,
            contentType: 'image/png',
            data: flattenedImageBuffer,
          })

          const savedImage = await flattenedImage.save()

          this.flattenedImage = savedImage._id
        }
      }
    } catch (error) {
      return next(error)
    }
  }
  next()
})

export default IconSchema
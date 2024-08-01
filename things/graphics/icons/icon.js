import mongoose, {
  Schema
} from "mongoose"

import sharp from "sharp"
import axios from "axios"
import ImageSchema from "../images/images.js"

const IconSchema = new Schema({
  id: String,
  name: String,
  components: [{
    url: String,
    src: String,
    name: String,
    transform: String,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    transparent: Boolean
  }],
  flattenedImage: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  }
})

IconSchema.pre('save', async function (next) {
  const Image = mongoose.model('Image', ImageSchema)
  let componentImages = []
  let compositeImage

  if (this.components && this.components.length > 0) {
    for (const element of this.components) {
        let url = element.src ? element.src : element.url
        console.log(url)
        try {
          let res
          if (url !== ''){
          res = await axios.get(url, {
            responseType: 'arraybuffer'
          })}
          let existing = await Image.findOne({name: url + '.' + element.name})
          if (existing) {
            componentImages.push(existing)
          } else {
          if (res){
          componentImages.push({
            data: res.data,
            name: url + '.' + element.name,
          })}}
        } catch (err) {
          console.log(err)
        }
    }
    if (componentImages.length > 0) {
      const images = componentImages.map(img => img.data)
      compositeImage = sharp(images[0])

      for (let i = 1; i < images.length; i++) {
        let image = sharp(images[i]).resize(250, 250)

        if (this.components[i].transform) {
          const transform = this.components[i].transform
          const rotateMatch = transform.match(/rotate\((\d+)deg\)/)
          const translateXMatch = transform.match(/translateX\((\d+)px\)/)
          const translateYMatch = transform.match(/translateY\((\d+)px\)/)
          const scaleMatch = transform.match(/scale\((\d+(?:\.\d+)?)\)/)

          if (rotateMatch) {
            image = image.rotate(parseInt(rotateMatch[1]))
          }
          if (scaleMatch) {
            const scale = parseFloat(scaleMatch[1])
            image = image.resize({
              width: Math.round(this.components[i].width * scale),
              height: Math.round(this.components[i].height * scale)
            })
            if (scale > 1) {
              image = image.extract({
                left: 0,
                top: 0,
                width: this.components[i].width,
                height: this.components[i].height
              })
            }
          }
          if (translateXMatch || translateYMatch) {
            const x = translateXMatch ? parseInt(translateXMatch[1]) : 0
            const y = translateYMatch ? parseInt(translateYMatch[1]) : 0

            const largerImage = await sharp({
              create: {
                width: this.components[i].width + x,
                height: this.components[i].height + y,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
              }
            })
          
            image = await largerImage.composite([{
              input: await image.png().toBuffer(),
              top: y,
              left: x
            }])
          
            image = image.extract({
              left: 0,
              top: 0,
              width: this.components[i].width,
              height: this.components[i].height
            })
          }
        }

        compositeImage = compositeImage.resize(250,250).composite([{
          input: await image.png().toBuffer(),
          blend: 'over'
        }])
      }
    }

    if (this.flattenedImage) {
      await Image.findByIdAndUpdate(this.flattenedImage, {
        data: await compositeImage.resize(250, 250).png().toBuffer(),
        contentType: 'image/png'
      })
    } else {
      const flattenedImage = new Image({
        contentType: 'image/png',
        data: await compositeImage.resize(250, 250).png().toBuffer(),
      })
    
      const savedImage = await flattenedImage.save()
    
      this.flattenedImage = savedImage._id
    }
  }
  next()
})

export default IconSchema
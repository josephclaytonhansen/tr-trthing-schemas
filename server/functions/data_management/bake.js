import crypto from 'crypto'
import zlib from 'zlib'

const bake = (block, encryptionKey) => {
    let data = JSON.stringify(block.toJSON())
    let base64 = Buffer.from(data).toString('base64')
    
    let key = crypto.createHash('sha256').update(String(encryptionKey)).digest('base64').substr(0, 32)
    let iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)
    let encrypted = Buffer.concat([cipher.update(base64, 'utf8'), cipher.final()])
    let compressed = zlib.gzipSync(encrypted)
    return { compressed, iv }
}

const unbake = (encryptedData, decryptionKey, iv) => {
    let key = crypto.createHash('sha256').update(String(decryptionKey)).digest('base64').substr(0, 32)
    
    let decompressed = zlib.gunzipSync(encryptedData)
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv)
    let decrypted = Buffer.concat([decipher.update(decompressed), decipher.final()])
    let data = JSON.parse(Buffer.from(decrypted.toString(), 'base64').toString('utf8'))
    
    return data
}

export {bake, unbake}
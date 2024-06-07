import {bake, unbake} from './bake.js'

const signBlock = (block, connectionKey, launchKey) => {
    if (block.id.length != 5) {
        throw new Error('Invalid input')
    }
    const { compressed, iv } = bake(block, block.id+connectionKey+launchKey)
    return Buffer.from(block.id + iv.toString('hex') + compressed.toString('base64'), 'binary')
}

const openBlock = (encryptedData, connectionKey, launchKey) => {
    let dataString = encryptedData.toString('binary')
    return unbake(Buffer.from(dataString.substring(37), 'base64'), dataString.substring(0, 5)+connectionKey+launchKey, Buffer.from(dataString.substring(5, 37), 'hex'))
}

export  {signBlock, openBlock}
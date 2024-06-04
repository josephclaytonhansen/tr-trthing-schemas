import Enemy from './enemy'
import Friend from './friend'
import Avatar from './avatar'
import Npc from './npc'
import Details from './details'

import crypto from 'crypto'
import zlib from 'zlib'

class Person {
    [key: string]: any
    private _undoData?: any
    private _avatar?: Avatar = new Avatar()
    private _enemy?: Enemy = new Enemy(this.id) 
    private _friend?: Friend = new Friend() 
    private _npc?: Npc = new Npc()
    private _details?: Details = new Details(this.id)
    private _isAvatar: boolean = false
    private _isNpc: boolean = false
    private _isEnemy: boolean = false
    private _isFriend: boolean = false

    constructor(
        public id: string,
        public which: string,
    ) {
        this.init()
    }

    init() {
        this.set('_isAvatar', this.which === 'avatar')
        this.set('_isNpc', this.which === 'npc')
        this.set('_isEnemy', this.which === 'enemy')
        this.set('_isFriend', this.which === 'friend')
    
        this.set('_details', new Details(this.get('id')))
    
        if (this.get('_isAvatar')) {
            this.set('_avatar', new Avatar())
        }
        if (this.get('_isNpc')) {
            this.set('_npc', new Npc())
        }
        if (this.get('_isEnemy')) {
            this.set('_enemy', new Enemy(this.get('id')))
        }
        if (this.get('_isFriend')) {
            this.set('_friend', new Friend())
        }
    }

    json() {
        let returns: any = {
            id: this.get('id'),
            details: this.get('_details')?.json(),
            isAvatar: this.get('_isAvatar'),
            isNpc: this.get('_isNpc'),
            isEnemy: this.get('_isEnemy'),
            isFriend: this.get('_isFriend'),
        }
        if (!this.get('_isNpc') && this.get('_isEnemy') || this.get('_isFriend') || this.get('_isAvatar')) {
            returns.combatData = {
                baseStats: this.get('_enemy')?.baseStats || this.get('_friend')?.baseStats || this.get('_avatar')?.baseStats,
                currentStats: this.get('_enemy')?.currentStats || this.get('_friend')?.currentStats || this.get('_avatar')?.currentStats,
                statGrowths: this.get('_enemy')?.statGrowths || this.get('_friend')?.statGrowths || this.get('_avatar')?.statGrowths,
                experiences: this.get('_enemy')?.experiences || this.get('_friend')?.experiences || this.get('_avatar')?.experiences,
                experienceGrowths: this.get('_enemy')?.experienceGrowths || this.get('_friend')?.experienceGrowths || this.get('_avatar')?.experienceGrowths,
                experienceAptitudes: this.get('_enemy')?.experienceAptitudes || this.get('_friend')?.experienceAptitudes || this.get('_avatar')?.experienceAptitudes,
                skills: this.get('_enemy')?.skills || this.get('_friend')?.skills || this.get('_avatar')?.skills,
                level: this.get('_enemy')?.level || this.get('_friend')?.level || this.get('_avatar')?.level,
                //unitClass: this.get('_enemy')?.unitClass || this.get('_friend')?.unitClass || this.get('_avatar')?.unitClass,
                exp: this.get('_enemy')?.exp || this.get('_friend')?.exp || this.get('_avatar')?.exp,
                //inventory: this.get('_enemy')?.inventory || this.get('_friend')?.inventory || this.get('_avatar')?.inventory,
                unique: this.get('_enemy')?.unique || this.get('_friend')?.unique || this.get('_avatar')?.unique,
                events: this.get('_enemy')?.events || this.get('_friend')?.events || this.get('_avatar')?.events,
            }
        }
    
        if (returns.combatData) {
            returns.combatData.supports = this.get('_friend')?.supports || this.get('_avatar')?.supports
            returns.combatData.supportPoints = this.get('_friend')?.supportPoints || this.get('_avatar')?.supportPoints
            returns.combatData.maxSupports = this.get('_friend')?.maxSupports || this.get('_avatar')?.maxSupports
            returns.combatData.classMastery = this.get('_friend')?.classMastery || this.get('_avatar')?.classMastery
            returns.combatData.goals = this.get('_friend')?.goals || this.get('_avatar')?.goals
            returns.combatData.ai = this.get('_friend')?.ai || this.get('_enemy')?.ai
            returns.combatData.baseBehavior = this.get('_friend')?.baseBehavior || this.get('_enemy')?.baseBehavior
        }
        return returns
    }

    get(property: string) {
        if (this.hasOwnProperty(`${property}`)) {
            return this[`${property}`];
        } else if (this.hasOwnProperty(`_${property}`)) {
            return this[`_${property}`];
        }
        throw new Error(`Property ${property} does not exist.`)
    }

    set(property: string, value: any) {
        if (this.hasOwnProperty(`${property}`) || this.hasOwnProperty(`_${property}`)) {
            if (typeof this[`${property}`] !== typeof value) {
                console.log(`Cannot set ${property} to ${value}. It is of type ${typeof value}. You must set it to a ${typeof this[`_${property}`]}.`)
                return {msg: `Cannot set ${property} to ${value}. It is of type ${typeof value}. You must set it to a ${typeof this[`_${property}`]}.`, status: 'error'}
            } 
            else {
                this._undoData = this.json()
                this[`_${property}`] = value
                this[`${property}`] = value
                return {msg: `${property} set to ${value}`, status: 'success'}
            }
        }
        throw new Error(`Property ${property} does not exist.`)
    }

    undo() {
        if (this._undoData) {
            let temp = this._undoData
            for (let property in temp) {
                console.log(property, temp[property])
                if (property === 'details' || property === 'enemy' || property === 'friend' || property === 'npc' || property === 'avatar') {
                    let temp2 = this.get(property)
                    for (let property2 in temp2) {
                        temp2[property2] = temp[property][property2]
                    }
                }
                if (property !== 'id' && property !== 'combatData'){
                this.set(property, temp[property])
                }
            }
            return {msg: 'Undo successful', status: 'success'}
        }
    }

    bake(encryptionKey: string) {
        let data = JSON.stringify(this.json())
        let base64 = Buffer.from(data).toString('base64')
        
        let key = crypto.createHash('sha256').update(String(encryptionKey)).digest('base64').substr(0, 32);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.alloc(16, 0))
        let encrypted = Buffer.concat([cipher.update(base64, 'utf8'), cipher.final()])
        let compressed = zlib.gzipSync(encrypted)
        return compressed.toString('base64')
    }
    
    unbake(encryptedData: string, decryptionKey: string) {
        let key = crypto.createHash('sha256').update(String(decryptionKey)).digest('base64').substr(0, 32);
        
        let decompressed = zlib.gunzipSync(Buffer.from(encryptedData, 'base64'))
        
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.alloc(16, 0))
        let decrypted = Buffer.concat([decipher.update(decompressed), decipher.final()])
        let data = JSON.parse(Buffer.from(decrypted.toString(), 'base64').toString('utf8'))
        
        return data
    }
}

export default Person
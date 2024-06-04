import WeaponTypes from './weapontypes'

class GlobalExperiences {
    [key: string]: any
    public riding: boolean = false
    public flying: boolean = false
    public armor: boolean = false
    constructor(
    ) {
        for (let type in WeaponTypes) {
            this[type] = true
        }
    }
    json() {
        let returns: any = {}
        for (let type in this) {
            if (this.hasOwnProperty(type)) {
                returns[type] = this[type]
            }
        }
        return returns
    }
    
}

let implementation = new GlobalExperiences()
// db

export default implementation as GlobalExperiences
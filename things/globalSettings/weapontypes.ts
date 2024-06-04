import WeaponType from "../abstracts/weapontype"

class GlobalWeaponTypes {
    public types: WeaponType[] = []
    constructor(typesObj?: []) {
        if (typesObj) {
            typesObj.forEach((type: any) => {
                this.types.push(new WeaponType(type.name, type.icon))
            })
        }
    }
    json() {
        return this.types.map(type => {
            return {
                name: type.name,
                icon: type.icon
            }
        })
    }
}

let implementation = new GlobalWeaponTypes()
// db

export default implementation as GlobalWeaponTypes


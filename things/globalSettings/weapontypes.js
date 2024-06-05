import _WeaponType from "../abstracts/weapontype.js"

class _GlobalWeaponTypes {
    public types: _WeaponType[] = []
    constructor(typesObj?: []) {
        if (typesObj) {
            typesObj.forEach((type: any) => {
                this.types.push(new _WeaponType(type.name, type.icon))
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

export default _GlobalWeaponTypes


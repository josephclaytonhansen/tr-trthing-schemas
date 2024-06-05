class UnitClassIcon {
    constructor(public name: string="", public readonly path: string="") {}
    json() {
        return {
            name: this.name,
            path: this.path,
        }
    }
}

export default UnitClassIcon
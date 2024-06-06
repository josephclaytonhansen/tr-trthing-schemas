class _Icon {
    constructor(name="",  path="") {}
    toObject(){
        return this.json()
    }
    json() {
        return {
            name: this.name,
            path: this.path,
        }
    }
}

export default _Icon
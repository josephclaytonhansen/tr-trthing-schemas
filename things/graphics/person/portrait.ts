class Portrait {
    constructor (
        public owner:string,
        public path:string = "",
        public emotion:string = "default",
    ){}
    json() {
        return {
            owner: this.owner,
            path: this.path,
            emotion: this.emotion,
        }
    }
}

export default Portrait
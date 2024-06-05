class Experiences {
    riding = { amount: 0, level: "E" }
    flying = { amount: 0, level: "E" }
    armor = { amount: 0, level: "E" }
    authority = { amount: 0, level: "E" }

    constructor(req) {
        const experiences = req.globalExperiences
        for (let type in experiences) {
            if (experiences[type] === true) {
                this[type] = 0
            }
        }
    }

    toObject(){
        return this.json()
    }

    json() {
        let returns = {}
        for (let type in this) {
            if (typeof this[type] === 'object') {
                returns[type] = this[type]
            }
        }
        return returns
    }
}

export default Experiences
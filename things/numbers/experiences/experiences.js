import _GlobalExperiences from '../../globalSettings/experiences.js'

class Experiences {
    [key: string]: any
    public riding: { [key: string]: any } = { amount: 0, level: "E" }
    public flying: { [key: string]: any } = { amount: 0, level: "E" }
    public armor: { [key: string]: any } = { amount: 0, level: "E" }
    public authority: { [key: string]: any } = { amount: 0, level: "E" }
    constructor() {
        const experiences = GlobalExperiences.json()
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
        let returns: any = {}
        const experiences = GlobalExperiences.json()
        for (let type in this) {
            if (this.hasOwnProperty(type) && experiences[type] === true) {
                returns[type] = this[type]
            }
        }
        return returns
    }
}

export default Experiences
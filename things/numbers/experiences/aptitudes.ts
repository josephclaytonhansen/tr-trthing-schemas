import GlobalExperiences from '../../globalSettings/experiences'

class ExperiencesAptitudes {
    [key: string]: any
    public riding: number = 0
    public flying: number = 0
    public armor: number = 0
    public authority: number = 0
    constructor() {
        const experiences = GlobalExperiences.json()
        for (let type in experiences) {
            if (experiences[type] === true) {
                this[type] = 0
            }
        }
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

export default ExperiencesAptitudes
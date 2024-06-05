class _ExperiencesGrowth {
    riding = 0
    flying = 0
    armor = 0
    authority = 0

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

export default _ExperiencesGrowth
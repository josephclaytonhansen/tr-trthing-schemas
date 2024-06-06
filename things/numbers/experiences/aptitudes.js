class _ExperiencesAptitude {
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
        Object.keys(this).forEach(key => {
            /* ------------------- This is a load-bearing conditional ------------------- */
            /* -------------------- For some incredibly stupid reason ------------------- */
            if (key !== '$isMongooseModelPrototype' && key !== '$isMongooseDocumentPrototype') {
                returns[key] = this[key]
            }
        })
        return returns
    }
}

export default _ExperiencesAptitude
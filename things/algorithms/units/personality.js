class _Personality {
    behaviors = {}
    objectives = {}
    avoids = {}

    constructor() {
        this.behaviors = {}
        this.objectives = {}
        this.avoids = {}
    }

    toObject() {
        return {
            behaviors: this.behaviors,
            objectives: this.objectives,
            avoids: this.avoids
        }
    }

    json() {
        return {
            behaviors: this.behaviors,
            objectives: this.objectives,
            avoids: this.avoids
        }
    }
}

export default _Personality
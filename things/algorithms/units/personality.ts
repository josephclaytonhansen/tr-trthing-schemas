class Personality {
    public behaviors?:{} = {}
    public objectives?:{} = {}
    public avoids?:{} = {}

    constructor(behaviors?: {}, objectives?: {}, avoids?: {}) {
        if (behaviors) {
            this.behaviors = behaviors
        }
        if (objectives) {
            this.objectives = objectives
        }
        if (avoids) {
            this.avoids = avoids
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

export default Personality
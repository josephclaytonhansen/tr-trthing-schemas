class baseBehaviors {
    movement = 'walk'
    constructor(movement) {
        let permissibles = ['stand', 'walk', 'fly', 'ride', 'swim']
        if (movement && permissibles.includes(movement)) {
            this.movement = movement
        }
    }

    toObject() {
        return {
            movement: this.movement
        }
    }

    json() {
        return {
            movement: this.movement
        }
    }
}

export default baseBehaviors
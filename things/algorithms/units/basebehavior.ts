class baseBehaviors {
    public movement?:string = 'walk'
    constructor(movement?: string) {
        let permissibles = ['stand', 'walk', 'fly', 'ride', 'swim']
        if (movement && permissibles.includes(movement)) {
            this.movement = movement
        }
    }
    json() {
        return {
            movement: this.movement
        }
    }
}

export default baseBehaviors
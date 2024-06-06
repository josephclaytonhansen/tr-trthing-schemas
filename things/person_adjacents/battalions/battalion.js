import _Icon from '../../graphics/icon.js'
import _StatSet from '../../numbers/stats/statset.js'

class _Battalion {
    name = 'New Battalion'
    authorityLevel = 'E'
    battalionLevel = 'E'
    battalionExperience = 0
    uses = 2
    description = 'A new battalion'
    icon = new _Icon()
    minRange = 1
    maxRange = 1
    bonusStats = new _StatSet()
    squares= [3]
    effects = []
    hit= 0

    constructor(){}

    toObject(){
        return this.json()
    }

    json(){
        let returns = {
            name: this.name,
            authorityLevel: this.authorityLevel,
            battalionLevel: this.battalionLevel,
            battalionExperience: this.battalionExperience,
            uses: this.uses,
            description: this.description,
            minRange: this.minRange,
            maxRange: this.maxRange,
            squares: this.squares,
            effects: this.effects,
            hit: this.hit
        }
        if (this.icon){
            returns.icon = this.icon.json()
        }
        if (this.bonusStats){
            returns.bonusStats = this.bonusStats.json()
        }
        return returns
    }
}

export default _Battalion
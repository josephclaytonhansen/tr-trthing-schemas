import Icon from '../../graphics/icon'
import _StatSet from '../../numbers/stats/statset.js'

class _Battalion {
    public name?: string = 'New Battalion'
    public authorityLevel?: string = 'E'
    public battalionLevel?: string = 'E'
    public battalionExperience?: number = 0
    public uses?: number = 2
    public description?: string = 'A new battalion'
    public icon?: Icon = new Icon()
    public minRange?: number = 1
    public maxRange?: number = 1
    public bonusStats?: StatSet = new StatSet()
    public squares?: [number] = [1]
    public effects?: [string] = ['']
    public hit?: number = 0

    constructor(){}

    toObject(){
        return this.json()
    }

    json(){
        let returns: any = {
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
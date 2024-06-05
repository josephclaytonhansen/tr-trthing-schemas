import StatSet from '../../numbers/stats/statset'
import Growths from '../../numbers/stats/growths'
import SkillSet from '../skills/skillset'
import EventHook from '../../eventhooks/event'
import Sprite from '../../graphics/sprite'
import UnitClassIcon from '../../graphics/icon'

class UnitClass {
    constructor(
        public name: string = "",
        public icon: UnitClassIcon = new UnitClassIcon(),
        public description: string = "",
        public minStats: StatSet = new StatSet(),
        public growths: Growths = new Growths(),
        public level: string = "base",
        public promotions: UnitClass[] = [],
        public classSkills: SkillSet = new SkillSet(),
        public classSkillsReqs: EventHook[] = [],
        public isRiding: boolean = false,
        public isFlying: boolean = false,
        public isArmored: boolean = false,
        public isMagic: boolean = false,
        public isUnique: boolean = false,
        public sprites: {} = {
            default: new Sprite(),
        },
    ){}

    json() {
        let returns: any = {
            name: this.name,
            icon: this.icon,
            description: this.description,
            minStats: this.minStats.json(),
            growths: this.growths.json(),
            level: this.level,
            promotions: this.promotions.map((promotion) => promotion.json()),
            classSkills: this.classSkills.json(),
            classSkillsReqs: this.classSkillsReqs.map((req) => req.json()),
            isRiding: this.isRiding,
            isFlying: this.isFlying,
            isArmored: this.isArmored,
            isMagic: this.isMagic,
            isUnique: this.isUnique,
        }
        return returns
    }
}

export default UnitClass
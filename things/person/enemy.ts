import StatSet from '../numbers/stats/statset'
import Growths from '../numbers/stats/growths'
import SkillSet from '../person_adjacents/skills/skillset'
//import UnitClass from './classes/unitclass'
//import Inventory from './inventory'
import Personality from '../algorithms/units/personality'
import baseBehaviors from '../algorithms/units/basebehavior'
import Experiences from '../numbers/experiences/experiences'
import ExperiencesGrowth from '../numbers/experiences/growths'
import ExperiencesAptitude from '../numbers/experiences/aptitudes'

class Enemy {
    constructor(
        public id: string,
        public baseStats: StatSet = new StatSet(),
        public currentStats: StatSet = new StatSet(),
        public statGrowths: Growths = new Growths(),
        public skills: SkillSet = new SkillSet(),
        public experiences: Experiences = new Experiences(),
        public experienceGrowths: ExperiencesGrowth = new ExperiencesGrowth(),
        public experienceAptitudes: ExperiencesAptitude = new ExperiencesAptitude(),
        public level: number = 1,
        //public unitClass: UnitClass = new UnitClass(),
        public exp: number = 0,
        //public inventory: Inventory = new Inventory(),
        public unique: boolean = false,
        public ai: Personality = new Personality(),
        public baseBehavior: baseBehaviors = new baseBehaviors(),
    ) {}

    json() {
        let returns: any = {
            id: this.id,
            baseStats: this.baseStats.json(),
            currentStats: this.currentStats.json(),
            statGrowths: this.statGrowths.json(),
            skills: this.skills.json(),
            experiences: this.experiences.json(),
            experienceGrowths: this.experienceGrowths.json(),
            experienceAptitudes: this.experienceAptitudes.json(),
            level: this.level,
            //unitClass: this.unitClass.json(),
            exp: this.exp,
            //inventory: this.inventory.json(),
            unique: this.unique,
            ai: this.ai.json(),
            baseBehavior: this.baseBehavior.json()
        }
        return returns
    }
}

export default Enemy
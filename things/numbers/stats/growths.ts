import ExtraStats from '../../globalSettings/extrastats'

class Growths {
    constructor(
        public hpChance: number = 0,
        public strChance: number = 0,
        public magChance: number = 0,
        public sklChance: number = 0,
        public spdChance: number = 0,
        public lckChance: number = 0,
        public defChance: number = 0,
        public resChance: number = 0,
        public chaChance: number = 0,
        public movChance: number = 0,
        public enduranceChance: number = 0,
    ) {}

    json() {
        let returns: {
            hp: number,
            str: number,
            mag: number,
            skl: number,
            spd: number,
            def: number,
            res: number,
            cha: number,
            mov: number,
            lck?: number,
            endurance?: number
        } = {
            hp: this.hpChance,
            str: this.strChance,
            mag: this.magChance,
            skl: this.sklChance,
            spd: this.spdChance,
            def: this.defChance,
            res: this.resChance,
            cha: this.chaChance,
            mov: this.movChance,
        }
        if (ExtraStats.luck) {
            returns.lck = this.lckChance 
        }
        if (ExtraStats.weight && ExtraStats.weightAffectsMov) {
            returns.endurance = this.enduranceChance
        }
        return returns
    }
}

export default Growths
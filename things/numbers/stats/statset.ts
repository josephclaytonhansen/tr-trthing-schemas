import ExtraStats from '../../globalSettings/extrastats'

class StatSet {
    constructor(
        public hp: number = 0,
        public str: number = 0,
        public mag: number = 0,
        public skl: number = 0,
        public spd: number = 0,
        public lck: number = 0,
        public def: number = 0,
        public res: number = 0,
        public cha: number = 0,
        public mov: number = 0,
        public endurance: number = 0,
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
            hp: this.hp,
            str: this.str,
            mag: this.mag,
            skl: this.skl,
            spd: this.spd,
            def: this.def,
            res: this.res,
            cha: this.cha,
            mov: this.mov,
        }
        if (ExtraStats.luck) {
            returns.lck = this.lck 
        }
        if (ExtraStats.weight && ExtraStats.weightAffectsMov) {
            returns.endurance = this.endurance
        }
        return returns
    }
}

export default StatSet
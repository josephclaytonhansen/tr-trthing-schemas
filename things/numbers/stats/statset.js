class _StatSet {
    constructor(
        req,
        hp = 0,
        str = 0,
        mag = 0,
        skl = 0,
        spd = 0,
        def = 0,
        res = 0,
        cha = 0,
        mov = 0,
        lck = 0,
        endurance = 0,
        authority = 0
    ) {
        this.req = req
        this.hp = hp
        this.str = str
        this.mag = mag
        this.skl = skl
        this.spd = spd
        this.def = def
        this.res = res
        this.cha = cha
        this.mov = mov
        this.lck = lck
        this.endurance = endurance
        this.authority = authority
    }

    toObject(){
        return this.json()
    }

    clean() {
        this.req = null
    }

    json(req) {
        let returns = {
            hp: this.hp,
            str: this.str,
            mag: this.mag,
            skl: this.skl,
            spd: this.spd,
            def: this.def,
            res: this.res,
            cha: this.cha,
            mov: this.mov,
            hit: 0,
            crit: 0,
            avo: 0,

        }
        if (req.ExtraStats.luck) {
            returns.lck = this.lck 
        }
        if (req.ExtraStats.weight && req.ExtraStats.weightAffectsMov) {
            returns.endurance = this.endurance
        }
        if (req.ExtraStats.authority) {
            returns.authority = this.authority
        }
        return returns
    }
}

export default _StatSet
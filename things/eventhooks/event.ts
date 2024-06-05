class EventHook{
    public triggerEvent?:EventHook = new EventHook()
    public triggeredWithConditions?:boolean = false
    public triggerConditions?:[] = []
    public metConditions?:[] = []
    public metConditionsCount?:number = 0
    public branches?:EventHook[] = []
    public branchConditions?:[] = []
    public branchIndex?:number = 0
    public scope?:string = 'singular'
    public hasRun?:boolean = false

    canRun(conditions?:[], triggerEvent?:EventHook, triggeredWithConditions?:boolean) {
        if (triggerEvent && triggerEvent.hasRun && !triggeredWithConditions){
            return true
        } else if (triggerEvent && triggerEvent.hasRun && triggeredWithConditions){
            if (conditions){
                let metConditions = 0
                conditions.forEach((condition) => {
                    if (this.metConditions && this.metConditions.includes(condition)){
                        metConditions++
                    } else {
                        return false
                    }
                })
                if (metConditions === conditions.length){
                    return true
                } else {
                    return false
                }
            }
        } else if (!triggerEvent && conditions){
            let metConditions = 0
            conditions.forEach((condition) => {
                if (this.metConditions && this.metConditions.includes(condition)){
                    metConditions++
                } else {
                    return false
                }
            })
            if (metConditions === conditions.length){
                return true
            } else {
                return false
            }
        }
    }

    run() {
        // this method is unique, should be overwritten by the child class
        // ...
        this.hasRun = true
    }

    branch(branchIndex: number) {
        if (this.branches && this.branches.length <= branchIndex) {
        this.branchIndex = branchIndex
        this.branches[branchIndex].run()}
        else if (this.branches){
        this.branchIndex = -1
        this.branches[0].run()
        }
    }

    json() {
        let returns: any = {
            triggerConditions: this.triggerConditions,
            metConditions: this.metConditions,
            metConditionsCount: this.metConditionsCount,
            branchConditions: this.branchConditions,
            branchIndex: this.branchIndex,
            scope: this.scope,
        }
        if (this.triggerEvent) {
            returns['triggerEvent'] = this.triggerEvent.json()
        }
        if (this.branches) {
            returns['branches'] = this.branches.map((branch) => branch.json())
        }
        return returns
    }
    
}

export default EventHook
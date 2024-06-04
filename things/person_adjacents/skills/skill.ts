class Skill {
    public name: string = ''
    public icon?: string = ''
    public description?: string = ''
    public skillFile?: string = ''
    public skillFunction?: string = ''
    constructor(name: string, icon?: string, description?: string, skillFile?: string, skillFunction?: string){}

    json() {
        return {
            name: this.name,
            icon: this.icon,
            description: this.description,
            skillFile: this.skillFile,
            skillFunction: this.skillFunction
        }
    }
}

export default Skill
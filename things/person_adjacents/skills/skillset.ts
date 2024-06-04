import Skill from './skill'

class SkillSet {
    public skills: Skill[] = []
    public mastered: Skill[] = []
    public equipped?: Skill 

    json() {
        return this.skills.map(skill => {
            return {
                name: skill.name,
                icon: skill.icon,
                description: skill.description,
                skillFile: skill.skillFile,
                skillFunction: skill.skillFunction,
                mastered: this.mastered.includes(skill),
                equipped: this.equipped === skill
            }
        })
    }
}

export default SkillSet
import Portrait from "../graphics/person/portrait"
import Sprite from "../graphics/sprite"
import UnitClass from "../person_adjacents/classes/unitclass"
import SkillSet from "../person_adjacents/skills/skillset"

class _Details {
    constructor(
        public id: string,
        public name: string = 'New Unit',
        public alive: boolean = true,
        public age: number = 0,
        public pronouns: object = {
            singular: 'they',
            possessive: 'their',
            possessives: 'theirs',
            object: 'them',
        },
        public gender: string = 'not set',
        public orientation: string = 'not set',
        public height: number = 166,
        public birthday: object = {
            month: 1,
            day: 1,
        },
        public shortDescription: string = '',
        public longDescription: string = '',
        public likes = [],
        public dislikes = [],
        public hobbies = [],
        public team: string = '',
        public title: string = '',
        public specialUnitClasses: UnitClass[] = [],
        public specialSkills: SkillSet[] = [],
        public portraits?: {},
        public sprites = {},
        public specialColors = {},
    ){
        if (!this.portraits) {
            this.portraits = {'default':new Portrait(this.id)}
        }
        if (!this.sprites) {
            this.sprites = {'default':new Sprite()}
        }
    }

    json() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            pronouns: this.pronouns,
            gender: this.gender,
            orientation: this.orientation,
            height: this.height,
            birthday: this.birthday,
            shortDescription: this.shortDescription,
            longDescription: this.longDescription,
            likes: this.likes,
            dislikes: this.dislikes,
            hobbies: this.hobbies,
            team: this.team,
            title: this.title,
            specialUnitClasses: this.specialUnitClasses,
            specialSkills: this.specialSkills,
            portraits: this.portraits,
            sprites: this.sprites,
            specialColors: this.specialColors,
            alive: this.alive,
        }
    }
}

export default _Details
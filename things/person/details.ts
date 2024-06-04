class Details {
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
        public specialUnitClasses = [],
        public specialSkills = [],
        public portraits = {},
        public sprites = {},
        public specialColors = {},
    ){}

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

export default Details
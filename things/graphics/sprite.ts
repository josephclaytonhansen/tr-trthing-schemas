class Sprite {
    constructor(
        public spriteSheet: string = "",
        public spriteX: number = 0,
        public spriteY: number = 0,
        public spriteWidth: number = 0,
        public spriteHeight: number = 0,
        public spriteOffsetX: number = 0,
        public spriteOffsetY: number = 0,
        public spriteScale: number = 1,
    ){}

    json() {
        let returns: any = {
            spriteSheet: this.spriteSheet,
            spriteX: this.spriteX,
            spriteY: this.spriteY,
            spriteWidth: this.spriteWidth,
            spriteHeight: this.spriteHeight,
            spriteOffsetX: this.spriteOffsetX,
            spriteOffsetY: this.spriteOffsetY,
            spriteScale: this.spriteScale,
        }
        return returns
    }
}

export default Sprite
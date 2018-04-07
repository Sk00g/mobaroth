import * as constants from './constants.js';

export var ball = {
    x: constants.SCREEN_WIDTH / 2, y: constants.SCREEN_HEIGHT / 2, 
    w: 10, h: 10, 
    color: 'white',
    dir: {x: Math.random() - .5, y: Math.abs(Math.random() * 5 + 5)},
    speed: constants.BAT_DEFAULT_SPEED,
    hitRoofCB: function() { console.log("hit roof"); },
    draw: function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    },
    incrementSpeed: function () {
        this.speed += 40;
        if (this.speed > constants.MAX_BALL_SPEED)
            this.speed = constants.MAX_BALL_SPEED;
        
        console.log("New speed: " + this.speed )
    },
    update: function (delta) {
        this.x += this.dir.x * this.speed * delta;
        this.y += this.dir.y * this.speed * delta;

        if (this.x < this.w / 2) {
            this.dir.x *= -1;
            this.x = this.w / 2;
        } 
        else if (this.x > constants.SCREEN_WIDTH - this.w / 2)
        {
            this.dir.x *= -1;
            this.x = constants.SCREEN_WIDTH - this.w / 2;
        }
        if (this.y < this.h / 2) {
            this.dir.y *= -1;
            this.y = this.h / 2;
            this.hitRoofCB();
        }
        if (this.y > constants.SCREEN_HEIGHT - this.h / 2) {
            this.dir.y *= -1;
            this.y = constants.SCREEN_HEIGHT - this.h / 2;
        }
    }
};

export var bat = {
    x: constants.SCREEN_WIDTH / 2 - constants.BAT_WIDTH / 2, y:  10,
    w: constants.BAT_WIDTH, h: constants.BAT_HEIGHT,
    color: 'white',
    speed: constants.BAT_SPEED,
    dirX: 0, // Can be -1, 0, or 1

    update: function(delta) {
        this.x += this.dirX * this.speed * delta;

        if (this.x < 0 + constants.BAT_EDGE_BUFFER)
            this.x = 0 + constants.BAT_EDGE_BUFFER;
        else if (this.x > constants.SCREEN_WIDTH - this.w - constants.BAT_EDGE_BUFFER)
            this.x = constants.SCREEN_WIDTH - this.w - constants.BAT_EDGE_BUFFER;
    },
    draw: function(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

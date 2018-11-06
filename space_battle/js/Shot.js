const SHOT_LIFE = 30, SHOT_DISPLAY_RADIUS = 2, SHOT_SPEED = 6;

function shotClass() {

    this.draw = function () {
        if (this.shotLife > 0) {
            colourCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, "white");
        }
    };

    this.reset = function () {
        this.shotLife = 0;
    };

    this.move = function () {
        if(this.shotLife > 0) {
            --this.shotLife;
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.handleScreenWrap();
    };

    this.handleScreenWrap = function () {
        if (this.x + playerPic.width / 2 > canvas.width) {
            this.x -= canvas.width;
        } else if (this.x + playerPic.width / 2 < 0) {
            this.x += canvas.width;
        }

        if (this.y + playerPic.height / 2 > canvas.height) {
            this.y -= canvas.height;
        } else if (this.y + playerPic.height / 2 < 0) {
            this.y += canvas.height;
        }
    };

    this.isReadyToFire = function () {
        return this.shotLife <= 0
    }

    this.shootFrom = function (ship) {
        this.x = ship.x;
        this.y = ship.y;

        this.xSpeed = Math.cos(ship.ang) * SHOT_SPEED + ship.driftX;
        this.ySpeed = Math.sin(ship.ang) * SHOT_SPEED + ship.driftY;

        this.shotLife = SHOT_LIFE;
    };
}
'use strict';

var pressed = { up: [false, false], down: [false, false], left: [false, false], right: [false, false], fireUp: [false, false], fireDown: [false, false], fireLeft: [false, false], fireRight: [false, false] };
var bulX = [], bulY = [];
var dir = [];
var health = [5, 5];
var dead = false;
var inv = [0, 0];
var fire = [0, 0];
var speed = 1;
var speedControl = 0;

let menuImg;
let sounds = { damage: 0, shoot: 0, win: 0, select: 0, enter: 0, escape: 0, boom: 0 };

function preload() {
    var context = new AudioContext();
    menuImg = loadImage('source/menu.jpg');
    sounds.damage = loadSound("source/damage.wav");
    sounds.shoot = loadSound("source/shoot.wav");
    sounds.win = loadSound("source/win.wav");
    sounds.select = loadSound("source/select.wav");
    sounds.enter = loadSound("source/enter.wav");
    sounds.escape = loadSound("source/escape.wav");
    //sounds.boom = loadSound("source/boom.wav");
}

function Wall(x, y) {
    this.x = x;
    this.y = y;
    this.show = function () {
        fill(160, 78, 0);
        rect(this.x, this.y, 10, 10);
    }
}


function Player(x, y, num) {
    this.x = x;
    this.y = y;
    this.powerUp = 0;
    this.swordRight = true;
    this.hit = function () {
        sounds.shoot.stop();
        sounds.damage.play();
        health[num]--;
        inv[num] = 15;
    }
    this.show = function () {
        if (inv[num] == 0) {
            if (num == 0) {
                fill(0, 200, 200);
            }
            else {
                fill(200, 0, 0);
            }
        }
        else {
            fill(255, 255, 0);
        }
        rect(this.x, this.y, 10, 10);
        if (num == 0) {
            fill(200, 0, 0);
        }
        else {
            fill(0, 200, 200);
        }
        if (this.powerUp != 1) {
            switch (dir[num]) {
                case 'up':
                    rect(this.x + 2, this.y, 6, 2);
                    break;
                case 'down':
                    rect(this.x + 2, this.y + 8, 6, 2);
                    break;
                case 'left':
                    rect(this.x, this.y + 2, 2, 6);
                    break;
                case 'right':
                    rect(this.x + 8, this.y + 2, 2, 6);
                    break;
            }
        }
        if (this.powerUp == 1) {
            fill(255);
            switch (dir[num]) {
                case 'up':
                    if (this.swordRight) {
                        rect(this.x + 5, this.y, 15, 3);
                    }
                    else {
                        rect(this.x - 10, this.y, 15, 3);
                    }
                    break;
                case 'down':
                    if (this.swordRight) {
                        rect(this.x - 10, this.y + 7, 15, 3);
                    }
                    else {
                        rect(this.x + 5, this.y + 7, 15, 3);
                    }
                    break;
                case 'left':
                    if (this.swordRight) {
                        rect(this.x, this.y - 10, 3, 15);
                    }
                    else {
                        rect(this.x, this.y + 5, 3, 15);
                    }
                    break;
                case 'right':
                    if (this.swordRight) {
                        rect(this.x + 7, this.y + 5, 3, 15);
                    }
                    else {
                        rect(this.x + 7, this.y - 10, 3, 15);
                    }
                    break;
            }
        }
    }
    this.move = function () {
        this.prevX = this.x;
        this.prevY = this.y;
        var plX = this.x, plY = this.y;
        if (pressed.up[num]) {
            if (plY >= 5) {
                plY -= 5 * speed * (deltaTime / 20);
            }
            else {
                plY = 585;
            }
        }
        if (pressed.down[num]) {
            if (plY <= 585) {
                plY += 5 * speed * (deltaTime / 20);
            }
            else {
                plY = 5;
            }
        }
        if (pressed.left[num]) {
            if (plX >= 5) {
                plX -= 5 * speed * (deltaTime / 20);
            }
            else {
                plX = 585;
            }
        }
        if (pressed.right[num]) {
            if (plX <= 585) {
                plX += 5 * speed * (deltaTime / 20);
            }
            else {
                plX = 5;
            }
        }
        if (speed == 1) {
            if (plX % 5 <= 2) {
                plX -= plX % 5;
            }
            else if (plX % 5 >= 3) {
                plX += 5 - plX % 5;
            }
            if (plY % 5 <= 2) {
                plY -= plY % 5;
            }
            else if (plY % 5 >= 3) {
                plY += 5 - plY % 5;
            }
        }
        var breakX = false, breakY = false;
        if (pressed.right[num] || pressed.left[num]) {
            for (var i = 0; i < walls.length; i++) {
                if (Math.abs(plX - walls[i].x) < 10 && Math.abs(this.y - walls[i].y) < 10) {
                    plX = this.x;
                    breakX = true;
                    break;
                }
            }
        }
        if (pressed.up[num] || pressed.down[num]) {
            for (var i = 0; i < walls.length; i++) {
                if (Math.abs(plX - walls[i].x) < 10 && Math.abs(plY - walls[i].y) < 10) {
                    plY = this.y;
                    breakY = true;
                    break;
                }
            }
        }
        if ((pressed.up[num] || pressed.down[num]) && (pressed.left[num] || pressed.right[num]) && !breakX && !breakY) {
            for (var i = 0; i < walls.length; i++) {
                if ((Math.abs(plX - walls[i].x) < 10 && Math.abs(plY - walls[i].y) <= 5) && (Math.abs(plX - walls[i].x) <= 5 && Math.abs(plY - walls[i].y) < 10)) {
                    plY = this.y;
                    break;
                }
            }
        }
        this.x = plX;
        this.y = plY;
    }
}

function Bullet(num) {
    var dirLoc = dir[num];
    var gone = 0;
    this.x = bulX[num];
    this.y = bulY[num];
    sounds.shoot.play();
    this.show = function () {
        fill(255, 170, 0);
        ellipse(this.x, this.y, 8, 8);
    }
    this.move = function () {
        switch (dirLoc) {
            case 'up':
                this.y -= 10 * speed * (deltaTime / 20);
                break;
            case 'down':
                this.y += 10 * speed * (deltaTime / 20);
                break;
            case 'left':
                this.x -= 10 * speed * (deltaTime / 20);
                break;
            case 'right':
                this.x += 10 * speed * (deltaTime / 20);
                break;
        }
        this.toDelete = (this.x < 0 || this.x > 600 || this.y < 0 || this.y > 600);
        var opp = (num == 1) ? 0 : 1;
        if (((this.x - 4 >= player[opp].x && this.x - 4 <= player[opp].x + 10) || (this.x + 4 >= player[opp].x && this.x + 4 <= player[opp].x + 10)) && ((this.y - 4 >= player[opp].y && this.y - 4 <= player[opp].y + 10) || (this.y + 4 >= player[opp].y && this.y + 4 <= player[opp].y + 10))) {
            if (inv[opp] == 0) {
                player[opp].hit();
            }
            this.toDelete = true;
        }
        else if (gone >= 2 / speed && (((this.x - 4 >= player[num].x && this.x - 4 <= player[num].x + 10) || (this.x + 4 >= player[num].x && this.x + 4 <= player[num].x + 10)) && ((this.y - 4 >= player[num].y && this.y - 4 <= player[num].y + 10) || (this.y + 4 >= player[num].y && this.y + 4 <= player[num].y + 10)))) {
            if (inv[num] == 0) {
                player[num].hit();
            }
            this.toDelete = true;
        }
        for (var i = 0; i < walls.length; i++) {
            var touched = 0;
            if (this.x - 4 >= walls[i].x) {
                if (this.x - 4 - walls[i].x <= 9) {
                    touched++;
                }
            }
            else {
                if (walls[i].x - this.x + 4 <= 7) {
                    touched++;
                }
            }
            if (this.y >= walls[i].y) {
                if (this.y - 4 - walls[i].y <= 9) {
                    touched++;
                }
            }
            else {
                if (walls[i].y - this.y + 4 <= 7) {
                    touched++;
                }
            }
            if (touched == 2) {
                this.toDelete = true;
            }
        }
        gone++;
    }
}

function Sword(num) {
    this.toDelete = false;
    this.delCount = 0;
    this.brdXF;
    this.brdXL;
    this.brdYF;
    this.brdYL;
    if (dir[num] == 'up') {
        this.brdXF = player[num].x - 10;
        this.brdXL = player[num].x + 10;
        this.brdYF = player[num].y - 15;
        this.brdYL = player[num].y;
    }
    else if (dir[num] == 'down') {
        this.brdXF = player[num].x - 10;
        this.brdXL = player[num].x + 10;
        this.brdYF = player[num].y;
        this.brdYL = player[num].y + 15;
    }
    else if (dir[num] == 'left') {
        this.brdYF = player[num].y - 10;
        this.brdYL = player[num].y + 10;
        this.brdXF = player[num].x - 15;
        this.brdXL = player[num].x;
    }
    else {
        this.brdYF = player[num].y - 10;
        this.brdYL = player[num].y + 10;
        this.brdXF = player[num].x;
        this.brdXL = player[num].x + 15;
    }
    this.move = function () {
        for (var i = 0; i < bullets[0].length; i++) {
            if (((this.brdXF >= bullets[0][i].x - 4 && this.brdXF <= bullets[0][i].x + 4) || (this.brdXL >= bullets[0][i].x - 4 && this.brdXL <= bullets[0][i].x + 4)) && ((this.brdYF >= bullets[0][i].y - 4 && this.brdYF <= bullets[0][i].y + 4) || (this.brdYL >= bullets[0][i].y - 4 && this.brdYL <= bullets[0][i].y + 4))) {
                bullets[0][i].toDelete = true;
            }
        }
        for (var i = 0; i < bullets[1].length; i++) {
            if (((this.brdXF >= bullets[1][i].x - 4 && this.brdXF <= bullets[1][i].x + 4) || (this.brdXL >= bullets[1][i].x - 4 && this.brdXL <= bullets[1][i].x + 4)) && ((this.brdYF >= bullets[1][i].y - 4 && this.brdYF <= bullets[1][i].y + 4) || (this.brdYL >= bullets[1][i].y - 4 && this.brdYL <= bullets[1][i].y + 4))) {
                bullets[1][i].toDelete = true;
            }
        }
        var op = (num == 0) ? (1) : (0);
        if ((player[op].x >= this.brdXF && player[op].x <= this.brdXL) || (player[op].x + 10 >= this.brdXF && player[op].x + 10 <= this.brdXL)) {
            if ((player[op].y >= this.brdYF && player[op].y <= this.brdYL) || (player[op].y + 10 >= this.brdYF && player[op].y + 10 <= this.brdYL)) {
                if (inv[op] == 0) {
                    player[op].hit();
                }
            }
        }
        this.delCount++;
        if (this.delCount == 5) {
            this.toDelete = true;
        }
    }
    this.show = function () {
        fill(255);
        switch (dir[num]) {
            case 'up':
                arc(player[num].x + 5, player[num].y, 30, 20, PI, 0);
                break;
            case 'down':
                arc(player[num].x + 5, player[num].y + 10, 30, 20, 0, PI);
                break;
            case 'left':
                arc(player[num].x, player[num].y + 5, 20, 30, HALF_PI, -HALF_PI);
                break;
            case 'right':
                arc(player[num].x + 10, player[num].y + 5, 20, 30, -HALF_PI, HALF_PI);
                break;
        }
    }
}

function WideBullet(num) {
    var dirLoc = dir[num];
    var gone = 0;
    this.x = bulX[num];
    this.y = bulY[num];
    this.border = { up: 0, down: 0, left: 0, right: 0 };
    switch (dirLoc) {
        case 'up':
            this.border.left = -10;
            this.border.right = 9;
            this.border.up = -5;
            this.border.down = -1;
            break;
        case 'down':
            this.border.left = -10;
            this.border.right = 9;
            this.border.down = 4;
            break;
        case 'left':
            this.border.left = -5;
            this.border.up = -10;
            this.border.down = 9;
            this.border.right = -1;
            break;
        case 'right':
            this.border.up = -10;
            this.border.down = 9;
            this.border.right = 4;
            break;
    }
    sounds.shoot.play();
    this.show = function () {
        fill(255, 153, 51);
        switch (dirLoc) {
            case 'up':
                arc(this.x, this.y, 20, 10, PI, 0);
                break;
            case 'down':
                arc(this.x, this.y, 20, 10, 0, PI);
                break;
            case 'left':
                arc(this.x, this.y, 10, 20, HALF_PI, -HALF_PI);
                break;
            case 'right':
                arc(this.x, this.y, 10, 20, -HALF_PI, HALF_PI);
                break;
        }
    }
    this.move = function () {
        switch (dirLoc) {
            case 'up':
                this.y -= 8;
                break;
            case 'down':
                this.y += 8;
                break;
            case 'left':
                this.x -= 8;
                break;
            case 'right':
                this.x += 8;
                break;
        }
        this.toDelete = (this.x < 0 || this.x > 600 || this.y < 0 || this.y > 600);
        var opp = (num == 1) ? 0 : 1;
        if (((this.x + this.border.left >= player[opp].x && this.x + this.border.left <= player[opp].x + 10) || (this.x + this.border.right >= player[opp].x && this.x + this.border.right <= player[opp].x + 10)) && ((this.y + this.border.up >= player[opp].y && this.y + this.border.up <= player[opp].y + 10) || (this.y + this.border.down >= player[opp].y && this.y + this.border.down <= player[opp].y + 10))) {
            if (inv[opp] == 0) {
                player[opp].hit();
            }
            this.toDelete = true;
        }
        else if (gone < 3 && (((this.x + this.border.left >= player[num].x && this.x + this.border.left <= player[num].x + 10) || (this.x + this.border.right >= player[num].x && this.x + this.border.right <= player[num].x + 10)) && ((this.y + this.border.up >= player[num].y && this.y + this.border.up <= player[num].y + 10) || (this.y + this.border.down >= player[num].y && this.y + this.border.down <= player[num].y + 10)))) {
            if (inv[num] == 0) {
                player[num].hit();
            }
            this.toDelete = true;
        }
        for (var i = 0; i < walls.length; i++) {
            var touched = 0;
            if (this.x + this.border.left >= walls[i].x) {
                if (Math.abs(this.x + this.border.left - walls[i].x) <= 10) {
                    touched++;
                }
            }
            else {
                if (Math.abs(this.x + this.border.right - walls[i].x) <= 10) {
                    touched++;
                }
            }
            if (this.y >= walls[i].y) {
                if (Math.abs(this.y + this.border.up - walls[i].y) <= 10) {
                    touched++;
                }
            }
            else {
                if (Math.abs(this.y + this.border.down - walls[i].y) <= 10) {
                    touched++;
                }
            }
            if (touched == 2) {
                this.toDelete = true;
            }
        }
        gone++;
    }
}

function setup() {
    createCanvas(600, 600);
    noStroke();
}

var player = [new Player(100, 300, 0), new Player(500, 300, 1)];
var bullets = [[], []];

var onPress = function (event) {
    var state = (event.type == 'keydown');
    switch (event.keyCode) {
        case 65:
            pressed.left[0] = state;
            break;
        case 87:
            pressed.up[0] = state;
            break;
        case 68:
            pressed.right[0] = state;
            break;
        case 83:
            pressed.down[0] = state;
            break;
        ////////////
        case 37:
            pressed.left[1] = state;
            break;
        case 38:
            pressed.up[1] = state;
            break;
        case 39:
            pressed.right[1] = state;
            break;
        case 40:
            pressed.down[1] = state;
            break;
        case 73:
            if (health[0] != 0)
                pressed.fireUp[0] = state;
            break;
        case 75:
            if (health[0] != 0)
                pressed.fireDown[0] = state;
            break;
        case 74:
            if (health[0] != 0)
                pressed.fireLeft[0] = state;
            break;
        case 76:
            if (health[0] != 0)
                pressed.fireRight[0] = state;
            break;
        case 101:
            if (health[0] != 0)
                pressed.fireUp[1] = state;
            break;
        case 98:
            if (health[0] != 0)
                pressed.fireDown[1] = state;
            break;
        case 97:
            if (health[0] != 0)
                pressed.fireLeft[1] = state;
            break;
        case 99:
            if (health[0] != 0)
                pressed.fireRight[1] = state;
            break;
    }
}

window.addEventListener('keydown', onPress);
window.addEventListener('keyup', onPress);

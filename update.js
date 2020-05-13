var screen = 0;

var pl0Standart = [100, 300];
var pl1Standart = [500, 300];

var menuSelect = true;

var choose = 1;

var winPlay = true;

var localDelta = 0;

function draw() {
    if (speedControl != 0) {
        localDelta += deltaTime;
    }
    if (speedControl == 0) {
        if (speed == 0.2) {
            localDelta = 0;
            speedControl = -7;
        }
    }
    else if (speedControl > 0) {
        if (screen == 1) {
            speed = 0.2;
            if (localDelta >= 1000) {
                speedControl--;
                localDelta = 0;
            }
        }
    }
    else {
        if (screen == 1) {
            speed = 1;
            if (localDelta >= 1000) {
                speedControl++;
                localDelta = 0;
            }
        }
    }
    background(51);
    player[0].show();
    player[1].show();
    for (var i = 0; i < bullets[0].length; i++) {
        bullets[0][i].show();
    }
    for (var i = 0; i < bullets[1].length; i++) {
        bullets[1][i].show();
    }
    for (var i = 0; i < walls.length; i++) {
        walls[i].show();
    }
    textSize(24);
    fill(0, 200, 200);
    text(health[0], 10, 580);
    fill(200, 0, 0);
    text(health[1], 580, 580);
    if (speedControl >= 0) {
        fill(200, 150, 0);
        text(speedControl, 290, 580);
    }
    else {
        fill(200, 0, 0);
        text(speedControl * -1, 290, 580);
    }
    if (health[0] <= 0 || health[1] <= 0) {
        screen = 3;
        if (winPlay) {
            sounds.damage.stop();
            sounds.shoot.stop();
            sounds.win.play();
            winPlay = false;
        }
    }
    else if (!winPlay) {
        winPlay = true;
    }
    if (screen == 0) {
        image(menuImg, 0, 0);
        if (menuSelect) {
            fill(255, 255, 0);
        }
        else {
            fill(255);
        }
        text('Играть', 260, 450);
        if (menuSelect) {
            fill(255);
        }
        else {
            fill(255, 255, 0);
        }
        text('Как играть', 240, 480);
        textSize(16);
        fill(255);
        text('W / S /', 210, 500);
        triangle(260, 500, 270, 500, 265, 490);
        text('/', 275, 500);
        triangle(285, 490, 295, 490, 290, 500);
        text(' - ВЫБОР.', 300, 500);
        text('Enter - OK.', 260, 520);
    }
    else if (screen == -1) {
        image(menuImg, 0, 0);
        textSize(16);
        fill(255);
        text('Эта игра рассчитана на двоих игроков. Если у вас нет друзей,', 80, 350);
        text('мне вас очень жаль.', 50, 370);
        text('Стреляя в разные стороны нужно попасть во второго игрока, после', 80, 390);
        text('чего у него отнимется единица здоровья (их значение можно увидеть', 50, 410);
        text('внизу экрана). Когда у противника закончатся жизни, вы победите.', 50, 430);
        textSize(24);
        text('УПРАВЛЕНИЕ', 230, 490);
        textSize(16);
        text('Первый игрок', 50, 490);
        text('W', 53, 520);
        text('A   S   D', 30, 545);
        text('Ходьба', 30, 575);
        text('I', 173, 520);
        text('J   K   L', 150, 545);
        text('Стрельба', 140, 575);
        text('Второй игрок', 450, 490);
        triangle(445, 520, 455, 520, 450, 510);
        triangle(435, 535, 435, 545, 425, 540);
        triangle(445, 535, 455, 535, 450, 545);
        triangle(465, 535, 465, 545, 475, 540);
        text('Ходьба', 425, 575);
        text('5', 545, 520);
        text('1   2   3', 525, 545);
        text('Стрельба', 515, 575);
        text('(NumPad)', 515, 595);
        text('Escape - пауза', 260, 530);
        text('Нажите Enter', 265, 590);
    }
    else if (screen == 1) {
        player[0].move();
        player[1].move();
        if (fire[0] == 0 && health[0] != 0 && health[1] != 0) {
            if (pressed.fireUp[0]) {
                dir[0] = 'up';
                bulX[0] = player[0].x + 5;
                bulY[0] = player[0].y + 5;
                var bullet;
                var shft = false;
                if (player[0].powerUp == -1) {
                    bullet = new WideBullet(0);
                }
                else if (player[0].powerUp == 1) {
                    player[0].swordRight = (player[0].swordRight) ? (false) : (true);
                    bullet = new Sword(0);
                    shft = true;
                }
                else {
                    bullet = new Bullet(0);
                }
                if (shft) {
                    bullets[0].unshift(bullet)
                }
                else {
                    bullets[0].push(bullet);
                }
                if (speed == 0.2) {
                    fire[0] = 35;
                }
                else {
                    fire[0] = 10;
                }
            }
            else if (pressed.fireDown[0]) {
                dir[0] = 'down';
                bulX[0] = player[0].x + 5;
                bulY[0] = player[0].y + 5;
                var bullet;
                var shft = false;
                if (player[0].powerUp == -1) {
                    bullet = new WideBullet(0);
                }
                else if (player[0].powerUp == 1) {
                    player[0].swordRight = (player[0].swordRight) ? (false) : (true);
                    bullet = new Sword(0);
                    shft = true;
                }
                else {
                    bullet = new Bullet(0);
                }
                if (shft) {
                    bullets[0].unshift(bullet);
                }
                else {
                    bullets[0].push(bullet);
                }
                if (speed == 0.2) {
                    fire[0] = 35;
                }
                else {
                    fire[0] = 10;
                }
            }
            else if (pressed.fireRight[0]) {
                dir[0] = 'right';
                bulX[0] = player[0].x + 5;
                bulY[0] = player[0].y + 5;
                var bullet;
                var shft = false;
                if (player[0].powerUp == -1) {
                    bullet = new WideBullet(0);
                }
                else if (player[0].powerUp == 1) {
                    player[0].swordRight = (player[0].swordRight) ? (false) : (true);
                    bullet = new Sword(0);
                    shft = true;
                }
                else {
                    bullet = new Bullet(0);
                }
                if (shft) {
                    bullets[0].unshift(bullet);
                }
                else {
                    bullets[0].push(bullet);
                }
                if (speed == 0.2) {
                    fire[0] = 35;
                }
                else {
                    fire[0] = 10;
                }
            }
            else if (pressed.fireLeft[0]) {
                dir[0] = 'left';
                bulX[0] = player[0].x + 5;
                bulY[0] = player[0].y + 5;
                var bullet;
                var shft = false;
                if (player[0].powerUp == -1) {
                    bullet = new WideBullet(0);
                }
                else if (player[0].powerUp == 1) {
                    player[0].swordRight = (player[0].swordRight) ? (false) : (true);
                    bullet = new Sword(0);
                    shft = true;
                }
                else {
                    bullet = new Bullet(0);
                }
                if (shft) {
                    bullets[0].unshift(bullet);
                }
                else {
                    bullets[0].push(bullet);
                }
                if (speed == 0.2) {
                    fire[0] = 35;
                }
                else {
                    fire[0] = 10;
                }
            }
        }
        else {
            if (pressed.fireDown[0] || pressed.fireLeft[0] || pressed.fireRight[0] || pressed.fireUp[0]) {
                fire[0]--;
            }
            else {
                fire[0] = 0;
            }
        }
        if (fire[1] == 0 && health[1] != 0 && health[0] != 0) {
            if (pressed.fireUp[1]) {
                dir[1] = 'up';
                bulX[1] = player[1].x + 5;
                bulY[1] = player[1].y + 5;
                var bullet;
                if (player[1].powerUp == -1) {
                    bullet = new WideBullet(1);
                }
                else if (player[1].powerUp == 1) {
                    player[1].swordRight = (player[1].swordRight) ? (false) : (true);
                    bullet = new Sword(1);
                }
                else {
                    bullet = new Bullet(1);
                }
                bullets[1].push(bullet);
                if (speed == 0.2) {
                    fire[1] = 35;
                }
                else {
                    fire[1] = 10;
                }
            }
            else if (pressed.fireDown[1]) {
                dir[1] = 'down';
                bulX[1] = player[1].x + 5;
                bulY[1] = player[1].y + 5;
                var bullet;
                if (player[1].powerUp == -1) {
                    bullet = new WideBullet(1);
                }
                else if (player[1].powerUp == 1) {
                    player[1].swordRight = (player[1].swordRight) ? (false) : (true);
                    bullet = new Sword(1);
                }
                else {
                    bullet = new Bullet(1);
                }
                bullets[1].push(bullet);
                if (speed == 0.2) {
                    fire[1] = 35;
                }
                else {
                    fire[1] = 10;
                }
            }
            else if (pressed.fireRight[1]) {
                dir[1] = 'right';
                bulX[1] = player[1].x + 5;
                bulY[1] = player[1].y + 5;
                var bullet;
                if (player[1].powerUp == -1) {
                    bullet = new WideBullet(1);
                }
                else if (player[1].powerUp == 1) {
                    player[1].swordRight = (player[1].swordRight) ? (false) : (true);
                    bullet = new Sword(1);
                }
                else {
                    bullet = new Bullet(1);
                }
                bullets[1].push(bullet);
                if (speed == 0.2) {
                    fire[1] = 35;
                }
                else {
                    fire[1] = 10;
                }
            }
            else if (pressed.fireLeft[1]) {
                dir[1] = 'left';
                bulX[1] = player[1].x + 5;
                bulY[1] = player[1].y + 5;
                var bullet;
                if (player[1].powerUp == -1) {
                    bullet = new WideBullet(1);
                }
                else if (player[1].powerUp == 1) {
                    player[1].swordRight = (player[1].swordRight) ? (false) : (true);
                    bullet = new Sword(1);
                }
                else {
                    bullet = new Bullet(1);
                }
                bullets[1].push(bullet);
                if (speed == 0.2) {
                    fire[1] = 35;
                }
                else {
                    fire[1] = 10;
                }
            }
        }
        else {
            if (pressed.fireDown[1] || pressed.fireLeft[1] || pressed.fireRight[1] || pressed.fireUp[1]) {
                fire[1]--;
            }
            else {
                fire[1] = 0;
            }
        }
        for (var i = bullets[0].length - 1; i >= 0; i--) {
            if (bullets[0][i].toDelete) {
                bullets[0].splice(i, 1);
            }
            else {
                bullets[0][i].move();
            }
        }
        for (var i = bullets[1].length - 1; i >= 0; i--) {
            if (bullets[1][i].toDelete) {
                bullets[1].splice(i, 1);
            }
            else {
                bullets[1][i].move();
            }
        }
        if (inv[0] > 0) {
            inv[0]--;
        }
        if (inv[1] > 0) {
            inv[1]--;
        }
    }
    else if (screen == 2) {
        textSize(24);
        fill(255);
        text('Пауза', 265, 300);
        if (menuSelect) {
            fill(255, 255, 0);
        }
        else {
            fill(255);
        }
        text('Заново', 260, 450);
        if (menuSelect) {
            fill(255);
        }
        else {
            fill(255, 255, 0);
        }
        text('Выход', 265, 480);
        textSize(16);
        fill(255);
        text('W / S /', 210, 500);
        triangle(260, 500, 270, 500, 265, 490);
        text('/', 275, 500);
        triangle(285, 490, 295, 490, 290, 500);
        text(' - ВЫБОР.', 300, 500);
        text('Enter - OK.', 260, 520);
    }
    else {
        pressed = { up: [false, false], down: [false, false], left: [false, false], right: [false, false], fireUp: [false, false], fireDown: [false, false], fireLeft: [false, false], fireRight: [false, false] };
        inv[0] = 0;
        inv[1] = 0;
        if (health[0] <= 0 && health[1] <= 0) {
            dead = true;
            player[0].x = -10;
            player[0].y = -10;
            player[1].x = -10;
            player[1].x = -10;
            bullets[0] = [];
            bullets[1] = [];
            fill(200, 0, 200);
            textSize(40);
            text('Ничья!!1!', 160, 100);
        }
        else if (health[0] <= 0) {
            dead = true;
            player[0].x = -10;
            player[0].y = -10;
            bullets[0] = [];
            bullets[1] = [];
            fill(200, 0, 0);
            textSize(40);
            text('Второй игрок победил!', 100, 100);
        }
        else if (health[1] <= 0) {
            dead = true;
            player[1].x = -10;
            player[1].x = -10;
            bullets[1] = [];
            bullets[0] = []
            fill(0, 200, 200);
            textSize(40);
            text('Первый игрок победил!', 100, 100);
        }
        textSize(24);
        if (menuSelect) {
            fill(255, 255, 0);
        }
        else {
            fill(255);
        }
        text('Заново', 260, 450);
        if (menuSelect) {
            fill(255);
        }
        else {
            fill(255, 255, 0);
        }
        text('Выход', 265, 480);
        textSize(16);
        fill(255);
        text('W / S /', 210, 500);
        triangle(260, 500, 270, 500, 265, 490);
        text('/', 275, 500);
        triangle(285, 490, 295, 490, 290, 500);
        text(' - ВЫБОР.', 300, 500);
        text('Enter - OK.', 260, 520);
    }
}

function keyPressed() {
    if (keyCode == 32) {
        if (speedControl == 0 && screen == 1) {
            speedControl = 5;
        }
    }
    if (keyCode == 96) {
        if (speedControl == 0 && screen == 1) {
            speedControl = 5;
        }
    }
    if (keyCode == 27) {
        if (screen == 1) {
            screen = 2;
        }
        else if (screen == 2) {
            screen = 1;
        }
        if (screen > 0) {
            sounds.win.stop();
            sounds.escape.play();
        }
        menuSelect = true;
    }
    else if (keyCode == 38 || keyCode == 40 || keyCode == 87 || keyCode == 83) {
        if (screen != 1) {
            if (menuSelect) {
                menuSelect = false;
            }
            else {
                menuSelect = true;
            }
            if (screen != -1) {
                sounds.select.stop();
                sounds.escape.stop();
                sounds.win.stop();
                sounds.select.play();
            }
        }
    }
    if (keyCode == 13) {
        if (screen != 1) {
            sounds.select.stop();
            sounds.escape.stop();
            sounds.win.stop();
            sounds.enter.play();
        }
        if (screen == 2 || screen == 3) {
            player[0].x = pl0Standart[0];
            player[0].y = pl0Standart[1];
            player[1].x = pl1Standart[0];
            player[1].y = pl1Standart[1];
            dir[0] = '';
            dir[1] = '';
            bullets[0] = [];
            bullets[1] = [];
            health[0] = 5;
            health[1] = 5;
            speed = 1;
            speedControl = 0;
            if (menuSelect) {
                screen = 1;
                choose = Math.floor(Math.random() * (3));
                if (choose == 0) {
                    walls = walls0;
                }
                else if (choose == 1) {
                    walls = walls1;
                }
                else if (choose == 2) {
                    walls = walls2;
                }
            }
            else {
                screen = 0;
                localDelta = 0;
            }
        }
        else if (screen == 0) {
            if (menuSelect) {
                screen = 1;
                choose = Math.floor(Math.random() * (3));
                if (choose == 0) {
                    walls = walls0;
                }
                else if (choose == 1) {
                    walls = walls1;
                }
                else if (choose == 2) {
                    walls = walls2;
                }
            }
            else {
                screen = -1;
            }
        }
        else if (screen == -1) {
            screen = 0;
            localDelta = 0;
        }
        menuSelect = true;
    }
    return false;
}

var canvas = document.querySelector('canvas');
var body = document.getElementById('body');

// var ile = 20;


var height = body.clientHeight - 20;
var width = body.clientWidth - 20;
canvas.height = height;
canvas.width = width;
var c = canvas.getContext('2d');
var ile = Math.floor(height / 10);
var mouseDistance = 100;
var CircleCount = 200;




function ColorRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var mouse = {
    x: undefined,
    y: undefined
}


window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})



function Circle(n, r, x, y, xd, yd, color, mass) {
    this.mass = mass;
    this.n = n;
    this.r = r;
    this.rNormal = r;
    this.x = x;
    this.y = y;
    this.velocity = {
        x: xd,
        y: yd
    }
    this.xd = xd;
    this.yd = yd;
    this.color = color;
    this.newColor = color;

    this.drew = function () {

        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill();
        c.strokeStyle = this.newColor;
        c.lineWidth = 2;
        c.stroke();
    }


    this.bounce = function () {
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

        for (var c = 0; c < circles.length; c++) {
            if (circles[c] == this) continue;

            else if (getDistance(this.x, this.y, circles[c].x, circles[c].y) <= this.r + circles[c].r) {
                resolveCollision(this, circles[c])
            }
        }


        if (this.x + this.r >= canvas.width || this.x - this.r <= 0) {
            this.velocity.x = -this.velocity.x;
        }


        if (this.y + this.r >= canvas.height || this.y - this.r <= 0) {
            this.velocity.y = -this.velocity.y;

        }


        if (mouse.x - this.x < mouseDistance && mouse.x - this.x > -mouseDistance &&
            mouse.y - this.y < mouseDistance && mouse.y - this.y > -mouseDistance) {
            if (this.color == this.newColor) {
                // c.fillStyle = "transparent";
                this.color = "transparent";


            }
        } else {
            this.color = this.newColor;

        }


        this.drew();
    }
}


var circles = [];

// WYŚWIETLENIE WSSZYSTKICH PIŁEK NA RAZ;

for (var i = 0; i < ile; i++) {
    addCircle(i)
}
// var pierwszy = 0;


function addCircle(n) {
    var n = n;
    var red = ColorRand(0, 255);
    var green = ColorRand(0, 255);
    var blue = ColorRand(0, 255);
    var color = 'rgb(' + red + ' , ' + green + ' , ' + blue + ' ) ';

    this.r = (Math.random() * (height / 100)) + 17;
    // this.r = 28;
    var mass = r;

    var x = undefined;
    var y = undefined;
    var xd = (Math.random() - 0.5) * 4;
    var yd = (Math.random() - 0.5) * 4;

    for (var c = 0; c < circles.length; c++) {
        if (getDistance(this.x, this.y, circles[c].x, circles[c].y) <= this.r + circles[c].r || x == undefined) {
            var x = Math.random() * (canvas.width - 2 * r) + r;
            var y = Math.random() * (canvas.height - 2 * r) + r;
        }
    }
    circles.push(new Circle(n, r, x, y, xd, yd, color, mass));
}

function removeCircle(n) {
    for (var z = 0; z < circles.length; z++) {
        if (circles[z].n == n) {
            circles.splice(z, 1)
        }
    }

}


function getDistance(x1, y1, x2, y2) {
    var x = x1 - x2;
    var y = y1 - y2;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}



function move() {
    c.strokeStyle = 'transparent';
    requestAnimationFrame(move);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) {
        circles[i].bounce();
        // circles[i].drew();  
        c.fill();
        c.stroke();
    }




    c.font = "30px Arial";
    c.fillText(circles.length, 10, 50);

}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = {
            x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
            y: u1.y
        };
        const v2 = {
            x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
            y: u2.y
        };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}


move();
var canvas = document.querySelector('canvas');
var body = document.getElementById('body');
var height = body.clientHeight;
var width = body.clientWidth;
console.log(height);
canvas.height = height;
canvas.width = width;


var c = canvas.getContext('2d');
var mouseDistance = 100;
var CircleCount = 200;
var speed = 2;

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
    console.log(mouse);
})



function Circle(r, x, y, xd, yd, color) {
    this.r = r;
    this.rNormal = r;
    this.x = x;
    this.y = y;
    this.xd = xd;
    this.yd = yd;
    this.color = color;
    this.newColor = color;

    this.drew = function () {

        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill();
        c.lineWidth = 0;
        c.stroke();
    }


    this.bounce = function () {
        this.x = this.x + this.xd;
        this.y = this.y + this.yd;



        if (this.x + this.r >= canvas.width || this.x - this.r <= 0) {
            this.xd = -this.xd;
        }


        if (this.y + this.r >= canvas.height || this.y - this.r <= 0) {
            this.yd = -this.yd;

        }
        if (mouse.x - this.x < mouseDistance && mouse.x - this.x > -mouseDistance &&
            mouse.y - this.y < mouseDistance && mouse.y - this.y > -mouseDistance) {
            c.lineWidth = 5;
            c.strokeStyle = '#BADA55';
            this.color = 'transparent';
            if (this.r < 50) {
                this.r = this.r + 2;

            }
        } else {
            this.color = this.newColor;
            if (this.r > this.rNormal)
                this.r = this.r - 2;
        }

        this.drew();
    }
}


var circles = [];

for (i = 0; i < CircleCount; i++) {

    var red = ColorRand(0, 255);
    var green = ColorRand(0, 255);
    var blue = ColorRand(0, 255);
    var color = 'rgb(' + red + ' , ' + green + ' , ' + blue + ' ) ';

    var r = (Math.random() * 30) + 3;
    var x = Math.random() * (canvas.width - 2 * r) + r;
    var y = Math.random() * (canvas.height - 2 * r) + r;
    var xd = (Math.random() - 0.5 * speed);
    var yd = (Math.random() - 0.5 * speed);
    circles.push(new Circle(r, x, y, xd, yd, color));
}

console.log(circles);


function move() {


    canvas.height = height;
    canvas.width = width;
    requestAnimationFrame(move);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) {
        circles[i].bounce();
        c.strokeStyle = 'transparent';
    }


}

move();
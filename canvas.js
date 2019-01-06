var canvas = document.querySelector('canvas');
console.log(canvas);
canvas.height = 500;
canvas.width = 700;


var c = canvas.getContext('2d');

function ColorRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function Circle(r, x, y, xd, yd, color) {
    this.r = r;
    this.x = x;
    this.y = y;
    this.xd = xd;
    this.yd = yd;

    this.drew = function () {


        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
        c.fillStyle = color;
        c.fill();
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
        this.drew();
    }
}


var circles = [];

for (i = 0; i < 100; i++) {

    var red = ColorRand(0, 255);
    var green = ColorRand(0, 255);
    var blue = ColorRand(0, 255);
    var color = 'rgb(' + red + ' , ' + green + ' , ' + blue + ' ) ';

    var r = (Math.random() * 30) + 3;
    var x = Math.random() * (canvas.width - 2 * r) + r;
    var y = Math.random() * (canvas.height - 2 * r) + r;
    var xd = (Math.random() - 0.5) * 5;
    var yd = (Math.random() - 0.5) * 5;
    circles.push(new Circle(r, x, y, xd, yd, color));
}

console.log(circles);

function move() {
    requestAnimationFrame(move);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) {
        circles[i].bounce();
    }



}
move();
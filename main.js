function Rect() {
  this._x = Math.floor(0 + Math.random() * (canvas.width - 20 + 0));
  this._y = 0;
  this._a = 20;
  this._b = 20;
  this._speed = 1 + Math.random() * (4 - 1);
  this._color = '#' + Math.random().toString(16).substr(-6);
}

Rect.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.rect(this._x, this._y, this._a, this._b);
  ctx.strokeStyle = this._color;
  ctx.stroke();
  ctx.fillStyle = this._color;
  ctx.fill();
}

function Canvas(id){
  let canvas = document.querySelector(id)
  this.ctx = canvas.getContext("2d");
}

Canvas.prototype.add = function() {
  [].forEach.call(arguments, function(el) {
    el.draw(ctx);
  });
}
let drawArea = new Canvas('#canvas');



function animate() {
  const canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext("2d");
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);


  arr.map((item) => {
    drawArea.add(item);
    item._y += item._speed;
  })

  requestAnimationFrame(animate);
}

const canvas = document.getElementById('canvas');
canvas.addEventListener('click', function() {
  let x = event.pageX - canvas.offsetLeft,
      y = event.pageY - canvas.offsetTop;
  let score = document.getElementById('score');
  let val = Number(score.textContent);
  // arr.map(function(element) {
  //   if (y > element._y && y < element._y + element._a
  //       && x > element._x && x < element._x + element._b) {
  //     arr.pop(element);
  //     val = val + 1
  //     score.innerHTML = `${val}`
  //   }
  // });

  arr.map((element) => {
    if (y > element._y && y < element._y + element._a
        && x > element._x && x < element._x + element._b) {
      arr.pop(element);
      val = val + 1
      score.innerHTML = `${val}`
    }
  });
}, false);



let arr = [];
let intervalId = null;
document.getElementById('start').addEventListener('click', event => {
  score.innerHTML = `0`
  let rect = new Rect()
  arr.push(rect);

  intervalId = setInterval(function () {
    let rect = new Rect()
    arr.push(rect);
  }, 2000);
});

document.getElementById('stop').addEventListener('click', event => {
  const canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext("2d");
  clearInterval(intervalId);
  arr = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.body.onload = animate;
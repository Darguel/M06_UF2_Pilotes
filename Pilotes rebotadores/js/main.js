// Preparació del canvas ----------------------
/* Obté una referència a <canvas>, després crida al mètode getContext()
  per definir un context al el que es pot començar a dibuisar
  (ctx) és un objecte que representa l'àrea de dibuix del 
  <canvas> y permet dibuixar elements 2D al damunt.

  width and height són dreceres a l'ample i alt del canvas  que coincideixen
  amb l'alt i ample del navegador (viewport)
*/
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// funció per generar un número aleatori entre dues xifres

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// funció per generar un color aleatori

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Pilota {
  constructor(x, y, velX, velY, color, mida) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.mida = mida;
  }

  dibuixa(ctx) {
    ctx.beginPath(); 
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.mida, 0, 2 * Math.PI);
    ctx.fill();
  }

  mou() {
    if ((this.x + this.mida) >= width || (this.x - this.mida) <= 0) {
      this.velX = -this.velX;
    }

    if ((this.y + this.mida) >= height || (this.y - this.mida) <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  colisiona(otraPilota) {
    const dx = this.x - otraPilota.x;
    const dy = this.y - otraPilota.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.mida + otraPilota.mida) {
      this.velX = -this.velX;
      this.velY = -this.velY;
      otraPilota.velX = -otraPilota.velX;
      otraPilota.velY = -otraPilota.velY;
    }
  }
}

let pilotes = [];

for (let i = 0; i < 20; i++) {
  const mida = random(10, 20);
  const x = random(mida, width - mida);
  const y = random(mida, height - mida);
  const velX = random(-7, 7);
  const velY = random(-7, 7);
  const color = randomRGB();

  pilotes.push(new Pilota(x, y, velX, velY, color, mida));
}

function loop() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  for (const pilota of pilotes) {
    pilota.dibuixa(ctx);
    pilota.mou();
    for (const altraPilota of pilotes) {
      if (pilota !== altraPilota) {
        pilota.colisiona(altraPilota);
      }
    }
  }

  requestAnimationFrame(loop);
}

loop();

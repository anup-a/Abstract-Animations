function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#00bdff', '#4d39ce', '#088eff', '#efb1ff', '#7f78d2',]


// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * 2 * Math.PI;
    this.distanceFromCenter = randomIntFromRange(50, 150);
    this.velocity = 0.05
    this.lastMouse = { x: x, y: y }
  }


  update() {
    let lastPoint = { x: this.x, y: this.y }
    this.radians += this.velocity;

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    this.x = this.lastMouse.x + (Math.cos(this.radians)) * this.distanceFromCenter;
    this.y = this.lastMouse.y + (Math.sin(this.radians) * this.distanceFromCenter);
    this.draw(lastPoint)
  }

  draw(lastPoint) {
    c.beginPath()
    c.strokeStyle = this.color
    c.lineWidth = this.radius
    c.moveTo(lastPoint.x, lastPoint.y)
    c.lineTo(this.x, this.y)
    c.stroke()
    c.closePath()
  }

}

class Circle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  update() {
    this.draw()
  }

  draw() {
    c.beginPath();
    c.fillStyle = 'rgb(0,0,255, 0.05)'
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fill();
    c.stroke();
  }
}

// Implementation
let particles
function init() {
  particles = []

  circle = new Circle(canvas.width / 2, canvas.height / 2, 60, '#0000ff')

  for (let i = 0; i < 50; i++) {
    // objects.push()
    let radius = (Math.random() * 2) + 1;
    particles.push(
      new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors))
    )
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(255,255,255,0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height);

  // circle.update()

  particles.forEach(particle => {
    particle.update()
  })

}

init()
animate()

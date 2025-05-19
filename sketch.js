let particles = [];
let functions = [];

function setup() {
  createCanvas(879, 138);
  noStroke();

  functions = [
    x => 40 * sin(x / 20),  // sine
    x => 40 * cos(x / 20),  // cosine
    x => 20 * tan(x / 50)   // tangent (smaller amplitude, beware of spikes)
  ];

  for (let i = 0; i < 30; i++) {
    particles.push(new FunctionParticle(i));
  }
}

function draw() {
  fill(255, 40); // fade trails
  rect(0, 0, width, height);

  for (let p of particles) {
    p.update();
    p.repulseFromMouse();
    p.show();
  }

  fadeEdges();
}

class FunctionParticle {
  constructor(index) {
    this.index = index % functions.length;
    this.fn = functions[this.index];
    this.x = random(width);
    this.offset = random(-100, 100);
    this.speed = random(0.2, 0.7); // slower speed
    this.r = random(1, 2);
    this.lifespan = 255;

    // Randomly assign one of the two colors
    this.color = random([color('#7491FF'), color('#375CE3')]);

    this.noiseOffset = random(1000); // for consistent per-particle noise
  }

  update() {
    this.x += this.speed;
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    this.y = height / 2 + this.fn(this.x + this.offset);
  }

  repulseFromMouse() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < 150) {
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      this.x += cos(angle) * 5;
      this.y += sin(angle) * 5;
    }
  }

  show() {
    if (this.y < -5 || this.y > height + 5) return;

    // Add subtle noise to y-position when drawing (not affecting logic)
    let yNoise = this.y + map(noise(this.noiseOffset + frameCount * 0.01), 0, 1, -2, 2);

    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], 200);
    ellipse(this.x, yNoise, this.r * 2);
  }
}


function fadeEdges() {
  let edgeSize = 20;
  for (let i = 0; i < edgeSize; i++) {
    let alpha = map(i, 0, edgeSize, 0, 255);
    fill(255, alpha);
    rect(0, i, width, 1); // top
    rect(0, height - i, width, 1); // bottom
    rect(i, 0, 1, height); // left
    rect(width - i, 0, 1, height); // right
  }
}

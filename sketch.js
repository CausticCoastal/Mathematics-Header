let particles = [];
let functions = [];
let overlayImg; // ⬅️ added

function preload() {
  overlayImg = loadImage('overlay.png');
}

function setup() {
  const wrapper = document.getElementById('sketch-wrapper');
  let w = wrapper.clientWidth;
  let h = wrapper.clientHeight;

  let canvas = createCanvas(w, h);
  canvas.parent('sketch-wrapper');
  noStroke();

  functions = [
    x => 0.25 * h * sin(x / 20),
    x => 0.25 * h * cos(x / 20),
    x => 0.2 * h * tan(x / 50)
  ];

  for (let i = 0; i < 30; i++) {
    particles.push(new FunctionParticle(i));
  }
}

function windowResized() {
  const wrapper = document.getElementById('sketch-wrapper');
  let w = wrapper.clientWidth;
  let h = wrapper.clientHeight;
  resizeCanvas(w, h);
}

function draw() {
  fill(255, 40);
  rect(0, 0, width, height);

  for (let p of particles) {
    p.update();
    p.repulseFromMouse();
    p.show();
  }

  fadeEdges();

  // ⬇️ Draw overlay last so it's on top
  if (overlayImg) {
    image(overlayImg, 0, 0, width, height);
  }
}

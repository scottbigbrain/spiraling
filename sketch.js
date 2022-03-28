// - Music provided by Lofi Girl
// - Listen: bit.ly/lofigirI-playlists

// palette is pastel-qt-8x

let center;
let fr = 30;
let back_color;

let radius = 200;

let pretty, beauty;
let pretty_head, beauty_head;
let pretty_color, beauty_color;
let tail_len = 1.5; // number of times the tail wraps around the circle
let bar = 1.618033988749;
let order = true;

let songs = [];
let titles = [];
let current_track = 0;
let amp;
let fft;
let fequency_color;
function preload () {
  songs.push(loadSound("Winter_Love/1. Winter Love - Dr. Dundiff (Master).mp3"));
  titles.push("Winter Love - Dr. Dundiff");
  songs.push(loadSound("Winter_Love/2. Snowday - Dr. Dundiff (Master).mp3"));
  titles.push("Snowday - Dr. Dundiff");
  songs.push(loadSound("Winter_Love/3. Through the Woods - Dr. Dundiff ft. Ian Ewing (Master).mp3"));
  titles.push("Through the Woods - Dr. Dundiff ft. Ian Ewing");
  songs.push(loadSound("Winter_Love/4. Whistling Winds - Dr. Dundiff (Master).mp3"));
  titles.push("Whistling Winds - Dr. Dundiff");
  songs.push(loadSound("Winter_Love/5. From My Window - Dr. Dundiff ft. Cocabona (Master).mp3"));
  titles.push("From My Window - Dr. Dundiff ft. Cocabona");
  songs.push(loadSound("Winter_Love/6. Orange Leaves - Dr. Dundiff (Master).mp3"));
  titles.push("Orange Leaves - Dr. Dundiff");
}


function setup() {
  createCanvas(1600, 900);
  frameRate(fr);
  center = createVector(width/2, height/2);
  back_color = color(101, 80, 87);
  background(back_color);

  let point1 = center.copy().add(v1());
  pretty_color = color(203, 129, 117);
  pretty = new Trail(point1, tail_len*60, 4.5, pretty_color);
  pretty_head = new Trail(point1, 6, 8, pretty_color);

  let point2 = center.copy().add(v2());
  beauty_color = color(109, 141, 138);
  beauty = new Trail(point2, tail_len*60, 4.5, beauty_color);
  beauty_head = new Trail(point2, 6, 8, beauty_color);

  songs[0].play();
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.9, 32);
  frequency_color = [246, 237, 205];
  f_color = color(frequency_color[0], frequency_color[1], frequency_color[2]);
}

function draw() {
  background(back_color);

  if (!songs[current_track].isPlaying()) {
    if (current_track < songs.length-1) {
      current_track++;
      songs[current_track].play();
    } else {
      noLoop();
    }
  }

  if (frameCount % fr*8 == 0) order = !order;

  let spectrum = fft.analyze();
  let step = 4*radius / spectrum.length;
  for (let i = 0; i < spectrum.length; i++) {
    let val = spectrum[i];
    let a = map(val, 0, 255, 0, 80);
    noFill();
    stroke(frequency_color[0], frequency_color[1], frequency_color[2], a);
    strokeWeight(step*0.5*0.8);
    circle(width/2, height/2, i*step);
  }

  if (frameCount % 1 == 0) {
    let point1 = center.copy().add(v1());
    pretty.update(point1);
    pretty_head.update(point1);

    let point2 = center.copy().add(v2());
    beauty.update(point2);
    beauty_head.update(point2);

    // bar += 0.02*noise(t()) - 0.01;
    // bar += sin(frameCount/10);
    // bar = cos(0.1*t());
  }

  let a = map(sqrt(amp.getLevel()), 0, 1, 3.5, 18);
  // back_color.setRed(a);
  pretty.size = a;
  beauty.size = a;

  if (order) {
    pretty.draw();
    beauty.draw();
  } else if (!order) {
    beauty.draw();
    pretty.draw();
  }

  textStyle(NORMAL);
  textFont("monospace");
  textAlign(LEFT, TOP);
  textSize(20);
  fill(f_color);
  noStroke();
  text("Now playing:  " + titles[current_track], 30, 30);
}

function v1() {
  return createVector(cos(t()), sin(t())).setMag(radius + radius*point_height());
}

function v2() {
  return createVector(-cos(t()), sin(t()+PI)).setMag(radius + radius*point_height());
}

function point_height() {
  // return sin(bar*t()/3) * cos(bar*t()/2);
  // return sin(bar*t()/5) * cos(bar*t()/7);
  return sin(t()/5) * cos(t()/7);
  // return sin(bar*t()/7) * cos(bar*t()/5);
  // return sin(bar*t()/13) * cos(bar*t()/2);
  // return cos(bar*t())*sin(t()/2);
}

let t = function() { return PI*frameCount/fr };

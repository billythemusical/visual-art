// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Basic Pitch Detection
=== */

let audioContext;
let mic;
let pitch;
let song;
let frequency;

function preload() {
  song = loadSound('assets/satie.mp3');
}

function setup() {
  song.play();
  let cnv = createCanvas(600,600);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
}

function draw () {
  background(0);
  getPitch();
}

function startPitch() {
  pitch = ml5.pitchDetection('./model/', audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      select('#result').html(frequency);
      strokeWeight(2);
      stroke(255);
      // beginShape();
        // for (let i = 0; i < width; i++) {
        let x = map(frequency, 70, 500, 0, width*1.5);
        let y = map(Math.log(frequency, x), 0, 20, height, 0);
        // ellipse(x, y, 20, 20);
        line(0, 0, x, y);
        // }
      // endShape();
      // print(map(Math.log(x, height), 0, 100, 0, height/2));
    } else {
      select('#result').html('No pitch detected');
    }

    // if (frequency) {
    //   fill(255);
    //   let x = map(frequency, 70, 500, 0, width);
    //   let y = map(Math.log(frequency, x), 0, 20, height, 0);
    //   ellipse(x, y, 10, 10);
    //   print(map(Math.log(x, height), 0, 100, 0, height/2));
    //   }
    getPitch();
  })
}

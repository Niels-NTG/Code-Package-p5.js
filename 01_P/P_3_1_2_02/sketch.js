// P_3_1_2_02.pde
//
// Generative Gestaltung, ISBN: 978-3-87439-759-9
// First Edition, Hermann Schmidt, Mainz, 2009
// Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * typewriter. uses input (text) as blueprint for a visual composition.
 *
 * MOUSE
 * click + drag        : move canvas
 *
 * KEYS
 * a-z                 : text input (keyboard)
 * space               : random straight / small curve
 * ,.!?                : curves
 * :+-xz               : icons
 * o                   : station with the last 7 typed letters as name
 * a u                 : stop
 * del, backspace      : remove last letter
 * arrow up            : zoom canvas +
 * arrow down          : zoom canvas -
 * alt                 : new random layout
 * ctrl                : save png
 */
'use strict';

var font;
var textTyped = "Was hier folgt ist Text! So asnt, und mag. Ich mag Text sehr.";

var shapeSpace;
var shapeSpace2;
var shapePeriod;
var shapeComma;
var shapeQuestionmark;
var shapeExclamationmark;
var shapeReturn;
var icon1;
var icon2;
var icon3;
var icon4;
var icon5;

var centerX = 0;
var centerY = 0;
var offsetX = 0;
var offsetY = 0;
var zoom = 0.75;

var palette;
var actColorIndex = 0;

var actRandomSeed = 6;

function preload() {
  font = loadFont("data/miso-bold.ttf");
  shapeSpace = loadImage("data/space.svg");
  shapeSpace2 = loadImage("data/space2.svg");
  shapePeriod = loadImage("data/period.svg");
  shapeComma = loadImage("data/comma.svg");
  shapeExclamationmark = loadImage("data/exclamationmark.svg");
  shapeQuestionmark = loadImage("data/questionmark.svg");
  shapeReturn = loadImage("data/return.svg");
  icon1 = loadImage("data/icon1.svg");
  icon2 = loadImage("data/icon2.svg");
  icon3 = loadImage("data/icon3.svg");
  icon4 = loadImage("data/icon4.svg");
  icon5 = loadImage("data/icon5.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textFont(font, 25);
  cursor(HAND);
  noStroke();

  centerX = width / 2;
  centerY = height / 2;

  // shapeSpace.filter(INVERT);
  // shapeSpace2.filter(INVERT);

  palette = [
    color(253, 195, 0),
    color(0),
    color(0, 158, 224),
    color(99, 33, 129),
    color(121, 156, 19),
    color(226, 0, 26),
    color(224, 134, 178)
  ];
}

function windowResized() {
  // resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(255);

  if (mouseIsPressed) {
    centerX = mouseX - offsetX;
    centerY = mouseY - offsetY;
  }

  translate(centerX, centerY);
  scale(zoom);

  push();

  // allways produce the same sequence of random numbers
  randomSeed(actRandomSeed);

  actColorIndex = 0;
  fill(palette[actColorIndex]);
  rect(0, -25, 10, 35);

  for (var i = 0; i < textTyped.length; i++) {
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter);

    // ------ letter rule table ------
    switch (letter) {
      case " ": // space
        // 60% no turn, 20% left, 20% right
        tint(palette[actColorIndex]);
        var dir = floor(random(5));
        if (dir == 0) {
          image(shapeSpace, 0, -15);
          translate(1.9, 0);
          rotate(QUARTER_PI);
        }
        if (dir == 1) {
          image(shapeSpace2, 0, -17);
          translate(13, -5);
          rotate(-QUARTER_PI);
        }
        noTint();
      break;
      case ",": // comma
        tint(palette[actColorIndex]);
        image(shapeComma, 0, -15);
        translate(33, 15);
        rotate(QUARTER_PI);
        noTint();
      break;
      case ".": // period
        tint(palette[actColorIndex]);
        image(shapePeriod, 0, -58);
        translate(58, -58);
        rotate(-HALF_PI);
        noTint();
      break;
      case "!": // !
        tint(palette[actColorIndex]);
        image(shapeExclamationmark, 0, -29);
        translate(42, -18);
        rotate(-QUARTER_PI);
        noTint();
      break;
      case "?": // ?
        tint(palette[actColorIndex]);
        image(shapeQuestionmark, 0, -29);
        translate(42, -18);
        rotate(-QUARTER_PI);
        noTint();
      break;
      case "\n": // return
        rect(0, -25, 10, 35);
        pop();
        push();
        translate(random(-300, 300), random(-300, 300));
        rotate(floor(random(8)) * QUARTER_PI);
        // choose nest color from the palette
        actColorIndex = (actColorIndex + 1) % palette.length;
        fill(palette[actColorIndex]);
        rect(0, -25, 10, 35);
      break;
      case "o": // Station big
        rect(0, 0 - 15, letterWidth + 1, 15);
        fill(0);
        text(textTyped.substring(i - 10, i - 1).toLowerCase().replace(" ", "").substring(0,1).toUpperCase(), -10, 40);
        ellipse(-5, -7, 33, 33);
        fill(255);
        ellipse(-5, -7, 25, 25);
        translate(letterWidth, 0);
      break;
      case "a": // Station small left
        rect(0, 0 - 15, letterWidth + 1, 25);
        rect(0, 0 - 15, letterWidth + 1, 15);
        translate(letterWidth, 0);
      break;
      case "u": // Station small right
        rect(0, 0 - 25, letterWidth + 1, 25);
        rect(0, 0 - 15, letterWidth + 1, 15);
        translate(letterWidth, 0);
      break;
      case ":": // icon 1
        image(icon1, 0, -60, 30, 30);
      break;
      case "+": // icon 2
        image(icon2, 0, -60, 35, 30);
      break;
      case "-": // icon 3
        image(icon3, 0, -60, 30, 30);
      break;
      case "x": // icon 4
        image(icon4, 0, -60, 30, 30);
      break;
      case "z": // icon 5
        image(icon5, 0, -60, 30, 30);
      break;
      default: // all others
        rect(0, 0 - 15, letterWidth + 1, 15);
        translate(letterWidth, 0);
      break;
    }
  }

  // blink cursor after text
  fill(200, 30, 40);
  if (frameCount / 6 % 2 == 0) rect(0, 0, 15, 2);

  pop();
}

function mousePressed() {
  offsetX = mouseX - centerX;
  offsetY = mouseY - centerY;
}

function keyReleased() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode === ALT) {
    actRandomSeed++;
    console.log(actRandomSeed);
  }
}

function keyPressed() {
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, max(0, textTyped.length - 1));
      return false; // prevent any default behavior
    }
  }
  // insert linebreak
  if (keyCode === ENTER || keyCode === RETURN) textTyped += "\n";

  if (keyCode === UP_ARROW) zoom += 0.05;
  if (keyCode === DOWN_ARROW) zoom -= 0.05;
}

function keyTyped(){
  if(keyCode >= 32){
    textTyped += key;
  }
}

// P_2_1_1_04.pde
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
 * shapes in a grid, that are always facing the mouse
 *
 * MOUSE
 * position x/y        : position to face
 *
 * KEYS
 * 1-7                 : choose shapes
 * arrow up/down       : scale of shapes
 * arrow left/right    : additional rotation of shapes
 * c                   : toggle. color mode
 * d                   : toggle. size depending on distance
 * g                   : toggle. grid resolution
 * s                   : save png
 */
'use strict';

var shapes = [];
var currentShape = 0;

var tileCount = 10;
var tileWidth;
var tileHeight;
var shapeSize = 50;
var newShapeSize = shapeSize;
var shapeAngle = 0;
var maxDist;

var shapeColor;
var fillMode = 0;
var sizeMode = 0;

function preload() {
  shapes[0] = loadImage("data/module_1.svg");
  shapes[1] = loadImage("data/module_2.svg");
  shapes[2] = loadImage("data/module_3.svg");
  shapes[3] = loadImage("data/module_4.svg");
  shapes[4] = loadImage("data/module_5.svg");
  shapes[5] = loadImage("data/module_6.svg");
  shapes[6] = loadImage("data/module_7.svg");
}

function setup() {
  createCanvas(600, 600);

  tileWidth = width / tileCount;
  tileHeight = height / tileCount;
  maxDist = sqrt(sq(width) + sq(height));

  shapeColor = color(0, 130, 164);

  imageMode(CENTER);
}

function draw() {
  background(255);

  for (var gridY = 0; gridY <= tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = tileWidth * gridX + tileWidth / 2;
      var posY = tileHeight * gridY + tileHeight / 2;

      // calculate angle between mouse position and actual position of the shape
      var angle = atan2(mouseY - posY, mouseX - posX) + radians(shapeAngle);

      if (sizeMode == 0) newShapeSize = shapeSize;
      if (sizeMode == 1) newShapeSize = shapeSize * 1.5 - map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);
      if (sizeMode == 2) newShapeSize = map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);

      if (fillMode == 0) noTint();
      if (fillMode == 1) {
        // shapes.disableStyle();
        tint(shapeColor);
      }
      if (fillMode == 2) {
        // shapes.disableStyle();
        var a = map(dist(mouseX, mouseY, posX, posY), 0, maxDist, 255, 0);
        tint(shapeColor, a);
      }
      if (fillMode == 3) {
        // shapes.disableStyle();
        var a = map(dist(mouseX, mouseY, posX, posY), 0, maxDist, 0, 255);
        tint(shapeColor, a);
      }

      push();
      translate(posX, posY);
      rotate(angle);
      image(shapes[currentShape], 0, 0, newShapeSize, newShapeSize);
      pop();
    }
  }

}

function keyPressed(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == 'c' || key == 'C') fillMode = (fillMode+1) % 4;
  if (key == 'd' || key == 'D') sizeMode = (sizeMode+1) % 3;

  if (key == 'g' || key == 'G') {
    tileCount += 5;
    if (tileCount > 20) tileCount = 10;
    tileWidth = width / tileCount;
    tileHeight = height / tileCount;
  }

  if (key == '1') currentShape = 0;
  if (key == '2') currentShape = 1;
  if (key == '3') currentShape = 2;
  if (key == '4') currentShape = 3;
  if (key == '5') currentShape = 4;
  if (key == '6') currentShape = 5;
  if (key == '7') currentShape = 6;

  if (keyCode === UP_ARROW) shapeSize += 5;
  if (keyCode === DOWN_ARROW) shapeSize = max(shapeSize - 5, 5);
  if (keyCode === LEFT_ARROW) shapeAngle -= 5;
  if (keyCode === RIGHT_ARROW) shapeAngle += 5;
}

function colorsEqual(col1, col2) {
  return col1.toString() === col2.toString();
}



// P_1_2_2_01.pde
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
 * extract and sort the color palette of an image
 *
 * MOUSE
 * position x          : resolution
 *
 * KEYS
 * 1-3                 : load different images
 * 4                   : no color sorting
 * 5                   : sort colors on hue
 * 6                   : sort colors on saturation
 * 7                   : sort colors on brightness
 * 8                   : sort colors on grayscale (luminance)
 * s                   : save png
 * c                   : save color palette
 */
'use strict';

var img;
var colors = [];
var sortMode = null;

function preload() {
  img = loadImage('data/pic1.jpg');
}

function setup() {
  createCanvas(windowWidth, windowWidth);
  // colorMode(RGB);
  noStroke();
  noCursor();
}

function draw() {

  cont
  var tileCount = width / constrain(mouseX, 5, width);
  var rectSize = width / tileCount;

  // Get colors from image
  // var i = 0;
  colors = [];
  img.loadPixels();
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      colors.push(color(img.get(floor(gridX * rectSize), floor(gridY * rectSize))));
      // i++;
    }
  }

  // Sort colors
  if (sortMode !== null) {
    // colors = gb.sortColors(…);
  }

  // Draw grid
  var i = 0;
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      fill(colors[i]);
      rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
      i++;
    }
  }


}

function keyPressed() {
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode( colors )], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') interpolateShortest = true;
  if (key == '2') interpolateShortest = false;
}

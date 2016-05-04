// M_3_1_01.pde
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
 * draws a flat grid
 *
 * MOUSE
 * click + drag        : rotate
 */
'use strict';

var sketch = function( p ) {

  // number of grid points horizontal
  var xCount = 4;
  // number of grid points vertical
  var yCount = 4;

  // varialbes for rotation
  var offsetX = 0;
  var offsetY = 0;
  var clickX = 0;
  var clickY = 0;
  var rotationX = 0;
  var rotationY = 0;
  var targetRotationX = 0;
  var targetRotationY = 0;
  var clickRotationX;
  var clickRotationY;

  p.setup = function() {
    p.createCanvas(400, 400, p.WEBGL);
    p.fill(255);
    p.strokeWeight(0.0125);
  };

  p.draw = function() {
    p.background(255);

    setView();

    p.scale(40);

    // Draw Mesh
    for (var y = 0; y < yCount; y++) {
      p.beginShape(p.QUAD_STRIP);
      for (var x = 0; x <= xCount; x++) {
        p.vertex(x, y, 0);
        p.vertex(x, y + 1, 0);
      }
      p.endShape();
    }
  };

  p.mousePressed = function() {
    clickX = p.mouseX;
    clickY = p.mouseY;
    clickRotationX = rotationX;
    clickRotationY = rotationY;
  };

  function setView() {
    p.translate(p.width / 2, p.height / 2);
    if (p.mouseIsPressed) {
      offsetX = p.mouseX - clickX;
      offsetY = p.mouseY - clickY;
      targetRotationX = clickRotationX + offsetX / p.width * p.TAU;
      targetRotationY = p.min(p.max(clickRotationY + offsetY / p.height * p.TAU, -p.HALF_PI), p.HALF_PI);
      rotationX += (targetRotationX - rotationX) / 4;
      rotationY += (targetRotationY - rotationY) / 4;
    }
    p.rotateX(-rotationY);
    p.rotateY(rotationX);
  }

};

var myp5 = new p5(sketch);

// M_3_2_05.pde
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
 * optimized code for calculating and drawing a mesh.
 *
 * MOUSE
 * click + drag        : rotate
 */
'use strict';

var sketch = function( p ) {

  // grid definition horizontal
  var uCount = 30;
  var uMin = 0;
  var uMax = 5;

  // grid definition vertical
  var vCount = 30;
  var vMin = -1;
  var vMax = 1;

  // array for the grid points
  var points = [];

  // view rotation
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
    p.createCanvas(800,800,p.WEBGL);

    // fill array
    for (var iv = 0; iv <= vCount; iv++) {
      points[iv] = []; // make points a 2D array
      for (var iu = 0; iu <= uCount; iu++) {
        var u = p.map(iu, 0, uCount, uMin, uMax);
        var v = p.map(iv, 0, vCount, vMin, vMax);
        points[iv][iu] = p.createVector(v, p.sin(u) * p.cos(v), p.cos(u) * p.cos(v));
      }
    }
  };

  p.draw = function() {
    // p.background(255);
    p.basicMaterial(255,0,0);

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

    p.scale(2);

    p.torus();

    // draw mesh
    for (var iv = 0; iv < vCount; iv++) {
      p.beginShape(p.QUAD_STRIP);
      for (var iu = 0; iu <= uCount; iu++) {
        p.vertex(points[iv][iu].x, points[iv][iu].y, points[iv][iu].z);
        p.vertex(points[iv+1][iu].x, points[iv+1][iu].y, points[iv+1][iu].z);
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

};

var myp5 = new p5(sketch);
// P_3_1_4_01
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

// CREDITS
// Code is based on a treemap example from Visualizing Data, First Edition, Copyright 2008 Ben Fry.
// Example input text: Faust by Johann Wolfgang von Goethe

/**
 * treemap. wordcounts of a textfile.
 *
 * KEYS
 * 1-5                  : set treemap layout algorithm
 * s                    : save png
 */
'use strict';

var joinedText;

var treeMap;

var minFontSize = 1;
var maxFontSize = 1000;

function preload() {
  joinedText = loadStrings("data/Faust.txt");
}

function setup() {
  createCanvas(800, 600);

  var wordData = [];

  joinedText = joinedText.join(" ");

  // Split joinedText by punctuation and spaces and filter out any empty entries
  var words = joinedText.split(/[-–().,;:?!\s]/).filter(Boolean);

  // Create WordItem object of each word and add them to the wordData array
  for (var i = 0; i < words.length; i++) {
    wordData.push(new WordItem(words[i]));
  }

  console.log(wordData);

  treeMap = new TreeMap(wordData, 0, 0, width, height);

}

function draw() {

  // treemap.setLayout(layoutAlgorithm);

}

function keyReleased() {
  if (key === 's') saveCanvas(gd.timestamp(), 'png');
}

function WordItem(word) {
  this.word = word.toLowerCase();
  this.count = 0;
  this.margin = 3;
  this.x = 0;
  this.y = 0;
  this.w = 0;
  this.h = 0;

  WordItem.prototype.drawWordItem = function() {
    // strokeWeight(0.25);
    fill(255);
    rect(x, y, w, h);

    for (var i = minFontSize; i < maxFontSize; i++) {
      textSize(i);
      if (
        w < textWidth(this.word) + this.margin ||
        h < i + margin * 2
      ) {
        textSize(i);
        break;
      }
    }

    fill(0);
    textAlign(CENTER, CENTER);
    text(this.word, this.x + this.w / 2, this.y + this.h / 2);

  }

}

function TreeMap(words, x, y, w, h) {
  this.words = words;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  TreeMap.prototype.setLayout = function(algorithm) {
     switch (algorithm) {
      case 'SquarifiedLayout':
        this.SquarifiedLayout();
        break;
     }
  }

  TreeMap.prototype.drawTreeMap = function() {
    for (var i = 0; i < this.words.length; i++) {
      this.words[i].drawWordItem();
    }
  }

  TreeMap.prototype.SquarifiedLayout = function() {
    var start = 0;
    var end = this.words.length;

    if (start > end) {
      return;
    }

    if (end - start < 2) {
      // SliceLayout.layoutBest(items,start,end,bounds);
      return;
    }

  }

}

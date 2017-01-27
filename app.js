'use strict';
let dump = require('var-dump')({'silence': false});

let a = [
          {i: 0, j: 0},
          {i: 0, j: 1},
          {i: 0, j: 2},
          {i: 1, j: 0},
          {i: 1, j: 1},
          {i: 1, j: 2},
          {i: 2, j: 0},
          {i: 2, j: 1},
          {i: 2, j: 2}
];

let b = [
          {i: 0, j: 0},
          {i: 0, j: 1},
          {i: 1, j: 0},
          {i: 1, j: 1},
];


function filterRow(point) {
  return function filterAgainst(against) {
    if (point.i == against.i || point.j == against.j) {
      return false;
    }
    return true;
  }
}

function recursiveTree(arr) {
  return arr.map( function (el, ix, ar) {

    let ff = filterRow(el);
    let c = ar.filter(ff);
    if (c.length > 1) {
      return [ el, recursiveTree(c) ];
    }
    return [el, c];
  });
}


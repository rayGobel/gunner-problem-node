'use strict';
let dump = require('var-dump')({'silence': false});

/**
 * We need list of empty rooms to implement.
 *
 * Also need wall position in 2D matrix. But,
 * I didn't have time yet to implement wall
 * coordinate.
 */
let empty_room_a = [
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

let empty_room_b = [
          {i: 0, j: 0},
          {i: 0, j: 1},
          {i: 1, j: 0},
          {i: 1, j: 1},
];


/**
 * We will check whether on a row (or column)
 * in within line-of-sight. We can add a case
 * if there is a wall within line-of-sight
 *
 * The strategy is to ignore further row/column when we
 * meet a wall.
 */
function filterRow(point) {
  return function filterAgainst(against) {
    if (point.i == against.i || point.j == against.j) {
      return false;
    }
    return true;
  }
}

/**
 * This will create list of possible value of
 * gunner position.
 */
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

/**
 * Then, we should traverse through recursive tree,
 * while maintaining its parent to list all possible
 * gunner position.
 */
let gunner_position = recursiveTree(empty_room_a);
dump(gunner_position);

/** 
 * The deepest tree will contain the most possible
 * gunner in an arena.
 *
 * I did implement a naiive implementation in rust
 * and come into 13 gunner. But, more thorough (correct)
 * implementation is to use recursiveTree and
 * tree traversal to list all possible value to place a
 * gunner.
 */

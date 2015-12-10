/**
 * @copyright Copyright (c) 2015, Project Agama,  All Rights Reserved.
 * @licence [Apache-2.0]{http://www.apache.org/licenses/LICENSE-2.0}
 * @author Baris Yuksel <baris@projectagama.com>
 *
 * @file Patterns module. Each pattern defines a tessellation.
 */
function patternOne(paper, sqTile) {
  paper.elementOpacity = 0.0;
  var c0 = paper.squareTemplate(sqTile);

  var e0 = paper.extendedconline(sqTile, c0.getIntersectPoint(1), c0.getIntersectPoint(7));
  var e1 = paper.extendedconline(sqTile, c0.getIntersectPoint(2), c0.getIntersectPoint(7));
  var e2 = paper.extendedconline(sqTile, c0.getIntersectPoint(5), c0.getIntersectPoint(0));
  var e3 = paper.extendedconline(sqTile, c0.getIntersectPoint(6), c0.getIntersectPoint(0));
  var e4 = paper.extendedconline(sqTile, c0.getIntersectPoint(3), c0.getIntersectPoint(2));
  var e5 = paper.extendedconline(sqTile, c0.getIntersectPoint(3), c0.getIntersectPoint(6));
  var e6 = paper.extendedconline(sqTile, c0.getIntersectPoint(4), c0.getIntersectPoint(1));
  var e7 = paper.extendedconline(sqTile, c0.getIntersectPoint(4), c0.getIntersectPoint(5));
  // Now do the actual pattern
  var mySet = [e0, e1, e4, e6];
  helperForEach(mySet,function() {
    var elem = arguments[0];
    paper.patternline(elem.getIntersectPoint(0), elem.getIntersectPoint(3));
    paper.patternline(elem.getIntersectPoint(4), elem.getIntersectPoint(6));
  });
  mySet = [e2, e3, e5, e7];
  helperForEach(mySet,function() {
    var elem = arguments[0];
    paper.patternline(elem.getIntersectPoint(0), elem.getIntersectPoint(2));
    paper.patternline(elem.getIntersectPoint(3), elem.getIntersectPoint(6));
  });
  // Now animation
  paper.animateWall(sqTile, false);
};

function patternTwo(paper, sqTile) {
  paper.elementOpacity = 0.0;
  var c0 = paper.squareTemplate(sqTile);
  var e0 = paper.extendedconline(sqTile, c0.getIntersectPoint(0), c0.getIntersectPoint(1));
  var e1 = paper.extendedconline(sqTile, c0.getIntersectPoint(1), c0.getIntersectPoint(3));
  var e2 = paper.extendedconline(sqTile, c0.getIntersectPoint(3), c0.getIntersectPoint(5));
  var e3 = paper.extendedconline(sqTile, c0.getIntersectPoint(5), c0.getIntersectPoint(7));
  var e4 = paper.extendedconline(sqTile, c0.getIntersectPoint(7), c0.getIntersectPoint(6));
  var e5 = paper.extendedconline(sqTile, c0.getIntersectPoint(6), c0.getIntersectPoint(4));
  var e6 = paper.extendedconline(sqTile, c0.getIntersectPoint(4), c0.getIntersectPoint(2));
  var e7 = paper.extendedconline(sqTile, c0.getIntersectPoint(2), c0.getIntersectPoint(0));
  // j's -> squares
  var j0 = paper.conline(c0.getIntersectPoint(1), c0.getIntersectPoint(5));
  var j1 = paper.conline(c0.getIntersectPoint(5), c0.getIntersectPoint(6));
  var j2 = paper.conline(c0.getIntersectPoint(6), c0.getIntersectPoint(2));
  var j3 = paper.conline(c0.getIntersectPoint(2), c0.getIntersectPoint(1));
  var j4 = paper.conline(c0.getIntersectPoint(0), c0.getIntersectPoint(3));
  var j5 = paper.conline(c0.getIntersectPoint(3), c0.getIntersectPoint(7));
  var j6 = paper.conline(c0.getIntersectPoint(7), c0.getIntersectPoint(4));
  var j7 = paper.conline(c0.getIntersectPoint(4), c0.getIntersectPoint(0));
  // t's -> parallel lines
  var t0 = paper.extendedconline(sqTile, j0.getIntersectPoint(1), j2.getIntersectPoint(1));
  var t2 = paper.extendedconline(sqTile, j0.getIntersectPoint(3), j2.getIntersectPoint(3));
  var t1 = paper.extendedconline(sqTile, j1.getIntersectPoint(1), j3.getIntersectPoint(1));
  var t3 = paper.extendedconline(sqTile, j1.getIntersectPoint(3), j3.getIntersectPoint(3));
  var t4 = paper.extendedconline(sqTile, j0.getIntersectPoint(1), j1.getIntersectPoint(3));
  var t5 = paper.extendedconline(sqTile, j3.getIntersectPoint(1), j2.getIntersectPoint(3));
  var t6 = paper.extendedconline(sqTile, j0.getIntersectPoint(3), j3.getIntersectPoint(3));
  var t7 = paper.extendedconline(sqTile, j1.getIntersectPoint(1), j2.getIntersectPoint(1));

  // Bold action
  var mySet = [e0, e2, e5, e7];
  helperForEach(mySet,function() {
    var elem = arguments[0];
    paper.patternline(elem.getIntersectPoint(0), elem.getIntersectPoint(1));
    paper.patternline(elem.getIntersectPoint(2), elem.getIntersectPoint(4));
  });
  mySet = [e1, e3, e4, e6];
  helperForEach(mySet, function() {
    var elem = arguments[0];
    paper.patternline(elem.getIntersectPoint(0), elem.getIntersectPoint(2));
    paper.patternline(elem.getIntersectPoint(3), elem.getIntersectPoint(4));
  });
  // Bold action 2
  var innerAr = [t0, t1, t2, t3, t4, t5, t6, t7];
  helperForEach(innerAr, function() {
    var elem = arguments[0];
    paper.patternline(elem.getIntersectPoint(2), elem.getIntersectPoint(5));
    paper.patternline(elem.getIntersectPoint(7), elem.getIntersectPoint(10));
  });
  // Now the animation and show part
  paper.animateWall(sqTile, false);
};

function patternThree(paper, sqTile) {
  paper.elementOpacity = 0.0;
  var template = paper.hexagonTemplate(sqTile);
  var c0 = template.c0, t1 = template.t1, t2 = template.t2, t3 = template.t3,
      t4 = template.t4, t5 = template.t5, t6 = template.t6, t7 = template.t7;
  var t8 = paper.conline(c0.getIntersectPoint(1), c0.getIntersectPoint(9));
  paper.conline(c0.getIntersectPoint(1), c0.getIntersectPoint(6));
  paper.conline(c0.getIntersectPoint(9), c0.getIntersectPoint(6));
  var t9 = paper.conline(c0.getIntersectPoint(10), c0.getIntersectPoint(2));
  paper.conline(c0.getIntersectPoint(2), c0.getIntersectPoint(5));
  paper.conline(c0.getIntersectPoint(5), c0.getIntersectPoint(10));
  paper.extendedconline(sqTile, t8.getIntersectPoint(1), t1.getIntersectPoint(4));
  paper.extendedconline(sqTile, t1.getIntersectPoint(4), t9.getIntersectPoint(1));
  paper.extendedconline(sqTile, t8.getIntersectPoint(1), t9.getIntersectPoint(1));
  paper.extendedconline(sqTile, t1.getIntersectPoint(2), t8.getIntersectPoint(5));
  paper.extendedconline(sqTile, t1.getIntersectPoint(2), t9.getIntersectPoint(5));
  paper.extendedconline(sqTile, t8.getIntersectPoint(5), t9.getIntersectPoint(5));

  // BoldLine
  paper.patternline(t4.getIntersectPoint(1), t3.getIntersectPoint(1));
  paper.patternline(t2.getIntersectPoint(1), t7.getIntersectPoint(1));
  paper.patternline(t3.getIntersectPoint(4), t6.getIntersectPoint(1));
  paper.patternline(t7.getIntersectPoint(4), t5.getIntersectPoint(4));
  paper.patternline(t6.getIntersectPoint(3), t4.getIntersectPoint(4));
  paper.patternline(t5.getIntersectPoint(1), t2.getIntersectPoint(3));
  // Animation
  paper.animateWall(sqTile, true);
}

function patternFour(paper, sqTile) {
  paper.elementOpacity = 0.0;
  var template = paper.hexagonTemplate(sqTile);
  var c0 = template.c0, t1 = template.t1, t2 = template.t2, t3 = template.t3,
      t4 = template.t4, t5 = template.t5, t6 = template.t6, t7 = template.t7;
  var t8 = paper.conline(c0.getIntersectPoint(1), c0.getIntersectPoint(9));
  var t10 = paper.conline(c0.getIntersectPoint(1), c0.getIntersectPoint(6));
  var t11 = paper.conline(c0.getIntersectPoint(9), c0.getIntersectPoint(6));
  var t9 = paper.conline(c0.getIntersectPoint(10), c0.getIntersectPoint(2));
  var t12 = paper.conline(c0.getIntersectPoint(2), c0.getIntersectPoint(5));
  paper.conline(c0.getIntersectPoint(5), c0.getIntersectPoint(10));
  var j0 = paper.extendedconline(sqTile, t8.getIntersectPoint(1), t9.getIntersectPoint(1));
  var j1 = paper.extendedconline(sqTile, t8.getIntersectPoint(5), t9.getIntersectPoint(5));
  var j2 = paper.extendedconline(sqTile, t8.getIntersectPoint(1), t11.getIntersectPoint(5));
  var j3 = paper.extendedconline(sqTile, t12.getIntersectPoint(1), t11.getIntersectPoint(2));
  var j4 = paper.extendedconline(sqTile, t8.getIntersectPoint(5), t12.getIntersectPoint(1));
  var j5 = paper.extendedconline(sqTile, t10.getIntersectPoint(4), t11.getIntersectPoint(5));
  // BoldLine
  paper.patternline(j2.getIntersectPoint(2), j2.getIntersectPoint(5));
  paper.patternline(j2.getIntersectPoint(8), j2.getIntersectPoint(11));
  paper.patternline(j4.getIntersectPoint(1), j4.getIntersectPoint(4));
  paper.patternline(j4.getIntersectPoint(7), j4.getIntersectPoint(10));
  paper.patternline(j3.getIntersectPoint(1), j3.getIntersectPoint(4));
  paper.patternline(j3.getIntersectPoint(7), j3.getIntersectPoint(10));
  paper.patternline(j0.getIntersectPoint(1), j0.getIntersectPoint(4));
  paper.patternline(j0.getIntersectPoint(8), j0.getIntersectPoint(11));
  paper.patternline(j5.getIntersectPoint(2), j5.getIntersectPoint(5));
  paper.patternline(j5.getIntersectPoint(8), j5.getIntersectPoint(11));
  paper.patternline(j1.getIntersectPoint(1), j1.getIntersectPoint(4));
  paper.patternline(j1.getIntersectPoint(8), j1.getIntersectPoint(11));
  // Animation
  paper.animateWall(sqTile, true);
};

function patternFive(paper, sqTile) {
  paper.elementOpacity = 0.0;
  var c0 = paper.squareTemplate(sqTile);
  var e0 = paper.extendedconline(sqTile, c0.getIntersectPoint(0), c0.getIntersectPoint(1));
  var e1 = paper.extendedconline(sqTile, c0.getIntersectPoint(1), c0.getIntersectPoint(3));
  var e2 = paper.extendedconline(sqTile, c0.getIntersectPoint(3), c0.getIntersectPoint(5));
  var e3 = paper.extendedconline(sqTile, c0.getIntersectPoint(5), c0.getIntersectPoint(7));
  var e4 = paper.extendedconline(sqTile, c0.getIntersectPoint(7), c0.getIntersectPoint(6));
  var e5 = paper.extendedconline(sqTile, c0.getIntersectPoint(6), c0.getIntersectPoint(4));
  var e6 = paper.extendedconline(sqTile, c0.getIntersectPoint(4), c0.getIntersectPoint(2));
  var e7 = paper.extendedconline(sqTile, c0.getIntersectPoint(2), c0.getIntersectPoint(0));
  // j's -> squares
  var j0 = paper.conline(c0.getIntersectPoint(1), c0.getIntersectPoint(5));
  var j1 = paper.conline(c0.getIntersectPoint(5), c0.getIntersectPoint(6));
  var j2 = paper.conline(c0.getIntersectPoint(6), c0.getIntersectPoint(2));
  var j3 = paper.conline(c0.getIntersectPoint(2), c0.getIntersectPoint(1));
  var j4 = paper.conline(c0.getIntersectPoint(0), c0.getIntersectPoint(3));
  var j5 = paper.conline(c0.getIntersectPoint(3), c0.getIntersectPoint(7));
  var j6 = paper.conline(c0.getIntersectPoint(7), c0.getIntersectPoint(4));
  var j7 = paper.conline(c0.getIntersectPoint(4), c0.getIntersectPoint(0));
  // Bold
  var innerAr = [j0, j1, j2, j3, j4, j5, j6, j7];
  helperForEach(innerAr,function() {
    var elem = arguments[0];
    paper.patternline(elem.getIntersectPoint(0), elem.getIntersectPoint(1));
    paper.patternline(elem.getIntersectPoint(3), elem.getIntersectPoint(4));
  });
  // Animation
  paper.animateWall(sqTile, false);
};

function patternSix(paper, sqTile) {
  paper.elementOpacity = 0.0;
  var template = paper.hexagonTemplate(sqTile);
  var c0 = template.c0, t1 = template.t1, t2 = template.t2, t3 = template.t3,
      t4 = template.t4, t5 = template.t5, t6 = template.t6, t7 = template.t7;
  var j0 = paper.conline(t3.getIntersectPoint(1), t6.getIntersectPoint(1));
  var j1 =  paper.conline(t6.getIntersectPoint(1), t4.getIntersectPoint(1));
  var j2 = paper.conline(t3.getIntersectPoint(1), t4.getIntersectPoint(1));
  var j3 = paper.conline(t7.getIntersectPoint(2), t5.getIntersectPoint(2));
  var j4 = paper.conline(t5.getIntersectPoint(2), t2.getIntersectPoint(1));
  var j5 = paper.conline(t2.getIntersectPoint(1), t7.getIntersectPoint(2));
  var t8 = paper.conline(c0.getIntersectPoint(1), c0.getIntersectPoint(9));
  var t10 = paper.conline(c0.getIntersectPoint(1), c0.getIntersectPoint(6));
  var t11 = paper.conline(c0.getIntersectPoint(9), c0.getIntersectPoint(6));
  var t9 = paper.conline(c0.getIntersectPoint(10), c0.getIntersectPoint(2));
  var t12 = paper.conline(c0.getIntersectPoint(2), c0.getIntersectPoint(5));
  var t13 = paper.conline(c0.getIntersectPoint(5), c0.getIntersectPoint(10));
  // Bold
  var innerAr = [t8, t9, t10, t11, t12, t13];
  helperForEach(innerAr,function() {
    var elem = arguments[0];
    paper.patternline(elem.getIntersectPoint(0), elem.getIntersectPoint(1));
    paper.patternline(elem.getIntersectPoint(7), elem.getIntersectPoint(8));
  });
  innerAr = [j0, j1];
  helperForEach(innerAr, function() {
    var elem = arguments[0];
    paper.patternline(elem.getIntersectPoint(1), elem.getIntersectPoint(8));
  });

  paper.patternline(j2.getIntersectPoint(1), j2.getIntersectPoint(7));
  paper.patternline(j3.getIntersectPoint(1), j3.getIntersectPoint(7));
  paper.patternline(j4.getIntersectPoint(1), j4.getIntersectPoint(7));
  paper.patternline(j5.getIntersectPoint(1), j5.getIntersectPoint(7));
  // Animation
  paper.animateWall(sqTile, false);
};

function helperForEach(arr, func) {
  for (var i = 0; i < arr.length; i++) {
    func.call(this, arr[i]);
  }
};

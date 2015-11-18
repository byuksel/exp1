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

function helperForEach(arr, func) {
  for (var i = 0; i < arr.length; i++) {
    func.call(this, arr[i]);
  }
};

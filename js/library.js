function Agama() {}

var Ag = Agama;
Ag.p = Agama.prototype;

Raphael.sortByXY = function(a, b) {
  var zoo = Raphael.extractCoordinates(a, b);
  if (zoo.x1 > zoo.x2) {
    return 1;
  }
  if (zoo.x1 == zoo.x2) {
    if (zoo.y1 > zoo.y2) {
      return 1;
    }
    if (zoo.y1 < zoo.y2) {
      return -1;
    }
    return 0;
  }
  return -1;
};

Raphael.fn.getIntersectForCircles = function(x1, y1, r1, x2, y2, r2) {
    var bigRSq = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    var r1r2minus = r1 * r1 - r2 * r2;
    var r1r2plus = r1 * r1 + r2 * r2;

    var firstMul = 0.5;
    var secondMul = r1r2minus/(2* bigRSq);
    var thirdMul = 0.5 * Math.sqrt((2*r1r2plus/bigRSq) - (r1r2minus * r1r2minus / (bigRSq * bigRSq)) - 1);

    var inter_x1 = firstMul * (x1 + x2) + secondMul * (x2 - x1) + thirdMul * (y2-y1);
    var inter_y1 = firstMul * (y1 + y2) + secondMul * (y2 - y1) + thirdMul * (x1-x2);

    var inter_x2 = firstMul * (x1 + x2) + secondMul * (x2 - x1) - thirdMul * (y2-y1);
    var inter_y2 = firstMul * (y1 + y2) + secondMul * (y2 - y1) - thirdMul * (x1-x2);

  var returnVal =  [];
  if (inter_x1 != NaN && inter_y1!= NaN) {
    returnVal.push({ x: inter_x1, y: inter_y1, agamatype: 'pivot'});
  }
  if ((inter_x2 != NaN && inter_y2 != NaN) &&
      (inter_x1 != inter_x2 || inter_y1 != inter_y2)) {
    returnVal.push({ x: inter_x2, y: inter_y2, agamatype: 'pivot'});
  };
  return returnVal;
};


Raphael.fn.getIntersectForLineAndCircle = function(linex1, liney1, linex2, liney2,
                                                   xc, yc, rc) {
  var dx = linex2 - linex1;
  var dy = liney2 - liney1;
  var retVal = [];
  if (dx == 0 && dy == 0) return retVal;

  var dl = dx * dx + dy * dy;
  var t = ((xc - linex1) * dx + (yc - liney1) * dy) / dl;

  var nearestX = linex1 + t * dx;
  var nearestY = liney1 + t * dy;

  var dist = Raphael.getDist(nearestX, nearestY, xc, yc);
  if (dist == rc ) {
    retVal.push({ x: nearestX, y:nearestY, agamatype: 'pivot'});
    return retVal;
  } else if ( dist > rc ) {
    return retVal;
  }

  // Two points that intersect
  var dt = Math.sqrt(rc * rc - dist * dist) / Math.sqrt(dl);
  var t1 = t - dt;
  retVal.push({ x: linex1 + t1 * dx, y: liney1 + t1 * dy , agamatype: 'pivot'});
  var t2 = t + dt;
  retVal.push({ x: linex1 + t2 * dx, y: liney1 + t2 * dy,  agamatype: 'pivot'});
  return retVal;
};

Raphael.fn.pushIfUnique = function(inputArray, elem) {
  var isUnique = true;
  for (var i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == elem) {
      isUnique = false;
      break;
    }
  }
  if (isUnique) inputArray.push(elem);
};

Raphael.el.getActualPath = function() {
  return Raphael.mapPath(this.getPath(), this.matrix);
};

Raphael.st.getActualPath = function () {
  this.forEach(function (el) {
    el.getActualPath();
  });
};

Raphael.el.getActualPathString = function() {
  var outputStr = '';
  var path = this.getActualPath();
  for (var i = 0; i < path.length; i++) {
    if (path[i].length == 0) continue;
    outputStr += path[i][0];
    if (path[i].length == 1) continue;
    outputStr += path[i].slice(1, path[i].length).join(',');
  }
  return outputStr;
};

Raphael.st.getActualPathString = function () {
  this.forEach(function (el) {
    el.getPathString();
  });
};

Raphael.el.getIntersection = function(b) {
  if (!(b instanceof Raphael.el.constructor)) return [];

  var preResult;
  if (this.type == 'circle' && b.type == 'circle') {
    var x1 = this.actualAttr('cx');
    var x2 = b.actualAttr('cx');
    var y1 = this.actualAttr('cy');
    var y2 = b.actualAttr('cy');
    var r1 = this.actualAttr('r');
    var r2 = b.actualAttr('r');
    preResult = this.paper.getIntersectForCircles(x1, y1, r1, x2, y2, r2);
  } else if ((this.type == 'circle' && b.type == 'path') ||
             (this.type == 'path' && b.type == 'circle')) {
    var xc = this.type == 'circle' ? this.actualAttr('cx'): b.actualAttr('cx');
    var yc = this.type == 'circle' ? this.actualAttr('cy'): b.actualAttr('cy');
    var rc = this.type == 'circle' ? this.actualAttr('r'): b.actualAttr('r');
    var x1 = this.type == 'path' ? this.actualAttr('x1'): b.actualAttr('x1');
    var y1 = this.type == 'path' ? this.actualAttr('y1'): b.actualAttr('y1');
    var x2 = this.type == 'path' ? this.actualAttr('x2'): b.actualAttr('x2');
    var y2 = this.type == 'path' ? this.actualAttr('y2'): b.actualAttr('y2');
    preResult = this.paper.getIntersectForLineAndCircle(
      x1, y1, x2, y2, xc, yc, rc);
  } else {
    var pathInter = Raphael.pathIntersection(this.getActualPath(), b.getActualPath());
    preResult = [];
    pathInter.forEach(function (inter) {
      var alreadyExists = false;
      for (var i = 0; i < preResult.length; i++) {
        if (preResult[i].x == Number(inter.x.toFixed(1)) &&
            preResult[i].y == Number(inter.y.toFixed(1))) {
          alreadyExists = true;
          break;
        }
      }
      if (!alreadyExists) {
        preResult.push({ x: Number(inter.x.toFixed(1)),
                         y: Number(inter.y.toFixed(1)),
                         agamatype: 'pivot'});
      }
    });
  };

  preResult.sort(Raphael.sortByXY);
  return preResult;
};

Raphael.fn.__agamacircle__ = Raphael.fn.circle;
Raphael.fn.circle = function(a, c, d) {
  var k = Raphael.fn.__agamacircle__.call(this, a, c, d);
  if (!this.__circles__) {
    this.__circles__ = [];
  }
  this.__circles__.push(k);
  k.agamatype = k.type;
  k.__intersectpoints__ = [];
  k.findAllInteractions();
  k.invisible();
  return k;
};

Raphael.fn.__agamarect__ = Raphael.fn.rect;
Raphael.fn.rect = function(a, c, d, e, f) {
  var k = Raphael.fn.__agamarect__.call(this, a, c, d, e, f);
  if (!this.__circles__) {
    this.__circles__ = [];
  }
  this.__circles__.push(k);
  k.agamatype = k.type;
  return k;
};

Raphael.fn.__agamapath__ = Raphael.fn.path;
Raphael.fn.path = function(a) {
  var k = Raphael.fn.__agamapath__.call(this, a);
  return k;
};

Raphael.extractCoordinates = function(a, b, c, d) {
  var x1, y1, x2, y2;
  if (a.agamatype == 'pivot' && b.agamatype == 'pivot') {
    x1 = a.x;
    y1 = a.y;
    x2 = b.x;
    y2 = b.y;
  } else if (a.agamatype == 'point' && b.agamatype == 'point') {
    x1 = a.actualAttr('cx');
    y1 = a.actualAttr('cy');
    x2 = b.actualAttr('cx');
    y2 = b.actualAttr('cy');
  } else {
    x1 = a;
    y1 = b;
    x2 = c;
    y2 = d;
  };
  return {x1: x1, y1: y1, x2: x2, y2: y2};
};

Raphael.fn.line = function(a, b, c, d) {
  var zoo = Raphael.extractCoordinates(a, b, c, d);
  var m = Raphael.lineStr(zoo.x1, zoo.y1, zoo.x2, zoo.y2);
  var k = Raphael.fn.__agamapath__.call(this, m);
  k.attrs.x1 = zoo.x1;
  k.attrs.y1 = zoo.y1;
  k.attrs.x2 = zoo.x2;
  k.attrs.y2 = zoo.y2;
  if (!this.__circles__) {
    this.__circles__ = [];
  }
  this.__circles__.push(k);
  k.agamatype = 'line';
  k.__intersectpoints__ = [];
  k.findAllInteractions();
  k.invisible();
  return k;
};

Raphael.fn.__agamaellipse__ = Raphael.fn.ellipse;
Raphael.fn.ellipse = function(a, c, d, e) {
  var k = Raphael.fn.__agamaellipse__.call(this, a, c, d, e);
  if (!this.__circles__) {
    this.__circles__ = [];
  }
  this.__circles__.push(k);
  return k;
};

Raphael.el.actualAttr = function(a) {
  if (this.type == 'circle') {
    if (a == 'cx') {
      return this.matrix.x(this.attr('cx'), this.attr('cy'));
    };
    if (a == 'cy') {
      return this.matrix.y(this.attr('cx'), this.attr('cy'));
    };
    if (a == 'r') {
      var cx = this.attr('cx');
      var cy = this.attr('cy');
      var r = this.attr('r');
      var newX = this.matrix.x(cx, cy);
      var newY = this.matrix.y(cx, cy);
      var newXR = this.matrix.x(cx + r, cy);
      var newYR = this.matrix.y(cx + r, cy);
      return Raphael.getDist(newX, newY, newXR, newYR);
    };
  };
  return this.attr(a);
};


Raphael.getDist = function(x1, y1, x2, y2)  {
  return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
};

Raphael.moveTo = function(x, y) {
    return String('M' + x + ',' + y);
};

Raphael.drawTo = function(x, y) {
    return String('L' + x + ',' + y);
};

Raphael.lineStr = function(x1, y1, x2, y2) {
  return Raphael.moveTo(x1, y1) + Raphael.drawTo(x2,y2);
};



function AgamaCY() {};
var CY = AgamaCY;

CY.getWidthHeight = function(document, elemID) {
  var domElem = document.getElementById(elemID);
  var width = Math.abs(domElem.offsetWidth);
  var height = Math.abs(domElem.offsetHeight);
  return { width: width, height: height };
};

// Given width and height of Canvas, and a padding value,
// this finds the coordinates of a nice square area in the middle
// to draw.
CY.getSquareCoorInMiddle = function(winInfo, padding) {
  var length = winInfo.height;
  if (winInfo.height > winInfo.width) length = winInfo.width;
  var radius = length/2 - padding;
  var x_center = winInfo.width/2;
  var y_center = winInfo.height/2;
  return { topX: x_center - radius,
           topY: y_center - radius,
           bottomX: x_center + radius,
           bottomY: y_center + radius };
};

Raphael.fn.agama = new Agama();

Raphael.squareTile = function(topX, topY, bottomX, bottomY) {
  this.topX = topX;
  this.topY = topY;
  this.bottomX = bottomX;
  this.bottomY = bottomY;
  this.radius = (bottomX - topX) / 2;
  this.x_center = (topX + bottomX) / 2;
  this.y_center = (topY + bottomY) / 2;
};

Raphael.squareTile.prototype.isInside = function(x, y) {
  return ( x >= this.topX && x <= this.bottomX &&
           y >= this.topY && y <= this.bottomY);
};
Raphael.fn.getSquareTile = function(topX, topY, bottomX, bottomY) {
  return new Raphael.squareTile(topX, topY, bottomX, bottomY);
};

Raphael.fn.pushIfInTile = function(x, y, sqTile, finalXY) {
  if (sqTile.isInside(x,y)) {
    finalXY.push({ x: x, y: y});
  }
};

Raphael.fn.boldLine = function (a, b, c, d) {
  var zoo = Raphael.extractCoordinates(a, b, c, d);
  var m = Raphael.lineStr(zoo.x1, zoo.y1, zoo.x2, zoo.y2);
  var k = Raphael.fn.__agamapath__.call(this, m);
  k.attrs.x1 = zoo.x1;
  k.attrs.y1 = zoo.y1;
  k.attrs.x2 = zoo.x2;
  k.attrs.y2 = zoo.y2;
  if (!this.__boldlines__) {
    this.__boldlines__ = [];
  }
  this.__boldlines__.push(k);
  k.agamatype = 'boldline';
  k.attr('stroke', 'red');
  k.attr('stroke-width', 5);
  k.invisible();
  return k;
};

Raphael.fn.extendedLine = function (sqTile, a, b, c, d) {
  var zoo = Raphael.extractCoordinates(a, b, c, d);
  var x1 = zoo.x1;
  var y1 = zoo.y1;
  var x2 = zoo.x2;
  var y2 = zoo.y2;

  var yDif = y1 - y2;
  var xDif = x1 - x2;

  // Handled special conditions
  var line;
  if (xDif == 0 && sqTile.isInside(x1, sqTile.topY)) {
    line = this.line(x1, sqTile.topY, x1, sqTile.bottomY);
  } else {
    if (yDif == 0 && sqTile.isInside(sqTile.topX, y1)) {
      line = this.line(sqTile.topX, y1, sqTile.bottomX, y1);
    } else {
      var slope = yDif / xDif;
      var intercept = y1 - slope * x1;

      var derivedTopY = slope * sqTile.topX + intercept;
      var derivedTopX = (sqTile.topY - intercept) / slope;
      var derivedBottomY = slope * sqTile.bottomX + intercept;
      var derivedBottomX = (sqTile.bottomY - intercept) / slope;

      var finalXY = [];
      this.pushIfInTile(sqTile.topX, derivedTopY, sqTile, finalXY);
      this.pushIfInTile(derivedTopX, sqTile.topY, sqTile, finalXY);
      this.pushIfInTile(sqTile.bottomX, derivedBottomY, sqTile, finalXY);
      this.pushIfInTile(derivedBottomX, sqTile.bottomY, sqTile, finalXY);

      if (finalXY.length > 1) {
        line = this.line(finalXY[0].x, finalXY[0].y, finalXY[1].x, finalXY[1].y);
      }
    }
  }
  return line;
};

Raphael.el.findAllInteractions = function() {
  var me = this;
  this.paper.__circles__.forEach(function (el) {
    if (el.id == me.id) return;
    var all = me.getIntersection(el);
    all.forEach(function(interXY) {
      var existingPoint = false;
      var i = 0;
      if (!me.paper.__points__) me.paper.__points__ = [];
      for (i = 0; i < me.paper.__points__.length; i++) {
        if (me.paper.__points__[i].attrs.cx == interXY.x &&
            me.paper.__points__[i].attrs.cy == interXY.y) {
           existingPoint = true;
          break;
        }
      }
      if (existingPoint) {
        me.paper.pushIfUnique(me.__intersectpoints__, me.paper.__points__[i]);
        me.paper.pushIfUnique(me.paper.__points__[i].touchingElements, me);
      } else {
        var k = me.paper.point(interXY.x, interXY.y);
        k.touchingElements.push(me);
        me.__intersectpoints__.push(k);
      }
     });
  });
};

// A point is a circle with radius = 1
Raphael.fn.point = function(a, c) {
  var k = Raphael.fn.__agamacircle__.call(this, a, c, 1);
  k.touchingElements = [];
  if (!this.__points__) {
    this.__points__ = [];
  }
  this.__points__.push(k);
  k.agamatype = 'point';
  k.invisible();
  return k;
};

// A pivot is a helper construct. It does not register itself with paper's
// points. It is hidden. It is used simply create pivots on the canvas for
// making calculations easier.
Raphael.fn.pivot = function(x, y) {
  return {x: x, y: y, agamatype:'pivot'};
};

Raphael.getDistBetweenPivots = function(P1, P2) {
  var x1 = P1.x;
  var y1 = P1.y;
  var x2 = P2.x;
  var y2 = P2.y;
  return Raphael.getDist(x1, y1, x2, y2);
};

// of all the supplied points, finds the closest to the first argument
Raphael.closestPivot = function(pivot, candidates) {
  if (candidates.length < 1) return pivot;
  var minElem = 0;
  var minDist = Raphael.getDistBetweenPivots(pivot, candidates[i]);
  for (var i = 1; i < candidates.length; i++) {
    var newDist = Raphael.getDistBetweenPivots(pivot, candidates[i]);
    if ( newDist < minDist) {
      minDist = newDist;
      minElem = i;
    };
  };
  return candidates(minElem);
};

Raphael.el.invisible = function() {
  this.attr('opacity', 0);
};
Raphael.st.invisible = function () {
  this.forEach(function (el) {
    el.invisible();
  });
};



function patternOne(paper, sqTile) {
  var c0 = paper.circle(sqTile.x_center, sqTile.y_center, sqTile.radius);
  var topX = sqTile.topX;
  var topY = sqTile.topY;
  var bottomX = sqTile.bottomX;
  var bottomY = sqTile.bottomY;
  var radius = sqTile.radius;

  var pivot0 = paper.pivot(topX, topY);

  var l4 = paper.line(topX, topY, bottomX, topY);
  var l3 = paper.line(topX, topY, topX, bottomY);
  var l0 = paper.line(topX, topY, bottomX, bottomY);
  var l1 = paper.line(bottomX, topY, bottomX, bottomY);
  var l2 = paper.line(bottomX, topY, topX, bottomY);
  var l5 = paper.line(topX, bottomY, bottomX, bottomY);
  paper.line(topX + radius, topY, topX + radius, bottomY);
  paper.line(topX, topY + radius, bottomX, topY + radius);

  var firstElems = l0.getIntersection(c0);
  var westElems = l1.getIntersection(c0);
  var eastElems = l3.getIntersection(c0);
  var northElems = l4.getIntersection(c0);
  var southElems = l5.getIntersection(c0);
  var e0 = paper.extendedLine(sqTile, firstElems[0], westElems[0]);
  var e1 = paper.extendedLine(sqTile, firstElems[1], eastElems[0]);
  var e2 = paper.extendedLine(sqTile, firstElems[1], northElems[0]);
  var e3 = paper.extendedLine(sqTile, firstElems[0], southElems[0]);
  firstElems = l2.getIntersection(c0);
  var e4 = paper.extendedLine(sqTile, firstElems[0], westElems[0]);
  var e5 = paper.extendedLine(sqTile, firstElems[1], eastElems[0]);
  var e6 = paper.extendedLine(sqTile, firstElems[1], southElems[0]);
  var e7 = paper.extendedLine(sqTile, firstElems[0], northElems[0]);
  // Now do the actual pattern
  console.log(e0);
  firstElems = e0.__intersectpoints__.sort(Raphael.sortByXY);
  paper.boldLine(firstElems[0], firstElems[3]);
  paper.boldLine(firstElems[4], firstElems[6]);
  firstElems = e1.__intersectpoints__.sort(Raphael.sortByXY);
  paper.boldLine(firstElems[0], firstElems[1]);
  paper.boldLine(firstElems[2], firstElems[5]);
  firstElems = e2.__intersectpoints__.sort(Raphael.sortByXY);
  paper.boldLine(firstElems[0], firstElems[2]);
  paper.boldLine(firstElems[3], firstElems[6]);
  firstElems = e3.__intersectpoints__.sort(Raphael.sortByXY);
  paper.boldLine(firstElems[0], firstElems[3]);
  paper.boldLine(firstElems[4], firstElems[5]);
  firstElems = e4.__intersectpoints__.sort(Raphael.sortByXY);
  paper.boldLine(firstElems[0], firstElems[4]);
  paper.boldLine(firstElems[5], firstElems[7]);
  firstElems = e5.__intersectpoints__.sort(Raphael.sortByXY);
  paper.boldLine(firstElems[0], firstElems[2]);
  paper.boldLine(firstElems[3], firstElems[7]);
  firstElems = e6.__intersectpoints__.sort(Raphael.sortByXY);
  paper.boldLine(firstElems[0], firstElems[2]);
  paper.boldLine(firstElems[3], firstElems[7]);
  firstElems = e7.__intersectpoints__.sort(Raphael.sortByXY);
  paper.boldLine(firstElems[0], firstElems[4]);
  paper.boldLine(firstElems[5], firstElems[7]);

  // Now the animation and show part
  var lines = paper.set();
  paper.__circles__.forEach(function(elem) {
    lines.push(elem);
  });
  var animateIndex = 0;
  var animLines = function() {
    if (animateIndex < paper.__circles__.length) {
      paper.__circles__[animateIndex++].animate({ opacity: '1'}, 200, animLines);
    } else {
      animBold();
    }
  };


  var allPaths = '';
  paper.__boldlines__.forEach(function(elem) {
    allPaths += elem.getActualPathString();
  });
  var major = paper.path(allPaths).hide();
  var majorLen = major.getTotalLength();
  var animateLength = 0;
  var partialPaths = paper.set();

  var finalAnimation = function() {
    major.attr('stroke', 'red').attr('stroke-width', 3).show();
    partialPaths.forEach(function(elem) { elem.remove();});
    major.animate({transform: 'r45,10,10s1,1,100,100r45s0.5t-18,-99'},
                  1000, function () {
                    major.clone().transform('s0.5T0,0');
                    major.clone().transform('s0.5T-190,0');
                    major.clone().transform('s0.5T190,0');
                    major.clone().transform('s0.5T0,190');
                    major.clone().transform('s0.5T190,190');
                    major.clone().transform('s0.5T190,-190');
                    major.clone().transform('s0.5T-190,-190');
                    major.clone().transform('s0.5T0,-190');
                  });
  };

  var animBold = function() {
    if (animateLength < 1.0) {
      animateLength += 0.05;
      var subpath = major.getSubpath(0, animateLength * majorLen);
      partialPaths.push(paper.path(subpath).attr('stroke', 'red').attr('stroke-width', 3));
      setTimeout(animBold, 200);
    } else {
      lines.animate({opacity: 0}, 1000, finalAnimation);
    };
  };


  animLines();
  return 0;
};

// Transformations on line
// Decide on whether to update on transformation or on actualAttr
// Rename __Circles__ to __shapes__
// When you transform, intersections change
// Always sort intersection points by X, so that you can save pivot math.
// When three lines intersect, they should always be on the same point and not create a new point

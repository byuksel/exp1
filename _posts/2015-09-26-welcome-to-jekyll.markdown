---
layout: post
title:  "Experiment 1"
date:   2015-09-26 10:29:53
categories: Project Agama First Experiment
---
<div id='outgraph' style='height: 400px; width:100%; background-color: #f0f0f0;'></div>


<script>
var winInfo = Agama.getWidthHeight(document, 'outgraph');
var paper =  new Agama('outgraph', winInfo.width, winInfo.height);
var sqInfo = Agama.getSquareCoorInMiddle(winInfo, 10);
var sqTile = paper.getSquareTile(sqInfo.topX, sqInfo.topY,
                                 sqInfo.bottomX, sqInfo.bottomY);
var t = patternOne(paper, sqTile);


// Save to SVG
// var svg = paper.toSVG();
// document.getElementById('bar').innerHTML = svg;
</script>

<pre style="visibility:hidden;">
</pre>



[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help

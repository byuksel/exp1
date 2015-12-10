---
layout: post
title:  "Experiment 4"
date:   2015-11-09 09:05:06
categories: experiment
---
<div id='outgraph' style='height: 400px; width:100%; background-color: #f0f0f0;'></div>

<script>
var winInfo = Agama.getWidthHeight(document, 'outgraph');
var paper =  new Agama('outgraph', winInfo.width, winInfo.height);
var sqInfo = Agama.getSquareCoorInMiddle(winInfo, 10);
var sqTile = paper.getSquareTile(sqInfo.topX, sqInfo.topY,
                                 sqInfo.bottomX, sqInfo.bottomY);
var t = patternFour(paper, sqTile);
</script>

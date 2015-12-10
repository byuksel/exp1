---
layout: post
title:  "Experiment 5"
date:   2015-11-11 13:05:46
categories: experiment
---
<div id='outgraph' style='height: 400px; width:100%; background-color: #f0f0f0;'></div>

<script>
var winInfo = Agama.getWidthHeight(document, 'outgraph');
var paper =  new Agama('outgraph', winInfo.width, winInfo.height);
var sqInfo = Agama.getSquareCoorInMiddle(winInfo, 10);
var sqTile = paper.getSquareTile(sqInfo.topX, sqInfo.topY,
                                 sqInfo.bottomX, sqInfo.bottomY);
var t = patternFive(paper, sqTile);
</script>

---
layout: post
title:  "Experiment 6"
date:   2015-11-16 13:08:32
categories: experiment
---
<div id='outgraph' style='height: 400px; width:100%; background-color: #f0f0f0;'></div>

<script>
var winInfo = Agama.getWidthHeight(document, 'outgraph');
var paper =  new Agama('outgraph', winInfo.width, winInfo.height);
var sqInfo = Agama.getSquareCoorInMiddle(winInfo, 10);
var sqTile = paper.getSquareTile(sqInfo.topX, sqInfo.topY,
                                 sqInfo.bottomX, sqInfo.bottomY);
var t = patternSix(paper, sqTile);
</script>

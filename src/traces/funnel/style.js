'use strict';

var d3 = require('../../lib/d3');
var getTraceFromCd = require('../../lib/trace_from_cd');
var Drawing = require('../../components/drawing');
var Color = require('../../components/color');
var DESELECTDIM = require('../../constants/interactions').DESELECTDIM;
var barStyle = require('../bar/style');
var resizeText = require('../bar/uniform_text').resizeText;
var styleTextPoints = barStyle.styleTextPoints;

function style(gd, cd, sel) {
    var s = sel ? sel : d3.select(gd).selectAll('g[class^="funnellayer"]').selectAll('g.trace');
    resizeText(gd, s, 'funnel');

    s.style('opacity', function(d) { return getTraceFromCd(d).opacity; });

    s.each(function(d) {
        var gTrace = d3.select(this);
        var trace = getTraceFromCd(d);

        gTrace.selectAll('.point > path').each(function(di) {
            if(!di.isBlank) {
                var cont = trace.marker;

                d3.select(this)
                    .call(Color.fill, di.mc || cont.color)
                    .call(Color.stroke, di.mlc || cont.line.color)
                    .call(Drawing.dashLine, cont.line.dash, di.mlw || cont.line.width)
                    .style('opacity', trace.selectedpoints && !di.selected ? DESELECTDIM : 1);
            }
        });

        styleTextPoints(gTrace, trace, gd);

        gTrace.selectAll('.regions').each(function() {
            d3.select(this).selectAll('path').style('stroke-width', 0).call(Color.fill, trace.connector.fillcolor);
        });

        gTrace.selectAll('.lines').each(function() {
            var cont = trace.connector.line;

            Drawing.lineGroupStyle(
                d3.select(this).selectAll('path'),
                cont.width,
                cont.color,
                cont.dash
            );
        });
    });
}

module.exports = {
    style: style
};

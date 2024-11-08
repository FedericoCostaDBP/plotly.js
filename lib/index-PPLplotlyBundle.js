'use strict';

var Plotly = require('./core');

Plotly.register([
    // traces
    require('./histogram'),
    require('./barpolar'),

    // components
    require('./calendars'),
]);

module.exports = Plotly;

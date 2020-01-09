"use strict";

const express = require("express");
const process = require("process");
const bodyParser = require('body-parser');
// [START web_client_monitoring_imports]
const { globalStats, MeasureUnit, AggregationType, TagMap } = require('@opencensus/core');
const { StackdriverStatsExporter } = require('@opencensus/exporter-stackdriver');
// [END web_client_monitoring_imports]

const app = express();
app.use(express.static("web_client"));
app.use(bodyParser.json());

const project = "opencenus-node";

// OpenCensus setup
// [START web_client_monitoring_ocsetup]
const exporter = new StackdriverStatsExporter({projectId: project, logger: console});
globalStats.registerExporter(exporter);
const mClickCount = globalStats.createMeasureInt64("webmetrics/click_count",
                       MeasureUnit.UNIT,
                       "Number of clicks");
const tagClient = { name: "client" };

const clickCountView = globalStats.createView(
  "webmetrics/click_count",
  mClickCount,
  AggregationType.COUNT,
  [tagClient],
  "The number of button clicks"
);
globalStats.registerView(clickCountView);
// [END web_client_monitoring_ocsetup]

app.get('/', function (req, res) {
  const valueWeb = "web";
  const tags = new TagMap();
  tags.set(tagClient, { value: valueWeb });

  // [START web_client_monitoring_record]
  globalStats.record([{
    measure: mClickCount,
    value: 1
  }], tags);
  // [END web_client_monitoring_record]
  res.status(200).send("Received").end();

})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

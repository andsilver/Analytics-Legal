$(document).ready(function() {
  if ($('.count-cases-table').length == 0) {
    return;
  };

  fooTable = FooTable.init('.count-cases-table', {
    columns: [
      { "name": "name", "title": "Nombre" },
      { "name": "rut", "title": "RUT" },
      { "name": "count", "title": "Cantidad", "sorted": true, "direction": "DESC" },
      { "name": "percentage", "title": "Porcentaje" },
    ],
    rows: topDefendantRutsJSON
  });

  filteredData = _.filter(topDefendantRutsJSON, function(json) { return json.quarter !== null; });
  sliderData = _.sortBy(filteredData, [function(json) { return json.quarter; }]);
  timeFormat = "Q[Q] YYYY";
  sliderValues = _.map(sliderData, function(json) {
    return moment.unix(json.quarter).format(timeFormat)
  });
  $(".top_defendant_ruts__slider").ionRangeSlider({
    type: "double",
    grid: true,
    from: sliderValues[0],
    to: sliderValues[sliderValues.length - 1],
    values: _.sortedUniq(sliderValues),
    onFinish: function(data) {
      fromTime = moment(data.from_value, timeFormat).format("X") - 1;
      toTime = moment(data.to_value, timeFormat).format("X") + 1;

      newData = _.filter(topDefendantRutsJSON, function(json) {
        return json.quarter === null || _.inRange(json.quarter, fromTime, toTime)
      });

      fooTable.rows.load(newData);
    }
  });
});
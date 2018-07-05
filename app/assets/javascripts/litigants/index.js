$(document).ready(function() {
  if ($('.count-cases-table').length == 0) {
    return;
  };

  FooTable.init('.count-cases-table', {
    columns: [
      {"name":"name","title":"Nombre"},
      {"name":"rut","title":"RUT"},
      {"name":"count","title":"Cantidad"},
      {"name":"percentage","title":"Porcentaje"},
    ],
    rows: countCasesJSON
  });
});
$(document).ready(function() {
  if ($('.cases-by-rut-table').length == 0) {
    return;
  };

  $('.cases-by-rut-table').DataTable({
    processing: true,
    serverSide: true,
    searching: false,
    "lengthChange": false,
    ajax: '/dashboards/cases-on-users-ruts.json',
    pageLength: 15,
    "columns": [
      { "name": "RIT" },
      { "name": "RUC" },
      { "name": "Nombre" },
      { "name": "Tribunal" },
      { "name": "Fecha Ingreso" },
      { "name": "Procedimiento" },
      { "name": "Forma Inicio" },
      { "name": "Estado Adm." },
      { "name": "Etapa" },
      { "name": "Estado Procedimiento" },
    ],
    "order": [[4, "desc"]]
  });

  $( ".cases-by-rut-table" ).on( "click", "tbody tr", function(event) {
    var rut_index = $('th:contains(RUC)').index();
    var rut = $(event.currentTarget).find(':eq('+rut_index+')').text();
    var link = '/laboral/cases/index_by_ruc?laboral_case[RUC]='+rut;
    window.location.href = link;
  });
});
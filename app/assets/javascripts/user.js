$(document).ready(function() {
  $('.allowed-ruts-select2').select2({
    placeholder: 'RUT permitidas',
    minimumInputLength: 3,
    ajax: {
      url: '/laboral/litigants/search',
      dataType: 'json'
    }
  });
});
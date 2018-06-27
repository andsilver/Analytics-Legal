$(document).ready(function() {
  $('.allowed-ruts-select2').select2({
    placeholder: 'RUT permitidas',
    ajax: {
      url: '/laboral/litigants/search',
      dataType: 'json'
    }
  });
});
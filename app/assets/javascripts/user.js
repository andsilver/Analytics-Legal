$(document).ready(function() {
  $('.allowed-ruts-select2').select2({
    placeholder: 'RUT permitidas',
    minimumInputLength: 3,
    ajax: {
      url: '/laboral/litigants/search',
      delay: 250,
      dataType: 'json',
      cache: true,
      data: function (params) {
        var query = {
          q: params.term,
          page: params.page || 1
        }

        return query;
      },
      processResults: function (data, params) {
        params.page = params.page || 1;

        return {
          results: data.results,
          pagination: {
            more: data.pagination.more
          }
        };
      }
    }
  });
});
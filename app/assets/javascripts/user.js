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
        existingRuts = _.map($('.allowed-ruts-select2').select2('data'), function(el) {
          return el.id.split(':')[1];
        });

        params.page = params.page || 1;
        return {
          results: _.filter(data.results, function(el) {
            rut = el.id.split(':')[1];

            return rut == '0-0' || !existingRuts.includes(rut);
          }),
          pagination: {
            more: data.pagination.more
          }
        };
      }
    }
  });
});
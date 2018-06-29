$(document).ready(function() {
  FooTable.StatesFiltering = FooTable.Filtering.extend({
    construct: function(instance){
      this._super(instance);
      this.procedureStatuses = ['Acumulada', 'Concluido', 'Cumplimiento', 'Invalidado', 'Sin tramitación',
                       'Suspendido', 'Tramitación'];
      this.adminStatuses = ['Archivada', 'Sin archivar'];
      this.procedureDefault = 'Estado Procedimiento (todas)';
      this.adminDefault = 'Estado Adm (todas)';
      this.$procStatus = null;
      this.$admStatus = null;
    },
    $create: function(){
      this._super();
      var self = this,
        $formGrpProc = $('<div/>', {'class': 'form-group'})
          .append($('<label/>', {'class': 'sr-only', text: 'Estado Procedimiento'}))
          .prependTo(self.$form),
        $formGrpAdm = $('<div/>', {'class': 'form-group'})
          .append($('<label/>', {'class': 'sr-only', text: 'Estado Adm'}))
          .prependTo(self.$form);

      self.$procStatus = $('<select/>', { 'class': 'form-control m-r-10' })
        .on('change', {self: self}, self._onProcStatusDropdownChanged)
        .append($('<option/>', {text: self.procedureDefault, selected: true}))
        .appendTo($formGrpProc);

      self.$admStatus = $('<select/>', { 'class': 'form-control m-r-10' })
        .on('change', {self: self}, self._onAdmStatusDropdownChanged)
        .append($('<option/>', {text: self.adminDefault}))
        .appendTo($formGrpAdm);

      $.each(self.procedureStatuses, function(i, status){
        self.$procStatus.append($('<option/>').text(status));
      });

      $.each(self.adminStatuses, function(i, status){
        self.$admStatus.append($('<option/>').text(status));
      });
    },
    _onProcStatusDropdownChanged: function(e){
      var self = e.data.self,
        selected = $(this).val();
      if (selected !== self.procedureDefault){
        self.addFilter('Estado Procedimiento', selected, ['Estado Procedimiento']);
      } else {
        self.removeFilter('Estado Procedimiento');
      }
      self.filter();
    },
    _onAdmStatusDropdownChanged: function(e){
      debugger;
      var self = e.data.self,
        selected = $(this).val();
      if (selected !== self.adminDefault){
        self.addFilter('Estado Adm.', selected, ['Estado Adm.']);
      } else {
        self.removeFilter('Estado Adm.');
      }
      self.filter();
    },
    draw: function(){
      this._super();
      var status = this.find('Estado Procedimiento');
      if (status instanceof FooTable.Filter){
        this.$procStatus.val(status.query.val());
      } else {
        this.$procStatus.val(this.procedureDefault);
      }

      var status = this.find('Estado Adm.');
      if (status instanceof FooTable.Filter){
        this.$admStatus.val(status.query.val());
      } else {
        this.$admStatus.val(this.adminDefault);
      }
    }
  });

  FooTable.init('.cases-by-rut-table', {
    columns: [
      {"name":"RIT","title":"RIT"},
      {"name":"RUC","title":"RUC"},
      {"name":"Nombre","title":"Nombre"},
      {"name":"Tribunal","title":"Tribunal"},
      {"name":"Fecha Ingreso","title":"Fecha Ingreso", "type":"date", "formatString":"DD/MM/YYYY"},
      {"name":"Procedimiento","title":"Procedimiento"},
      {"name":"Forma Inicio","title":"Forma Inicio"},
      {"name":"Estado Adm.","title":"Estado Adm"},
      {"name":"Etapa","title":"Etapa"},
      {"name":"Estado Procedimiento","title":"Estado procedimiento"}],
    rows: casesJSON,
    components: {
      filtering: FooTable.StatesFiltering
    }
  });
});


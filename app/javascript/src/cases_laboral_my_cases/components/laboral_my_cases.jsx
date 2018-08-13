import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
window.jQuery = $;
require ('footable');

export default class LaboralMyCases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cases_number: 20,
      filterSearchField: '',
      est_adm_value: '',
      typeOfCause: '',
      search_type: 'rut',
      selectAll: true
    }
  }

  componentWillMount() {
    this.props.searchLaboralMyCases(this.state.cases_number, 0, this.props.selectedCases);
  }

  componentDidMount() {
    this.footableInterval = setInterval(() => {
      if (this.props.cases && this.props.cases.length > 0) {
        let filtering = jQuery(ReactDOM.findDOMNode(this.refs.productstable));
        let filteringStatus = jQuery(ReactDOM.findDOMNode(this.refs.filterstatus));
        // filtering.footable();
        // var filtering = $('#demo-foo-filtering');
        filtering.footable().on('footable_filtering', (e) => {
            var selected = filteringStatus.find(':selected').val();
            e.filter = selected;
            console.log(e);
            e.clear = !e.filter;
        });
        clearInterval(this.footableInterval);
        this.forceUpdate();
      }
    }, 100);
  }

  search = (type) => (e) => {
    e.preventDefault();
    this.setState({ search_type: type });
    this.props.clearCases();
    this.props.updateSearchType(type);
    this.props.searchLaboralMyCases(this.state.cases_number, 0, this.props.selectedCases);
  }

  updatePage = (e) => {
    e.preventDefault();
    let newPage = this.props.current_page + 1;
    this.props.updateCurrentPage(newPage);
    this.loadMore(newPage);
  }

  loadMore = (newPage) => {
    let offset = this.props.cases.length;
    this.props.searchLaboralMyCases(this.state.cases_number, offset, this.props.selectedCases);
  }

  filterSearchField = (e) => {
    this.setState({ filterSearchField: e.target.value });
  }

  selectorChange = (e) => {
    // e.preventDefault();
    // let filtering = jQuery(ReactDOM.findDOMNode(this.refs.productstable));
    // filtering.trigger('footable_filtering', { filter: e.target.value });
    
    // this.setState({ est_adm_value: e.target.value });
  }

  render() {
    const { est_adm_value, filterSearchField, typeOfCause, cases_number, selectAll } = this.state;
		return (
      <div id="wrapper">
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card-box">
                    <div className="table-responsive">
                      <div className="form-inline m-b-20">
                        <div className="row">
                          <div className="col-md-6 text-xs-center">
                            <div className="form-group">
                              <label className="control-label m-r-5">Status</label>
                              <select ref="filterstatus" className="form-control input-sm" onChange={this.selectorChange}>
                                <option value="">Show all</option>
                                <option value="Archivada">Archivada</option>
                                <option value="Sin archivar">Sin archivar</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6 text-center text-right">
                            <div className="form-group float-right">
                              <input id="demo-foo-search" type="text" placeholder="Search" className="form-control" autoComplete="on" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <table ref="productstable" id="demo-foo-filtering" className="table table-striped table-bordered toggle-circle m-b-0 footable" data-filter="#demo-foo-search" data-paging='true' data-filtering="true" data-sorting="true" data-paging-size="7">
                        <thead>
                          <tr>
                            <th data-toggle="true">Nombre Causa</th>
                            <th>RIT</th>
                            <th>RUC</th>
                            <th>Procedimiento</th>
                            <th>Fecha Ingreso</th>
                            <th>Inicio</th>
                            <th>Estado</th>
                            <th>Etapa</th>
                            <th>E.Proc</th>
                            <th>Tribunal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.cases.map((item, index) => {
                            let { case: item_case, rit, ruc, proc, f_ing, forma_inicio, est_adm, etapa, estado_proc, tribunal, inc_idx } = item.case;
                              return (
                                <tr key={inc_idx}>
                                  <td>{item_case}</td>
                                  <td>{rit}</td>
                                  <td>{ruc}</td>
                                  <td>{proc}</td>
                                  <td>{f_ing}</td>
                                  <td>{forma_inicio}</td>
                                  <td>{est_adm}</td>
                                  <td>{etapa}</td>
                                  <td>{estado_proc}</td>
                                  <td>{tribunal}</td>
                                </tr>
                              );   
                          })}
                        </tbody>
                        <tfoot>
                          <tr className="active">
                            <td colSpan="5">
                              <div className="text-right">
                                <ul className="pagination pagination-split justify-content-end footable-pagination m-t-10 m-b-0"></ul>
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
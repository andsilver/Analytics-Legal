import _ from 'lodash';
import React from 'react';

const cases_per_page = 100;

export default class RutSelection extends React.Component {
  search = (type) => (e) => {
    e.preventDefault();
    this.props.clearCases();
    this.props.updateSearchType(type);
    this.props.search(this.props.term, type, cases_per_page);
  }

  toggleSelect = (id) => (e) => {
    this.props.toggleSelect(id);
  }

  updatePage = (e) => {
    e.preventDefault();
    let newPage = this.props.current_page + 1;
    this.props.updateCurrentPage(newPage);
    this.loadMore(newPage);
  }

  loadMore = (newPage) => {
    let offset = newPage * cases_per_page;
    this.props.search(this.props.term, this.props.search_type, cases_per_page, offset);
  }

  updateTerm = (e) => {
    this.props.updateTerm(e.target.value);
  }

  saveUser = (e) => {
    this.props.saveUserId(e.target.value);
  }

  saveRuts = (e) => {
    e.preventDefault();
    const token = document.querySelector('meta[name=csrf-token]').getAttribute("content");
    const cases = this.props.selected.map(el => {
      return { crr_idcausa: el.case.crr_idcausa, crr_idcausa_type: 'laboral' }
    });
    this.props.saveRuts(this.props.user_id, cases, token);
    this.props.clearCases();
  }

  render() {
		return (
      <div className="container-fluid">
        <div className="row m-t-20">
          <div className="col-12">
            <div className="card-box">
              <h1>Laboral RUT Selection</h1>
              <div className="m-t-20">
                <form>
                  <div className="form-group row">
                    <div className="col-lg-4 col-sm-12">
                      <div className="input-group">
                        <select className='form-control' onChange={this.saveUser} value={this.props.user_id}>
                        <option key={ _.uniqueId() }>Elegir usuario</option>
                        { this.props.users_emails.map(el => {
                            return (<option value={el[1]} key={ _.uniqueId() }>{el[0]}</option>)
                          })
                        }
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-4 col-sm-12">
                      <div className="input-group">
                        <input className='form-control' placeholder='Ingrese RUT o Nombre' id='search-field'
                          onChange={this.updateTerm} />
                      </div>
                    </div>
                    <div className='m-r-10'>
                      <button type='button' onClick={this.search('rut')}
                        className='btn btn-primary waves-effect waves-light'>
                        Buscar por RUT
                      </button>
                    </div>
                    <div className='m-r-10'>
                      <button type='button' onClick={this.search('name')}
                        className='btn btn-primary waves-effect waves-light'>
                        Buscar por Nombre
                      </button>
                    </div>
                  </div>

                  { this.props.user_id !== 0 && this.props.cases.length > 0 &&
                    <div className="form-group row">
                      <div className="col-lg-4 col-sm-12">
                        <button type='button' onClick={this.saveRuts}
                          className='btn btn-primary waves-effect waves-light'>
                          Save RUTs
                        </button>
                      </div>
                    </div>
                  }
                </form>
              </div>
            </div>
          </div>
        </div>

        { this.props.cases.length > 0 &&
          <div className="row">
            <div className="col-12">
              <div className="card-box">
                <div className="table-responsive">
                  <table className="table m-t-20 table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th></th>
                        <th>CRR IDCAUSA</th>
                        <th>Nombre o razon social</th>
                        <th>RUT</th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.props.cases.map(el => {
                          let { crr_idcausa, nombre_o_razon_social, rut } = el.case;

                          return (
                            <tr key={ _.uniqueId() } className={ el.selected ? 'table-info' : '' }>
                              <td style={{'textAlign': 'center'}}>
                                <div className='checkbox checkbox-primary checkbox-single'>
                                  <input type="checkbox"
                                    onChange={this.toggleSelect(crr_idcausa)}
                                    checked={el.selected}
                                  />
                                  <label></label>
                                </div>
                              </td>
                              <td>{ crr_idcausa }</td>
                              <td>{ nombre_o_razon_social }</td>
                              <td>{ rut }</td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                  { this.props.hasMoreCases &&
                    <button type='button' onClick={this.updatePage}
                      className='btn btn-primary waves-effect waves-light'>
                      Load more results
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
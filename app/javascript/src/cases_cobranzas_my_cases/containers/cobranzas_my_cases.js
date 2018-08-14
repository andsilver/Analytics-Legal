import { connect } from 'react-redux';
import Component from '../components/cobranzas_my_cases';
import * as actionCreators from '../actions';

const casesToProps = ({ data }) => {
  const props = {
    schema: data['schema'],
    cases: data['cases'],
    current_page: data['current_page'],
    search_type: data['search_type'],
    term: data['term'],
    hasMoreCases: data['hasMoreCases'],
    user_id: data['user_id'],
    selected: data['selected'],
    total: data['total'],
    took_time: data['took_time']
  }
  return props;
};

const Container = connect(
  casesToProps,
  actionCreators,
)(Component);

export default Container;
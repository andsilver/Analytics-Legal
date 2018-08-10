import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const searchState = handleActions({
  [actions.searchRequest]() {
    return 'requested';
  },
  [actions.searchSuccess]() {
    return 'successed';
  },
  [actions.searchFailure]() {
    return 'failed';
  },
}, 'none');

const initialCasesState = { schema: ['CLIENT_ID', 'CAUSA_ID', 'CAUSA_TYPE'],
                            cases: [],
                            current_page: 0,
                            search_type: '',
                            term: '',
                            hasMoreCases: false,
                            user_id: 0,
                            selected: [],
                            total: 0 };

const data = handleActions({
  [actions.searchSuccess](state, { payload: { data } }) {
    const newCases = data.map(el => ({ case: el['_source'], selected: true }));
    const selected = newCases.filter(el => el.selected == true);
    return { ...state, cases: state['cases'].concat(newCases),
                       selected: state['selected'].concat(selected)
           };
  },
  [actions.toggleSelect](state, { payload: id }) {
    const newCases = state.cases.map(el => {
      if (el.case['inc_idx'] == id) {
        return { ...el, selected: !el.selected };
      }
      else {
        return el;
      }
    });
    const selected = newCases.filter(el => el.selected == true);
    return { ...state, cases: newCases, selected: selected };
  },
  [actions.toggleSelectAll](state, { payload: selectedFlag }) {
    const newCases = state.cases.map(el => {
      return { ...el, selected: selectedFlag };
    });
    const selected = newCases.filter(el => el.selected == true);
    return { ...state, cases: newCases, selected: selected };
  },
  [actions.updateCurrentPage](state, { payload: page }) {
    return {...state, current_page: page }
  },
  [actions.updateSearchType](state, { payload: type }) {
    return {...state, search_type: type }
  },
  [actions.clearCases](state) {
    return { ...state, cases: [], selected: [] }
  },
  [actions.updateTerm](state, { payload: term }) {
    return { ...state, term: term }
  },
  [actions.updatePagination](state, { payload: hasMoreCases }) {
    return { ...state, hasMoreCases: hasMoreCases }
  },
  [actions.saveUserId](state, { payload: id }) {
    return { ...state, user_id: id }
  },
  [actions.saveTotal](state, { payload: total }) {
    return { ...state, total: total }
  }
}, initialCasesState);

export default combineReducers({
  searchState,
  data
});
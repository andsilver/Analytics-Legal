import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const searchState = handleActions({
  [actions.searchRequestCobranzasMyCases]() {
    return 'requestedCobranzasMyCases';
  },
  [actions.searchSuccessCobranzasMyCases]() {
    return 'successedCobranzasMyCases';
  },
  [actions.searchFailureCobranzasMyCases]() {
    return 'failedCobranzasMyCases';
  },
}, 'none');

const initialCasesState = { schema: ['CLIENT_ID', 'CAUSA_ID', 'CAUSA_TYPE'],
                            cases: [],
                            current_page: 0,
                            search_type: '',
                            took_time: 0,
                            term: '',
                            hasMoreCases: false,
                            user_id: 0,
                            selected: [],
                            total: 0 };

const data = handleActions({
  [actions.searchSuccessCobranzasMyCases](state, { payload: { data } }) {
    const newCases = data.map(el => ({ case: el['_source'], selected: true }));
    const selected = newCases.filter(el => el.selected == true);
    return { ...state, cases: state['cases'].concat(newCases),
                       selected: state['selected'].concat(selected)
           };
  },
  [actions.toggleSelectCobranzasMyCases](state, { payload: id }) {
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
  [actions.toggleSelectAllCobranzasMyCases](state, { payload: selectedFlag }) {
    const newCases = state.cases.map(el => {
      return { ...el, selected: selectedFlag };
    });
    const selected = newCases.filter(el => el.selected == true);
    return { ...state, cases: newCases, selected: selected };
  },
  [actions.updateCurrentPageCobranzasMyCases](state, { payload: page }) {
    return {...state, current_page: page }
  },
  [actions.updateSearchTypeCobranzasMyCases](state, { payload: type }) {
    return {...state, search_type: type }
  },
  [actions.clearCasesCobranzasMyCases](state) {
    return { ...state, cases: [], selected: [] }
  },
  [actions.updateTermCobranzasMyCases](state, { payload: term }) {
    return { ...state, term: term }
  },
  [actions.updatePaginationCobranzasMyCases](state, { payload: hasMoreCases }) {
    return { ...state, hasMoreCases: hasMoreCases }
  },
  [actions.saveUserIdCobranzasMyCases](state, { payload: id }) {
    return { ...state, user_id: id }
  },
  [actions.saveTotalCobranzasMyCases](state, { payload: total }) {
    return { ...state, total: total }
  },
  [actions.saveTookTimeCobranzasMyCases](state, { payload: took_time }) {
    return { ...state, took_time }
  }
}, initialCasesState);

export default combineReducers({
  searchState,
  data
});
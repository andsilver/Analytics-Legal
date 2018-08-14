import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const searchState = handleActions({
  [actions.searchRequestCivilMyCases]() {
    return 'requestedCivilMyCases';
  },
  [actions.searchSuccessCivilMyCases]() {
    return 'successedCivilMyCases';
  },
  [actions.searchFailureCivilMyCases]() {
    return 'failedCivilMyCases';
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
  [actions.searchSuccessCivilMyCases](state, { payload: { data } }) {
    const newCases = data.map(el => ({ case: el['_source'], selected: true }));
    const selected = newCases.filter(el => el.selected == true);
    return { ...state, cases: state['cases'].concat(newCases),
                       selected: state['selected'].concat(selected)
           };
  },
  [actions.toggleSelectCivilMyCases](state, { payload: id }) {
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
  [actions.toggleSelectAllCivilMyCases](state, { payload: selectedFlag }) {
    const newCases = state.cases.map(el => {
      return { ...el, selected: selectedFlag };
    });
    const selected = newCases.filter(el => el.selected == true);
    return { ...state, cases: newCases, selected: selected };
  },
  [actions.updateCurrentPageCivilMyCases](state, { payload: page }) {
    return {...state, current_page: page }
  },
  [actions.updateSearchTypeCivilMyCases](state, { payload: type }) {
    return {...state, search_type: type }
  },
  [actions.clearCasesCivilMyCases](state) {
    return { ...state, cases: [], selected: [] }
  },
  [actions.updateTermCivilMyCases](state, { payload: term }) {
    return { ...state, term: term }
  },
  [actions.updatePaginationCivilMyCases](state, { payload: hasMoreCases }) {
    return { ...state, hasMoreCases: hasMoreCases }
  },
  [actions.saveUserIdCivilMyCases](state, { payload: id }) {
    return { ...state, user_id: id }
  },
  [actions.saveTotalCivilMyCases](state, { payload: total }) {
    return { ...state, total: total }
  },
  [actions.saveTookTimeCivilMyCases](state, { payload: took_time }) {
    return { ...state, took_time }
  }
}, initialCasesState);

export default combineReducers({
  searchState,
  data
});
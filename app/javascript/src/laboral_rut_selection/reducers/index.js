import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const searchState = handleActions({
  [actions.searchRequest]() {
    return 'requested';
  },
  [actions.searchSuccess]() {
    return 'failed';
  },
  [actions.searchFailure]() {
    return 'successed';
  },
}, 'none');

const initialCasesState = { schema: [],
                            cases: [],
                            current_page: 0,
                            search_type: '',
                            term: '',
                            hasMoreCases: false,
                            user_id: 0 };

const data = handleActions({
  [actions.searchSuccess](state, { payload: { schema, data } }) {
    const newSchema = schema.map(el => el.name);
    const newCases = data.map(el => ({ case: el, selected: true }));
		return { ...state, schema: newSchema, cases: state['cases'].concat(newCases) };
  },
  [actions.toggleSelect](state, { payload: id }) {
    const newCases = state.cases.map(el => {
      if (el.case[0] == id) {
        return { ...el, selected: !el.selected };
      }
      else {
        return el;
      }
    });
    return { ...state, cases: newCases };
  },
  [actions.updateCurrentPage](state, { payload: page }) {
    return {...state, current_page: page }
  },
  [actions.updateSearchType](state, { payload: type }) {
    return {...state, search_type: type }
  },
  [actions.clearCases](state) {
    return { ...state, cases: [] }
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
}, initialCasesState);

export default combineReducers({
  searchState,
  data
});
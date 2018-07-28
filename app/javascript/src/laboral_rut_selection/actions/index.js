import fetchJsonp from 'fetch-jsonp';
import { createAction } from 'redux-actions';

export const searchRequest = createAction('SEARCH_REQUEST');
export const searchSuccess = createAction('SEARCH_SUCCESS');
export const searchFailure = createAction('SEARCH_FAILURE');

export const toggleSelect = createAction('TOGGLE_SELECT');

export const updateCurrentPage = createAction('UPDATE_CURRENT_PAGE');

export const updateSearchType = createAction('UPDATE_SEARCH_TYPE');

export const clearCases = createAction('CLEAR_DATA');

export const updateTerm = createAction('UPDATE_TERM');

export const updatePagination = createAction('UPDATE_PAGINATION');

export const saveUserId = createAction('SAVE_USER');

const hasMoreCases = (res, cases_per_page) => {
  if (res.data.length > cases_per_page) {
    return { ...res, data: res.data.slice(0, -1) }
  }
  return res;
}

export const search = (term, type, cases_per_page, offset = 0) => async (dispatch) => {
  const getSearchURL = (type, term, cases_per_page, offset) => {
    const baseURL = `http://voltdb.deeplegal.ai:8080/api/1.0?Procedure=laboral_search_by_${type}`;
    const encodedParams = encodeURI(`[%${term}%,${cases_per_page + 1},${offset}]`);
    return `${baseURL}&Parameters=${encodedParams}`;
  }

  dispatch(searchRequest());

  try {
    const httpResponse = await fetchJsonp(getSearchURL(type, term, cases_per_page, offset), {
      jsonpCallback: 'jsonp',
      timeout: 15000
    });
    const response = await httpResponse.json();
    dispatch(updatePagination(response.results[0].data.length > cases_per_page));
    dispatch(searchSuccess(hasMoreCases(response.results[0], cases_per_page)));
  } catch (e) {
    console.log(e);
    dispatch(searchFailure());
  }
};
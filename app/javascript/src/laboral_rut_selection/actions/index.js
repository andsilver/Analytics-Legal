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

export const saveTotal = createAction('SAVE_TOTAL');

export const saveRutsRequest = createAction('SAVE_RUTS_REQUEST');
export const saveRutsSuccess = createAction('SAVE_RUTS_SUCCESS');
export const saveRutsFailure = createAction('SAVE_RUTS_FAILURE');

const hasMoreCases = (res, cases_per_page) => {
  if (res.length > cases_per_page) {
    return { data: res.slice(0, -1) }
  }
  return { data: res };
}

export const search = (term, type, cases_per_page, offset = 0) => async (dispatch) => {
  const getSearchURL = (type, term, cases_per_page, offset) => {
    const baseURL = `http://35.237.222.159:9200/laboral/litigantes/_search?q=${type}`;
    const encodedParams = `${term}&from=${offset}&size=${cases_per_page + 1}&sort=inc_idx:asc&pretty`;
    return `${baseURL}:${encodedParams}`;
  }

  dispatch(searchRequest());

  const myHeaders = new Headers({
    "Origin": "http://example.com",
    "User-Agent": "Mozilla",
    "Content-Type": "application/json"
  });

  try {
    const httpResponse = await fetch(getSearchURL(type, term, cases_per_page, offset), {
      headers: myHeaders
    });
    const response = await httpResponse.json();
    dispatch(updatePagination(response.hits.total > cases_per_page));
    dispatch(saveTotal(response.hits.total));
    dispatch(searchSuccess(hasMoreCases(response.hits.hits, cases_per_page)));
  } catch (e) {
    console.log(e);
    dispatch(searchFailure());
  }
};

export const saveRuts = (user_id, cases, token) => async (dispatch) => {
  const postUrl = '/selected_cases/batch_create';
  dispatch(saveRutsRequest());

  try {
    const postRequest = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ cases: cases, user_id: user_id }),
      credentials: 'same-origin'
    });
    dispatch(saveRutsSuccess())
  } catch (e) {
    console.log(e);
    dispatch(saveRutsFailure());
  }
}
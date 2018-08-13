import { createAction } from 'redux-actions';

export const searchRequestCivilMyCases = createAction('SEARCH_REQUEST_CIVIL_MY_CASES');
export const searchSuccessCivilMyCases = createAction('SEARCH_SUCCESS_CIVIL_MY_CASES');
export const searchFailureCivilMyCases = createAction('SEARCH_FAILURE_CIVIL_MY_CASES');

export const toggleSelectCivilMyCases = createAction('TOGGLE_SELECT_CIVIL_MY_CASES');
export const toggleSelectAllCivilMyCases = createAction('TOGGLE_SELECT_ALL_CIVIL_MY_CASES');

export const updateCurrentPageCivilMyCases = createAction('UPDATE_CURRENT_PAGE_CIVIL_MY_CASES');

export const updateSearchTypeCivilMyCases = createAction('UPDATE_SEARCH_TYPE_CIVIL_MY_CASES');

export const clearCasesCivilMyCases = createAction('CLEAR_DATA_CIVIL_MY_CASES');

export const updateTermCivilMyCases = createAction('UPDATE_TERM_CIVIL_MY_CASES');

export const updatePaginationCivilMyCases = createAction('UPDATE_PAGINATION_CIVIL_MY_CASES');

export const saveUserIdCivilMyCases = createAction('SAVE_USER_CIVIL_MY_CASES');

export const saveTotalCivilMyCases = createAction('SAVE_TOTAL_CIVIL_MY_CASES');

export const saveTookTimeCivilMyCases = createAction('SAVE_TOOK_TIME_CIVIL_MY_CASES');

const hasMoreCases = (res, cases_per_page) => {
  if (res.length > cases_per_page) {
    return { data: res.slice(0, -1) }
  }
  return { data: res };
}

export const searchCivilMyCases = (cases_per_page, offset = 0, selectedIdCausas) => async (dispatch) => {
  const getSearchURL = (cases_per_page, offset) => {
    const baseURL = `http://35.237.222.159:9200/civil/primal_data/_search`;
    return `${baseURL}`;
  }

  dispatch(searchRequestCivilMyCases());

  const myHeaders = new Headers({
    "Origin": "http://example.com",
    "User-Agent": "Mozilla",
    "Content-Type": "application/json"
  });

  try {
    const httpResponse = await fetch(getSearchURL(cases_per_page, offset), {
      headers: myHeaders,
      body: JSON.stringify({
        "sort": [
          { "inc_idx": "asc" }
        ],
        "query": { "terms": { "url": Array.from(new Set(selectedIdCausas)) } },
        "size": cases_per_page,
        "from": offset
      }),
      method: 'POST'
    });
    
    const response = await httpResponse.json();
    dispatch(updatePaginationCivilMyCases(response.hits.total > cases_per_page));
    dispatch(saveTotalCivilMyCases(response.hits.total));
    dispatch(saveTookTimeCivilMyCases(response.took));
    dispatch(searchSuccessCivilMyCases(hasMoreCases(response.hits.hits, cases_per_page)));
  } catch (e) {
    console.log(e);
    dispatch(searchFailureCivilMyCases());
  }
};

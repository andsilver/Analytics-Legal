import { createAction } from 'redux-actions';

export const searchRequestLaboralMyCases = createAction('SEARCH_REQUEST_LABORAL_MY_CASES');
export const searchSuccessLaboralMyCases = createAction('SEARCH_SUCCESS_LABORAL_MY_CASES');
export const searchFailureLaboralMyCases = createAction('SEARCH_FAILURE_LABORAL_MY_CASES');

export const toggleSelectLaboralMyCases = createAction('TOGGLE_SELECT_LABORAL_MY_CASES');
export const toggleSelectAllLaboralMyCases = createAction('TOGGLE_SELECT_ALL_LABORAL_MY_CASES');

export const updateCurrentPageLaboralMyCases = createAction('UPDATE_CURRENT_PAGE_LABORAL_MY_CASES');

export const updateSearchTypeLaboralMyCases = createAction('UPDATE_SEARCH_TYPE_LABORAL_MY_CASES');

export const clearCasesLaboralMyCases = createAction('CLEAR_DATA_LABORAL_MY_CASES');

export const updateTermLaboralMyCases = createAction('UPDATE_TERM_LABORAL_MY_CASES');

export const updatePaginationLaboralMyCases = createAction('UPDATE_PAGINATION_LABORAL_MY_CASES');

export const saveUserIdLaboralMyCases = createAction('SAVE_USER_LABORAL_MY_CASES');

export const saveTotalLaboralMyCases = createAction('SAVE_TOTAL_LABORAL_MY_CASES');

export const saveTookTimeLaboralMyCases = createAction('SAVE_TOOK_TIME_LABORAL_MY_CASES');

const hasMoreCases = (res, cases_per_page) => {
  if (res.length > cases_per_page) {
    return { data: res.slice(0, -1) }
  }
  return { data: res };
}

export const searchLaboralMyCases = (cases_per_page, offset = 0, selectedIdCausas) => async (dispatch) => {
  const getSearchURL = (cases_per_page, offset) => {
    const baseURL = `http://35.237.222.159:9200/laboral/court_cases/_search`;
    return `${baseURL}`;
  }

  dispatch(searchRequestLaboralMyCases());

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
        "query": { "terms": { "crr_idcausa": selectedIdCausas } },
        "size": cases_per_page,
        "from": offset
      }),
      method: 'POST'
    });
    const response = await httpResponse.json();
    dispatch(updatePaginationLaboralMyCases(response.hits.total > cases_per_page));
    dispatch(saveTotalLaboralMyCases(response.hits.total));
    dispatch(saveTookTimeLaboralMyCases(response.took));
    dispatch(searchSuccessLaboralMyCases(hasMoreCases(response.hits.hits, cases_per_page)));
  } catch (e) {
    console.log(e);
    dispatch(searchFailureLaboralMyCases());
  }
};

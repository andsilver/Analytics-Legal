import { createAction } from 'redux-actions';

export const searchRequestCobranzasMyCases = createAction('SEARCH_REQUEST_COBRANZAS_MY_CASES');
export const searchSuccessCobranzasMyCases = createAction('SEARCH_SUCCESS_COBRANZAS_MY_CASES');
export const searchFailureCobranzasMyCases = createAction('SEARCH_FAILURE_COBRANZAS_MY_CASES');

export const toggleSelectCobranzasMyCases = createAction('TOGGLE_SELECT_COBRANZAS_MY_CASES');
export const toggleSelectAllCobranzasMyCases = createAction('TOGGLE_SELECT_ALL_COBRANZAS_MY_CASES');

export const updateCurrentPageCobranzasMyCases = createAction('UPDATE_CURRENT_PAGE_COBRANZAS_MY_CASES');

export const updateSearchTypeCobranzasMyCases = createAction('UPDATE_SEARCH_TYPE_COBRANZAS_MY_CASES');

export const clearCasesCobranzasMyCases = createAction('CLEAR_DATA_COBRANZAS_MY_CASES');

export const updateTermCobranzasMyCases = createAction('UPDATE_TERM_COBRANZAS_MY_CASES');

export const updatePaginationCobranzasMyCases = createAction('UPDATE_PAGINATION_COBRANZAS_MY_CASES');

export const saveUserIdCobranzasMyCases = createAction('SAVE_USER_COBRANZAS_MY_CASES');

export const saveTotalCobranzasMyCases = createAction('SAVE_TOTAL_COBRANZAS_MY_CASES');

export const saveTookTimeCobranzasMyCases = createAction('SAVE_TOOK_TIME_COBRANZAS_MY_CASES');

const hasMoreCases = (res, cases_per_page) => {
  if (res.length > cases_per_page) {
    return { data: res.slice(0, -1) }
  }
  return { data: res };
}

export const searchCobranzasMyCases = (cases_per_page, offset = 0, selectedIdCausas) => async (dispatch) => {
  const getSearchURL = (cases_per_page, offset) => {
    const baseURL = `http://35.237.222.159:9200/cobranza/primal_data/_search`;
    return `${baseURL}`;
  }

  dispatch(searchRequestCobranzasMyCases());

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
        "query": { "terms": { "crr_idcausa": Array.from(new Set(selectedIdCausas)) } },
        "size": cases_per_page,
        "from": offset
      }),
      method: 'POST'
    });
    
    const response = await httpResponse.json();
    console.log(response);
    dispatch(updatePaginationCobranzasMyCases(response.hits.total > cases_per_page));
    dispatch(saveTotalCobranzasMyCases(response.hits.total));
    dispatch(saveTookTimeCobranzasMyCases(response.took));
    dispatch(searchSuccessCobranzasMyCases(hasMoreCases(response.hits.hits, cases_per_page)));
  } catch (e) {
    console.log(e);
    dispatch(searchFailureCobranzasMyCases());
  }
};

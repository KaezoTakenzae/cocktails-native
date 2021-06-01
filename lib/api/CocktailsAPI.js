import api from './API';

const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';
/**
 * CocktailsAPI Class, making calls via the API class
**/
class CocktailsAPI {
  /**
   * Search for cocktails by name
   *
   * @param searchTerm
   * @returns {Promise<Response | never>}
  **/
  searchByName(searchTerm) {
    return api.requestGet(`${baseUrl}/search.php?s=${searchTerm}`);
  }

  /**
   * Search for cocktails by ingredient name
   *
   * @param searchTerm
   * @returns {Promise<Response | never>}
  **/
  searchByIngredient(searchTerm) {
    return api.requestGet(`${baseUrl}/search.php?i=${searchTerm}`);
  }

  /**
   * Get a specific cocktail by ID
   *
   * @param id
   * @returns {Promise<Response | never>}
  **/
  getCocktailById(id) {
    return api.requestGet(`${baseUrl}/lookup.php?i=${id}`);
  }

  /**
   * Get a specific ingredient by ID
   *
   * @param id
   * @returns {Promise<Response | never>}
  **/
  getIngredientById(id) {
    return api.requestGet(`${baseUrl}/lookup.php?iid=${id}`);
  }

  /**
   * Get details for a cocktail at random
   *
   * @returns {Promise<Response | never>}
  **/
  getRandomCocktail() {
    return api.requestGet(`${baseUrl}/random.php`);
  }

  /**
   * Filter by ingredient name
   *
   * @param ingredient
   * @returns {Promise<Response | never>}
  **/
  filterByIngredient(ingredient) {
    return api.requestGet(`${baseUrl}/filter.php?i=${ingredient}`);
  }

  /**
   * Filter by alcoholic or non alcoholic, with true being alcoholic
   *
   * @param alcoholic
   * @returns {Promise<Response | never>}
  **/
  filterByAlcoholic(alcoholic) {
    return api.requestGet(`${baseUrl}/filter.php?a=${alcoholic}`);
  }

  /**
   * Filter by category
   *
   * @param category
   * @returns {Promise<Response | never>}
  **/
  filterByCategory(category) {
    return api.requestGet(`${baseUrl}/filter.php?c=${category}`);
  }

  /**
   * Filter by category
   *
   * @param glassType
   * @returns {Promise<Response | never>}
  **/
  filterByGlass(glassType) {
    return api.requestGet(`${baseUrl}/filter.php?g=${glassType}`);
  }

  /**
   * Get list of categories
   *
   * @returns {Promise<Response | never>}
  **/
  getCategories() {
    return api.requestGet(`${baseUrl}/list.php?c=list`);
  }

  /**
   * Get list of glasses
   *
   * @returns {Promise<Response | never>}
  **/
  getGlasses() {
    return api.requestGet(`${baseUrl}/list.php?g=list`);
  }

  /**
   * Get list of ingredients
   *
   * @returns {Promise<Response | never>}
  **/
  getIngredients() {
    return api.requestGet(`${baseUrl}/list.php?i=list`);
  }

  /**
   * Get list of alcoholic filters
   *
   * @returns {Promise<Response | never>}
  **/
  getAlcoholicFilters() {
    return api.requestGet(`${baseUrl}/list.php?a=list`);
  }

  /**
    * Abort request
    *
    *
  **/
  abortRequest() {
    api.abortRequest();
  }
}

export default new CocktailsAPI();

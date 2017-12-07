/** *******************************
 *  SAGAS HELPERS
 */

/**
 * Transform the JWT payload into plain object
 * @param {*The token response JWT format} response
 */
export const formatTokenResponse = (response) => {
  // Splice the JWT token response in 3, then get the payload that contains the user's informations into plain Object.
  const user = JSON.parse(atob(response.response.split('.')[1]));
  user.token = response.response;
  return user;
};

  /**
   * Set the user in sessionStorage
   * @param {*User plain object} user
   */
export const addUserToLocalStorage = (user) => {
  for (let key in user) {
    if (user.hasOwnProperty(key)) {
      self.sessionStorage.setItem(key, user[key]);
    }
  }
};

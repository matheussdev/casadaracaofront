export const TOKEN_KEY = '@casa-daracao-Token'
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setLogin = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
  // window.location.reload()
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.clear()
  window.location.reload()
}

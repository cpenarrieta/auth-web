let accessToken = ''

export const setAccessToken = (str) => {
  accessToken = str
}

export const getAccessToken = () => {
  return accessToken
}
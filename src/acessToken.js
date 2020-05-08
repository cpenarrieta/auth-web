let accessToken = "";

export const setAccessToken = (str, client) => {
  client.setHeader("authorization", `Bearer ${str}`);
  accessToken = str;
};

export const getAccessToken = () => {
  return accessToken;
};

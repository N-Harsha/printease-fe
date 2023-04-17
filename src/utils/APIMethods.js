const errorResponses = [400, 401, 403, 404, 500, 415];

async function checkError(response) {
  if (errorResponses.includes(response.status)) {
    throw await response.json();
  }
  return response;
}
const generateHeaders = (authConfig, requestHeaders, isFormData) => {
  const headers = new Headers();
  if (authConfig) {
    headers.append("Authorization", `Bearer ${authConfig.token}`);
  }
  if (!isFormData) {
    headers.append("Content-Type", "application/json");
  }

  Object.keys(headers).forEach((key) =>
    headers.append(key, requestHeaders[key])
  );
  return headers;
};
export const api = async (
  {
    url = "",
    method = "GET",
    requestHeaders = {},
    params,
    body = null,
    isFormData = false,
  },
  authConfig
) => {
  const headers = generateHeaders(authConfig, requestHeaders, isFormData);
  const paramString = new URLSearchParams(params).toString();
  const requestURL = params ? `${url}?${paramString}` : url;
  let requestObject = { headers, method };
  if (body) {
    requestObject = {
      ...requestObject,
      body: isFormData ? body : JSON.stringify(body),
    };
  }

  return fetch(requestURL, requestObject)
    .then(checkError)
    .then((response) => response.json());
};

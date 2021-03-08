export const apiGetUsers = () => {
  let urlFetch = `http://localhost:5000/users`
  return apiCall(urlFetch, 'GET');
};

export const apiPostUser = (user: any) => {
  let urlFetch = `http://localhost:5000/user`
  let body = JSON.stringify(user)
  return apiCall(urlFetch, 'POST', body);
};

export const apiPutUser = (userData: { id: any; }) => {
  let urlFetch = `http://localhost:5000/user/${userData.id}`
  let body = JSON.stringify(userData)
  return apiCall(urlFetch, 'PUT', body);
};

export const apiGetRightsEnumeration = () => {
  let urlFetch = `http://localhost:5000/user/rights_enumeration`
  return apiCall(urlFetch, 'GET');
};

export const apiCall = async (url: RequestInfo, method: string, body?: string | undefined) => {
  const headers: { [x: string]: string; } = {};
  headers['Content-Type'] = 'application/json'
  let response = await fetch(url, { method: method, headers: headers, credentials: 'same-origin', body: body })
  return await response.json()
}


export const apiGetClients = () => {
  let urlFetch = `http://localhost:5000/clients`
  return apiCall(urlFetch, 'GET');
}

export const apiPutClient = (clientData: { id: any; active:boolean }) => {
  let urlFetch = `http://localhost:5000/client/${clientData.id}`
  let body = JSON.stringify(clientData)
  return apiCall(urlFetch, 'PUT', body);
};

export default {
  get<T>(url: string): Promise<T> {
    return fetch(url).then((response) => response.json());
  },

  post<T>(url: string, body?: any): Promise<T> {
    return fetch(url, {
      method: 'POST',
      ...(body
        ? {
            body: JSON.stringify(body),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
          }
        : {}),
    }).then((response) => response.json());
  },
};

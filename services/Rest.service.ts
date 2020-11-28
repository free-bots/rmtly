import {ConfigService} from './Config.service';

export default {
  get<T>(url: string, json: boolean = true): Promise<T> {
    return fetch(url, {
      headers: this.headersConfig(),
    }).then((response) => {
      if (json) {
        return response.json();
      }
      return null;
    });
  },

  post<T>(url: string, body?: any): Promise<T> {
    return fetch(url, {
      method: 'POST',
      ...(body
        ? {
            body: JSON.stringify(body),
            headers: this.headersConfig(),
          }
        : {}),
    }).then((response) => response.json());
  },

  headersConfig(headers?: Headers): Headers {
    const token = ConfigService.getToken();
    const defaultHeaders = new Headers();
    defaultHeaders.set('Content-type', 'application/json; charset=UTF-8');
    if (token) {
      defaultHeaders.set('Authorization', `Bearer ${token}`);
    }
    return defaultHeaders;
  },
};

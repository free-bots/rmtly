export interface RestInterceptor {
  code: number;
  callback: () => void;
}

class _RestService {
  private static instance: _RestService;

  private interceptors: RestInterceptor[] = [];

  public get<T>(url: string, json: boolean = true, token?: string): Promise<T> {
    return fetch(url, {
      headers: this.headersConfig(token),
    }).then((response) => {
      this.handleInterceptors(response.status);
      if (response.ok && json) {
        return response.json();
      }
      return null;
    });
  }

  public post<T>(url: string, body?: any, token?: string): Promise<T> {
    return fetch(url, {
      method: 'POST',
      ...(body
        ? {
            body: JSON.stringify(body),
            headers: this.headersConfig(token),
          }
        : {}),
    }).then((response) => {
      this.handleInterceptors(response.status);
      return response.ok ? response.json() : null;
    });
  }

  public headersConfig(token?: string, headers?: Headers): Headers {
    const defaultHeaders = new Headers(headers);
    defaultHeaders.set('Content-type', 'application/json; charset=UTF-8');
    if (token) {
      defaultHeaders.set('Authorization', `Bearer ${token}`);
    }
    return defaultHeaders;
  }

  public addInterceptor(interceptor: RestInterceptor) {
    this.interceptors.push(interceptor);
  }

  public static getInstance(): _RestService {
    if (!this.instance) {
      this.instance = new _RestService();
    }
    return this.instance;
  }

  private handleInterceptors(code: number) {
    this.interceptors
      .filter((interceptor) => interceptor.code === code)
      .forEach((interceptor) => {
        try {
          interceptor.callback();
        } catch (error) {
          console.error(error);
        }
      });
  }
}

export const RestService = _RestService.getInstance();

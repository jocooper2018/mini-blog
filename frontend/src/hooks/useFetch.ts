function useFetch() {
  type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS';

  const callApi = async (
    method: HttpMethod,
    route: string,
    data?: Record<string, any>,
  ): Promise<Response | false> => {
    try {
      const headers = new Headers();
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');

      const requestOptions = {
        method: method,
        headers: headers,
        credentials: 'include' as RequestCredentials,
        ...(data ? { body: JSON.stringify(data) } : {}),
      };

      const url: string = `${import.meta.env.VITE_API_BASE_URL}${route}`;

      return await fetch(url, requestOptions);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    get: (route: string): Promise<Response | false> => callApi('GET', route),
    post: (
      route: string,
      data: Record<string, any>,
    ): Promise<Response | false> => callApi('POST', route, data),
    put: (
      route: string,
      data: Record<string, any>,
    ): Promise<Response | false> => callApi('PUT', route, data),
    patch: (
      route: string,
      data: Record<string, any>,
    ): Promise<Response | false> => callApi('PATCH', route, data),
    delete: (
      route: string,
      data: Record<string, any>,
    ): Promise<Response | false> => callApi('DELETE', route, data),
  };
}

export default useFetch;

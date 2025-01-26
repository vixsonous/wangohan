export interface BasicResponse<T> {
  message: string;
  status: number;
  data: T;
}

export class ApiService {
  private static instance: ApiService;

  public static getInstance(): ApiService {
    return this.instance ? this.instance : new ApiService();
  }

  public static async get<T>(endpoint: string): Promise<BasicResponse<T>> {
    return (await fetch(endpoint).then((res) =>
      res.json()
    )) as BasicResponse<T>;
  }

  public static async post<T, U extends { method: "POST" }>(
    endpoint: string,
    body: U
  ): Promise<BasicResponse<T>> {
    return (await fetch(endpoint, body).then((res) =>
      res.json()
    )) as BasicResponse<T>;
  }

  public static async patch<T, U extends { method: "PATCH" }>(
    endpoint: string,
    body: U
  ): Promise<BasicResponse<T>> {
    return (await fetch(endpoint, body).then((res) =>
      res.json()
    )) as BasicResponse<T>;
  }

  public static async delete<T, U extends { method: "DELETE" }>(
    endpoint: string,
    body: U
  ): Promise<BasicResponse<T>> {
    return (await fetch(endpoint, body).then((res) =>
      res.json()
    )) as BasicResponse<T>;
  }
}

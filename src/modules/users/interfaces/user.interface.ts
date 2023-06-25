export interface IUserPayload {
  userId: number;
  email: string;
  role: string;
}

export interface ILoginResponse {
  token: string;
}

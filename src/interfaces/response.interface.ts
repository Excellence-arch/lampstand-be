export interface DefaultResponse {
  message: string;
}

export interface LoginResponse extends DefaultResponse {
  token: string;
}

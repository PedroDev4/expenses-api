export interface JwtUserPayload {
  sub: string;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}

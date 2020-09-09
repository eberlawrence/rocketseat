interface JwtProps {
  exp: number;
  iat: number;
  nameid: string;
  nbf: number;
  [key: string]: any;
}

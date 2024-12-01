import { User } from "firebase/auth";

export interface GoogleUser {
  Ca: string;
  xc: Xc;
  wt: Wt;
}

export interface Xc {
  token_type: string;
  access_token: string;
  scope: string;
  login_hint: string;
  expires_in: number;
  id_token: string;
  session_state: SessionState;
  first_issued_at: number;
  expires_at: number;
  idpId: string;
}

export interface SessionState {
  extraQueryParams: ExtraQueryParams;
}

export interface ExtraQueryParams {
  authuser: string;
}

export interface Wt {
  NT: string;
  Ad: string;
  rV: string;
  uT: string;
  hK: string;
  cu: string;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Session {
  isEmailUser: boolean;
  isGoogleUser: boolean;
  user: User | null;
  ready: boolean;
  token?: string;
  userLoggedIn: boolean;
}

import {Role} from "./role";

export interface JwtResponse {
  id? : number;
  username? : string;
  token? : string;
  roleSet? : any;
}

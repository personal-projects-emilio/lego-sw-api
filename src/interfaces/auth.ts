import { JwtPayload } from "jsonwebtoken";

export interface JWTToken extends JwtPayload {
  id: string;
}
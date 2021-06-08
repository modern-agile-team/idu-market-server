import Auth from "../models/services/Auth/Auth";

declare global {
  namespace Express {
    interface Request {
      auth: Auth;
    }
  }
}

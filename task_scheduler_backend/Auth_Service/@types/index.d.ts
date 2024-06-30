// customTypes.d.ts
import { Request } from 'express';


export interface UserRegistration {
    id: string;
    email: string;
    password: string;
    verification: boolean;
    token: string |string[] | undefined;  
    
}

declare module 'express-serve-static-core' {
    interface Request {
      userId?: string;
    }
  }
  
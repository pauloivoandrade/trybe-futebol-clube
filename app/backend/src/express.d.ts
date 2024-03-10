import { User } from './Interfaces/IUser'; // Importe o tipo User ou o tipo que você está usando para representar um usuário

declare module 'express' {
  interface Request {
    user?: User; // Substitua 'User' pelo tipo que você está usando para representar um usuário, se necessário
  }
}

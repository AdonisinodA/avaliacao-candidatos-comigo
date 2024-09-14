import { Request, Response, NextFunction } from 'express';
import { IUserAuthenticated } from '../types/interface';
import { permissions } from '../enums/permissions';

export default class PermissionsMiddleware {
  static execute(requiredRole: permissions) {
    return (req: Request & {user?:IUserAuthenticated}, res: Response, next: NextFunction) => {
      const userRole = req.user?.role; 

      if (!userRole) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Verifica se o usuário tem a permissão necessária
      if (userRole === 'admin' || (userRole === 'atendente' && requiredRole === 'atendente')) {
        return next(); 
      }

      return res.status(403).json({ message: 'Permissões insuficiente.' });
    };
  }
}

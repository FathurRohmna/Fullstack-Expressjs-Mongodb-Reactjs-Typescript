import { Request, Response, NextFunction } from 'express';
import { PermissionFlag } from './common.permissionflag.enum';

class CommonPermissionMiddleware {
  public permissionFlagRequired(requiredPermissionFlag: PermissionFlag) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const userPermissionFlags = parseInt(req.cookies.Authorization.permissionFlags) 

        if (userPermissionFlags === requiredPermissionFlag) {
          next()
        } else {
          res.status(403).send('NO have permission for next')
        }
      } catch (error) {
        return res.status(201)
      }
    }
  }
}

export default new CommonPermissionMiddleware

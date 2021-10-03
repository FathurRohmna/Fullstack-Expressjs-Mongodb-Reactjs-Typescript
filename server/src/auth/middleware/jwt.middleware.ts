import { TokenPayload } from './../../common/interfaces/tokenPayload.interface';
import { Request, Response, NextFunction } from 'express';
import UserService from '../../user/user.service';

import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const jwtSecret: string = process.env.JWT_SECRET

class JwtMiddleware { 
  constructor(private readonly userService: UserService = new UserService) {}

  public validRefreshNeeded = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const verificationResponse = jwt.verify(req.cookies.Authorization, jwtSecret) as TokenPayload

      const user: any = await this.userService.getUserById(verificationResponse.userId)
      const salt = crypto.createSecretKey(
        Buffer.from(verificationResponse.refreshKey.data)
      )
      const hash = crypto.createHmac('sha512', salt)
        .update(verificationResponse.userId + jwtSecret)
        .digest('base64')
      if (hash === req.cookies.RefreshToken) {
        req.body = {
          userId: user._id,
          email: user.email,
          permissionFlags: user.permissionFlags
        }

        return next()
      } else {
        return res.status(400).send({ errors: 'Invalid refresh token' })
      }
    } catch (error) {
      return res.status(400).send({ errors: 'Invalid refresh token User' })
    }
  }

  public validJWTNeeded(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies
    
    if (cookies && cookies.Authorization) {
      try {
        const verificationResponse = jwt.verify(cookies.Authorization, jwtSecret)

        if (verificationResponse) {
          next()
        } else {
          return res.status(401).send('Failed Token')
        }
      } catch (err) {
        return res.status(401).send('Unauthorized')
      }
    } else {
      return res.status(401).send('Validation Head Auth Error')
    }
  }
}

export default new JwtMiddleware()
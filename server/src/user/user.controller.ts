import { PermissionFlag } from './../common/middleware/common.permissionflag.enum';
import { Request, Response, Router } from 'express';

import UserService from './user.service';
import { Controller } from './../common/interfaces/controller.interface';
import jwtMiddleware from '../auth/middleware/jwt.middleware'
import permissionMiddleware from '../common/middleware/common.permission.middleware'

export class UserController implements Controller {
  public path = '/users';
  public router = Router();

  public userService = new UserService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/users`, 
      jwtMiddleware.validJWTNeeded, 
      permissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
      this.getUserById
    )
    this.router.get(
      `${this.path}`, 
      jwtMiddleware.validJWTNeeded, 
      this.getAllUsers
    )
    this.router.get(`${this.path}/length`, this.getUsersLength)
    this.router.get(
      `${this.path}/:userId`, 
      jwtMiddleware.validJWTNeeded, 
      this.getUserById
    )
    this.router.patch(
      `${this.path}/:userId`, 
      jwtMiddleware.validJWTNeeded, 
      this.updateUser
    )
    this.router.delete(
      `${this.path}/:userId`, 
      jwtMiddleware.validJWTNeeded, 
      this.deleteUser
    )
  }

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getUsers()

      res.status(200).json({ users: users })
    } catch (error) {
      res.status(400).json({ error_msg: error.message })
    }
  }

  public getUsersLength = async (req: Request, res: Response) => {
    try {
      const userLength = await this.userService.usersLength()
      const userGroup = await this.userService.usersData()

      res.status(200).json({ userLength: userLength, userData: userGroup })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }

  public getUserById = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.getUserById(req.params.userId)

      res.status(200).json({user: user})
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public updateUser = async (req: Request, res: Response) => {
    try {
      const newUser = await this.userService.updateUser(req.params.userId, req.body)

      res.status(200).json({ newUser: newUser })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId

      await this.userService.removeUserById(userId)

      res.status(200).send({ userId: userId })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }
  
}

import { LoginDto } from './dto/logIn.dto';
import { AuthService } from './auth.service';
import UserService from './../user/user.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Router, Request, Response } from 'express';
import { Controller } from './../common/interfaces/controller.interface';
import { validationMiddleware } from './../common/middleware/validation.middleware';
import jwtMiddleware from './middleware/jwt.middleware'

export class AuthController implements Controller {
  public path = '/authentication'
  public router = Router()

  constructor(
    private readonly userService: UserService = new UserService,
    private readonly authService: AuthService = new AuthService,
  ) {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registerUser),
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.loginUser),
    this.router.post(
      `${this.path}/refresh-token`, 
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.validRefreshNeeded, 
      this.refreshToken
    )
  }

  private loginUser = async (req: Request, res: Response) => {
    const userData: LoginDto = req.body

    try {
      const user = await this.authService.validate(userData)
      const tokenData = this.authService.login(user)

      res.cookie('Authorization', tokenData.token, { maxAge: tokenData.expiresIn, httpOnly: false })
      res.cookie('RefreshToken', tokenData.refreshToken, { maxAge: tokenData.expiresIn, httpOnly: true })
      res.status(200).json({ User: user })
    } catch (error) {
      return res.status(400).json({ error_msg: error.message })
    }
  }

  private registerUser = async (req: Request, res: Response) => {
    const userData: CreateUserDto = req.body

    try {
      const user = await this.userService.createUser(userData)

      const tokenData = this.authService.login(user)
      res.cookie('Authorization', tokenData.token, { maxAge: tokenData.expiresIn, httpOnly: false })
      res.cookie('RefreshToken', tokenData.refreshToken, { maxAge: tokenData.expiresIn, httpOnly: true })
      res.status(201).send()
    } catch (error) {
      return res.status(400).json({ error_msg: error.message })
    }
  }

  private refreshToken = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.getUserById(req.body.userId)

      const tokenData = this.authService.login(user)
      res.cookie('Authorization', tokenData.token, { maxAge: tokenData.expiresIn, httpOnly: false })
      res.cookie('RefreshToken', tokenData.refreshToken, { maxAge: tokenData.expiresIn, httpOnly: true })
      res.status(200).send()
    } catch (error) {
      return res.status(400).json({ error_msg: error.message })
    }
  }
}
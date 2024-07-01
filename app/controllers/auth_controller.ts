import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { responseSuccess } from '../utils/response.js'


export default class AuthController {
    async login({ request, response }: HttpContext) {
        const { email, password } = await request.validateUsing(loginValidator)

        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user)
        const results = {
            token: token,
        }
        const data = responseSuccess(response, results)
        return data;
    }

    async fetchCurrentUser({ auth, response }: HttpContext) {
        const user = auth.getUserOrFail()
        const results = {
            user: user
        }
        return responseSuccess(response, results)
    }

    async register({ request, response }: HttpContext) {
        const payload = await request.validateUsing(registerValidator)
        const user = await User.create(payload)
        return response.created(user)
    }
}
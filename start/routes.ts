/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')


router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
}).prefix('user')


router.get('me', [AuthController, 'fetchCurrentUser']).use(middleware.auth())
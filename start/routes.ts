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
import ProjectTypesController from '#controllers/project_types_controller'
const AuthController = () => import('#controllers/auth_controller')
const ClientsController = () => import('#controllers/clients_controller')


router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.group(() => {

  router.group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
  }).prefix('user')

  router.group(() => {
    // auth
    router.get('me', [AuthController, 'fetchCurrentUser'])

    // clients
    router.get('client', [ClientsController, 'index'])
    router.post('client', [ClientsController, 'store'])
    router.get('client/:id', [ClientsController, 'show'])
    router.put('client/:id', [ClientsController, 'update'])
    router.delete('client/:id', [ClientsController, 'destroy'])

    // project type
    router.get('project-type', [ProjectTypesController, 'index'])
    router.post('project-type', [ProjectTypesController, 'store'])
    router.get('project-type/:id', [ProjectTypesController, 'show'])
    router.put('project-type/:id', [ProjectTypesController, 'update'])
    router.delete('project-type/:id', [ProjectTypesController, 'destroy'])

  }).use(middleware.auth())

}).prefix(process.env.SCHEMA_API_VERSION || 'api2/v1')


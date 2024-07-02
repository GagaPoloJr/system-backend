import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'
import { responseSuccess } from '../utils/response.js'
import { clientValidator } from '#validators/client';


export default class ClientsController {

    /**
     * 
     * @param request 
     * @param response 
     * @returns - data client with the pagination 
     */
    async index({ request, response }: HttpContext) {
        const page = request.input('page', 1)
        const results = await Client.query().paginate(page);
        const data = responseSuccess(response, results)
        return data;
    }

    /**
     * 
     * @param request
     * @param response  
     * @returns -  retrieve a data
     */
    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(clientValidator)
        const client = await Client.create(payload)
        return response.created(client)
    }

    async show({ params, response }: HttpContext) {
        const result = await Client.findOrFail(params.id)
        const data = responseSuccess(response, result)
        return data
    }

    async update({ request, response, params }: HttpContext) {
        const { id } = params;
        const payload = await request.validateUsing(clientValidator)

        const client = await Client.findOrFail(id)
        client?.merge(payload)

        const result = await client?.save();
        const data = responseSuccess(response, result)
        return data;
    }

    async destroy({ params, response }: HttpContext) {
        const { id } = params;
        const client = await Client.findOrFail(id)
        client?.delete()
        const result = {
            name: client.$attributes.name
        }
        return responseSuccess(response, result)
    }


}
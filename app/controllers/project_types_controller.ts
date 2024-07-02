import type { HttpContext } from '@adonisjs/core/http'
import { responseSuccess } from '../utils/response.js';
import ProjectType from '#models/project_type';
import { projectTypeValidator } from '#validators/project_type';

export default class ProjectTypesController {

    /**
    * 
    * @param request 
    * @param response 
    * @returns - data client with the pagination 
    */
    async index({ request, response }: HttpContext) {
        const page = request.input('page', 1)
        const results = await ProjectType.query().paginate(page);
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
        const payload = await request.validateUsing(projectTypeValidator)
        const client = await ProjectType.create(payload)
        return response.created(client)
    }

    async show({ params, response }: HttpContext) {
        const result = await ProjectType.findOrFail(params.id)
        const data = responseSuccess(response, result)
        return data
    }

    async update({ request, response, params }: HttpContext) {
        const { id } = params;
        const payload = await request.validateUsing(projectTypeValidator)

        const client = await ProjectType.findOrFail(id)
        client?.merge(payload)

        const result = await client?.save();
        const data = responseSuccess(response, result)
        return data;
    }

    async destroy({ params, response }: HttpContext) {
        const { id } = params;
        const client = await ProjectType.findOrFail(id)
        client?.delete()
        const result = {

        }
        return responseSuccess(response, result)
    }
}

export const responseSuccess = (response: any, results: any, pagination?: any) => {
    return response.ok({
        success: true,
        results: results,
        message: 'OK',
        pagination: pagination
    })
}


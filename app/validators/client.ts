import vine from '@vinejs/vine'

export const clientValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3).maxLength(256).optional(),
        type: vine.string().optional()
    })
)
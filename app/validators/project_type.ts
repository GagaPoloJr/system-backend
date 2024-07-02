import vine from '@vinejs/vine'

export const projectTypeValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3).maxLength(256).optional(),
        description: vine.string().optional()
    })
)
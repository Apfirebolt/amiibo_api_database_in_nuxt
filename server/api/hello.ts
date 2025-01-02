import { defineEventHandler, readBody } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'POST') {
        // Read the body of the request
        const body = await readBody(event)
        console.log(body)
        // return data as it is in response
        const response = {
            body: body,
            headers: {
                'content-type': 'application/json',
            },
        }
        return response
    } else {
        // Handle other request methods (e.g., GET)
        const data = await $fetch('https://softgenie.org/api/games')
        return data
    }
})

import { Context } from '@nuxt/types'

// /Users/amit/Projects/Nuxt/amiibo_nuxt_database/middleware/customMiddleware.ts


export default function ({ route, redirect }: Context) {
    console.log('Inside custom middlware', route.path)
}
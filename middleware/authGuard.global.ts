export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Inside authGuard.global.ts', to.path)
  })
  
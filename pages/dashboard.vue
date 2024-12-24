<template>
    <NuxtLayout name="default">
      <div
        class="min-h-full bg-neutral-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      >
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <img class="mx-auto h-32 w-48" src="../assets/1.png" alt="Workflow" />
          <h2 class="mt-6 text-center text-3xl font-extrabold text-secondary">
            Dashboard
          </h2>
        </div>
      </div>
    </NuxtLayout>
  </template>
  <script setup>
  
  definePageMeta({
    layout: "dashboard",
    title: "Dashboard",
    description: "Dashboard page of the Amiibo Database App in Nuxt",
  });
  </script>
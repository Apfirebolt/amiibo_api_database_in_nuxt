<template>
    <NuxtLayout name="default">
      <div class="min-h-full bg-neutral-100 py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-secondary">
            Test
          </h2>
          <p>
            This application provides information about various Amiibo figures
            using the Amiibo API.
          </p>
        </div>
      </div>
    </NuxtLayout>
  </template>
  <script setup>
  
  // definePageMeta
  definePageMeta({
    layout: "default",
    title: "test",
    description: "A test page in Nuxt",
  });

  </script>
  
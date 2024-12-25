<template>
    <NuxtLayout name="dashboard">
      <div class="min-h-full bg-neutral-100 py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-secondary">
            About
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
  import { onMounted } from "vue";
  const router = useRouter();
  
  // definePageMeta
  definePageMeta({
    layout: "dashboard",
    middleware: 'auth',
    title: "about",
    description: "About page of the Amiibo Database App in Nuxt",
  });

  onMounted(() => {
    console.log("This function runs only on the client side.");
    // After 3 seconds, redirect to the home page
    setTimeout(() => {
      router.push("/");
    }, 3000);
  });

  </script>
  
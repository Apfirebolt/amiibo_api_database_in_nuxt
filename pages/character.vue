<template>
    <NuxtLayout name="default">
      <div
        class="min-h-full bg-neutral-100 py-12 sm:px-6 lg:px-8"
      >
        <div class="sm:mx-auto">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-secondary">
            Games
          </h2>
          <div v-if="loader" class="text-center mt-6">
              <Loader />
          </div>
          <div v-else class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="game in games" :key="game.name" class="bg-white p-4 rounded-lg shadow">
                  <h3 class="text-lg font-semibold text-gray-900">{{ game.name }}</h3>
              </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  <script setup>
  import { onMounted } from "vue";
  import useAmiiboGames from "../composables/useAmiiboGames";
  const { games, fetchGames, loader } = useAmiiboGames();
  
  // definePageMeta
  definePageMeta({
    layout: "character",
    title: "Character",
    description: "Character page of the Amiibo Database App in Nuxt",
  });
  
  // onMounted
  onMounted(() => {
    fetchGames();
  });
  </script>
  
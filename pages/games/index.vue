<template>
  <NuxtLayout name="default">
    <div class="min-h-full bg-neutral-100 py-6 sm:px-6 lg:px-8">
      <div class="sm:mx-auto">
        <div class="hero-section bg-cover bg-center text-white py-16 px-6 rounded-lg"
        style="background-image: url('https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_1500/ncom/en_US/amiibo/amiibo-lineup-img');">
        <div class="bg-black/50 p-6 rounded-lg">
          <h1 class="text-4xl font-bold mb-4">
            Welcome to the Amiibo Database
          </h1>
          <p class="text-lg mb-6">
            This application provides information about various Amiibo figures
            related to Games using the Amiibo API.
          </p>
        </div>
      </div>
        <div v-if="loading" class="text-center mt-6">
          <Loader />
        </div>
        <div
          v-else
          class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-delay="100"
        >
          <div
            v-for="game in games"
            :key="game.name"
            class="bg-blue-100 p-4 rounded-lg shadow"
          >
            <h3 class="text-lg font-semibold text-gray-900">{{ game.name }}</h3>
            <button
              @click="goToDetail(game)"
              class="mt-2 text-primary hover:underline"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { onMounted } from "vue";
import useAmiiboGames from "../composables/useAmiiboGames";
const { games, fetchGames, loading } = useAmiiboGames();

// definePageMeta
definePageMeta({
  layout: "dashboard",
  title: "Games",
  description: "Games page of the Amiibo Database App in Nuxt",
});

const goToDetail = async (game) => {
  await navigateTo(`/games/${game.key}`);
};

// onMounted
onMounted(() => {
  fetchGames();
});
</script>

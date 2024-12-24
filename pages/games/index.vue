<template>
  <NuxtLayout name="default">
    <div class="min-h-full bg-neutral-100 py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-secondary">
          Games
        </h2>
        <div v-if="loading" class="text-center mt-6">
          <Loader />
        </div>
        <div
          v-else
          class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="game in games"
            :key="game.name"
            class="bg-white p-4 rounded-lg shadow"
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

const route = useRoute();
const router = useRouter();

const goToDetail = async (game) => {
  console.log('Inside the game method ', game)  
  await navigateTo(`/games/${game.key}`);
};

// onMounted
onMounted(() => {
  fetchGames();
});
</script>

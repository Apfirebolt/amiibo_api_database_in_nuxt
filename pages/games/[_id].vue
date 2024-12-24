<template>
  <NuxtLayout name="default">
    <div class="min-h-full bg-neutral-100 py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-secondary">
          Game Detail
        </h2>
        <div v-if="loading" class="text-center mt-6">
          <Loader />
        </div>
        <div
          v-else
          class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="item in game"
            :key="item.head"
            class="bg-white shadow-md rounded-lg p-4"
          >
            <img
              :src="item.image"
              alt="Amiibo Image"
              class="w-full h-48 object-cover rounded-t-lg"
            />
            <div class="mt-4">
              <h3 class="text-lg font-semibold text-gray-800">
                {{ item.name }}
              </h3>
              <p class="text-gray-600">Character: {{ item.character }}</p>
              <p class="text-gray-600">Game Series: {{ item.gameSeries }}</p>
              <p class="text-gray-600">
                Amiibo Series: {{ item.amiiboSeries }}
              </p>
              <p class="text-gray-600">Type: {{ item.type }}</p>
              <div class="mt-2">
                <h4 class="text-md font-medium text-gray-700">
                  Release Dates:
                </h4>
                <ul class="list-disc list-inside text-gray-600">
                  <li v-if="item.release.au">AU: {{ item.release.au }}</li>
                  <li v-if="item.release.eu">EU: {{ item.release.eu }}</li>
                  <li v-if="item.release.jp">JP: {{ item.release.jp }}</li>
                  <li v-if="item.release.na">NA: {{ item.release.na }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { onMounted } from "vue";
import useAmiiboGames from "../composables/useAmiiboGames";
const { game, fetchGame, loading } = useAmiiboGames();

// definePageMeta
definePageMeta({
  layout: "dashboard",
  title: "Games Detail",
  description: "Games detail page of the Amiibo Database App in Nuxt",
});

const route = useRoute();

console.log("Game is ", game);
// onMounted
onMounted(async () => {
  const gameId = route.params._id;
  await fetchGame(gameId);
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="min-h-full bg-neutral-100 py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-secondary">
          Character Detail
        </h2>
        <div v-if="loading" class="text-center mt-6">
          <Loader />
        </div>
        <div
          v-else
          class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div class="bg-white shadow-md rounded-lg p-4">
            <div
              v-for="item in character"
              :key="item.head"
              class="bg-white shadow-md rounded-lg p-4"
            >
              <img
                :src="item.image"
                alt=""
                class="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 class="mt-4 text-lg font-bold text-secondary">
                {{ item.name }}
              </h3>
              <p class="mt-2 text-sm text-gray-600">
                Series: {{ item.amiiboSeries }}
              </p>
              <p class="mt-2 text-sm text-gray-600">
                Game Series: {{ item.gameSeries }}
              </p>
              <p class="mt-2 text-sm text-gray-600">Type: {{ item.type }}</p>
              <p class="mt-2 text-sm text-gray-600">Release Dates:</p>
              <ul class="list-disc list-inside">
                <li v-if="item.release.jp">Japan: {{ item.release.jp }}</li>
                <li v-if="item.release.eu">Europe: {{ item.release.eu }}</li>
                <li v-if="item.release.na">
                  North America: {{ item.release.na }}
                </li>
                <li v-if="item.release.au">Australia: {{ item.release.au }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";
import useAmiiboCharacters from "../composables/useAmiiboCharacter";
const { character, fetchCharacter, loading } = useAmiiboCharacters();

// definePageMeta
definePageMeta({
  layout: "dashboard",
  title: "Character Detail",
  description: "Character detail page of the Amiibo Database App in Nuxt",
});

const route = useRoute();

// onMounted
onMounted(async () => {
  const characterId = route.params._id;
  await fetchCharacter(characterId);
});
</script>

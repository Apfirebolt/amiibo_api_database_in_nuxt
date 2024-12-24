<template>
  <NuxtLayout name="default">
    <div class="min-h-full bg-neutral-100 py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-secondary">
          Characters
        </h2>
        <div v-if="loading" class="text-center mt-6">
          <Loader />
        </div>
        <div
          v-else
          class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="character in characters"
            :key="character.name"
            class="bg-white p-4 rounded-lg shadow"
          >
            <h3 class="text-lg font-semibold text-gray-900">
              {{ character.name }}
            </h3>
            <button
              @click="goToDetail(character)"
              class="mt-2 text-primary hover:underline"
            >View Detail 
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";
import useAmiiboCharacters from "../composables/useAmiiboCharacter";
const { characters, fetchCharacters, loading } = useAmiiboCharacters();

// definePageMeta
definePageMeta({
  layout: "character",
  title: "Characters",
  description: "Characters page of the Amiibo Database App in Nuxt",
});

const goToDetail = async (character) => {
  await navigateTo(`/characters/${character.key}`);
};

// onMounted
onMounted(() => {
  fetchCharacters();
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="min-h-full bg-neutral-100 py-6 sm:px-6 lg:px-8">
      <div class="hero-section bg-cover bg-center text-white py-16 px-6 rounded-lg"
        style="background-image: url('https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_1500/ncom/en_US/amiibo/amiibo-lineup-img');">
        <div class="bg-black/50 p-6 rounded-lg">
          <h1 class="text-4xl font-bold mb-4">
            Welcome to the Amiibo Database
          </h1>
          <p class="text-lg mb-6">
            This page is about characters of Amiibo figures using the Amiibo API.
          </p>
          <div>
            <input type="text" v-model="searchText" placeholder="Search Amiibo by name"
              class="border border-gray-300 text-gray-800 rounded p-2 w-full my-5" />
          </div>
        </div>
      </div>
      <div class="sm:mx-auto">

        <div v-if="loading" class="text-center mt-6">
          <Loader />
        </div>
        <div
          v-else
          class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4"
          data-aos="fade-up"
        >
          <div
            v-for="character in filteredCharacters"
            :key="character.key"
            class="bg-orange-400 p-4 rounded-lg shadow"
          > 
            <h3 class="text-lg font-semibold text-gray-900">
              {{ character.name }}
            </h3>
            <button
              @click="goToDetail(character)"
              class="mt-2 text-neutral-100 p-2 rounded-lg bg-orange-700 hover:bg-orange-900 transition duration-300 ease-in-out"
            >View Detail 
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { onMounted, computed } from "vue";
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

const searchText = ref("Mario");
const filteredCharacters = computed(() => {
  if (!searchText.value) return characters.value;
  return characters.value.filter((character) =>
    character.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

// onMounted
onMounted(() => {
  fetchCharacters();
});
</script>

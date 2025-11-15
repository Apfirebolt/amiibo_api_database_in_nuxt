<template>
  <NuxtLayout name="default">
    <div class="min-h-full bg-neutral-100 py-6 sm:px-6 lg:px-8">
      <div
        class="hero-section bg-cover bg-center text-white py-16 px-6 rounded-lg"
        style="
          background-image: url(&quot;https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_1500/ncom/en_US/amiibo/amiibo-lineup-img&quot;);
        "
      >
        <div class="bg-black/50 p-6 rounded-lg">
          <h1 class="text-4xl font-bold mb-4">
            Welcome to the Amiibo Database
          </h1>
          <p class="text-lg mb-6">
            This page is about characters of Amiibo figures using the Amiibo
            API.
          </p>
          <div>
            <input
              type="text"
              v-model="searchText"
              placeholder="Search Amiibo by name"
              class="border border-gray-300 text-gray-800 rounded p-2 w-full my-5"
            />
          </div>
        </div>
      </div>
      <div class="sm:mx-auto">
        <div v-if="loading" class="text-center mt-6">
          <Loader />
        </div>
        <div
          v-else
          class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          data-aos="fade-up"
        >
          <div
            v-for="character in filteredCharacters"
            :key="character.key"
            class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-orange-400 transform hover:-translate-y-1"
          >
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3
                  class="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300"
                >
                  {{ character.name }}
                </h3>
                <span
                  class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold"
                >
                  {{ character.name.charAt(0) }}
                </span>
              </div>
              <button
                @click="goToDetail(character)"
                class="w-full mt-4 px-4 py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
              >
                View Details →
              </button>
            </div>
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

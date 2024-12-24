<template>
  <NuxtLayout name="default">
    <div class="homepage-content py-4 px-6">
      <h1 class="text-3xl semi-bold text-gray-600 my-3">
        Welcome to the Amiibo Database
      </h1>
      <p>
        This application provides information about various Amiibo figures using
        the Amiibo API.
      </p>
      <h2>Features:</h2>
      <ul class="list-disc list-inside text-gray-600 my-4">
        <li class="mb-2">Search for Amiibo figures by name</li>
        <li class="mb-2">View detailed information about each Amiibo</li>
        <li class="mb-2">Filter Amiibo by series, game, and more</li>
      </ul>
      <p>Explore the world of Amiibo and discover your favorite characters!</p>
      <Loader v-if="isLoading" />

      <div>
        <input
          type="text"
          v-model="searchText"
          placeholder="Search Amiibo by name"
          class="border border-gray-300 rounded p-2 w-full my-5"
        />
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="item in itemList"
          :key="item.tail"
          class="bg-yellow-100 border rounded-lg p-4"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-64 h-48 object-cover mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">{{ item.name }}</h3>
          <p class="text-gray-600 mb-2">Series: {{ item.amiiboSeries }}</p>
          <p class="text-gray-600 mb-2">Character: {{ item.character }}</p>
          <p class="text-gray-600 mb-2">Game Series: {{ item.gameSeries }}</p>
          <p class="text-gray-600 mb-2">Type: {{ item.type }}</p>
          <p class="text-gray-600">Release Dates:</p>
          <ul class="text-gray-600 list-disc list-inside">
            <li v-if="item.release.au">AU: {{ item.release.au }}</li>
            <li v-if="item.release.eu">EU: {{ item.release.eu }}</li>
            <li v-if="item.release.jp">JP: {{ item.release.jp }}</li>
            <li v-if="item.release.na">NA: {{ item.release.na }}</li>
          </ul>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useAmiibo } from "~/stores/amiibo"; // Assuming auto-imports

definePageMeta({
  layout: false,
  title: "Amiibo Database",
  description:
    "Explore the world of Amiibo and discover your favorite characters!",
  // image: "/images/amiibo.jpg",
  // url: "https://amiibo-database.vercel.app/",
  keywords: ["amiibo", "nintendo", "characters", "figures"],
  robots: "index, follow",
});

const amiiboStore = useAmiibo();
const searchText = ref("Mario");

const itemList = computed(() => amiiboStore.getItemList);
const isLoading = computed(() => amiiboStore.isLoading);

// debounce search input, wait for 500ms before searching
watch(
  searchText,
  (value) => {
    if (value.length > 2) {
      amiiboStore.getItemsAction(value);
    }
  },
  { debounce: 1000 }
);

onMounted(() => {
  amiiboStore.getItemsAction();
});
</script>

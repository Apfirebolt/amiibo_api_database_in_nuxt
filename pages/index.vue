<template>
  <NuxtLayout name="default">
    <div class="homepage-content py-4 px-6">
      <h1 class="text-3xl semi-bold text-gray-600 my-3">Welcome to the Amiibo Database</h1>
      <p>This application provides information about various Amiibo figures using the Amiibo API.</p>
      <h2>Features:</h2>
      <ul>
        <li>Search for Amiibo figures by name</li>
        <li>View detailed information about each Amiibo</li>
        <li>Filter Amiibo by series, game, and more</li>
      </ul>
      <p>Explore the world of Amiibo and discover your favorite characters!</p>
      {{ itemList }}
      <div>
        <input
          type="text"
          v-model="searchText"
          placeholder="Search Amiibo by name"
          class="border border-gray-300 rounded p-2 w-full my-5"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import { useAmiibo } from "~/stores/amiibo"; // Assuming auto-imports

definePageMeta({
  layout: false,
  title: "Amiibo Database",
  description: "Explore the world of Amiibo and discover your favorite characters!",
  // image: "/images/amiibo.jpg",
  // url: "https://amiibo-database.vercel.app/",
  keywords: ["amiibo", "nintendo", "characters", "figures"],
  robots: "index, follow",
});

const amiiboStore = useAmiibo();
const searchText = ref("");

const itemList = computed(() => amiiboStore.getItemList);
const isLoading = computed(() => amiiboStore.isLoading);

// debounce search input, wait for 500ms before searching
watch(searchText, (value) => {
  if (value.length > 2) {
    amiiboStore.getItemsAction(value);
  }
}, { debounce: 1000 });
</script>

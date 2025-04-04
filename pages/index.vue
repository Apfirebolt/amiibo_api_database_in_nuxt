<template>
  <NuxtLayout name="default">
    <div class="homepage-content py-4 px-6">
      <div class="hero-section bg-cover bg-center text-white py-16 px-6 rounded-lg"
        style="background-image: url('https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_1500/ncom/en_US/amiibo/amiibo-lineup-img');">
        <div class="bg-black/50 p-6 rounded-lg">
          <h1 class="text-4xl font-bold mb-4">
            Welcome to the Amiibo Database
          </h1>
          <p class="text-lg mb-6">
            This application provides information about various Amiibo figures
            using the Amiibo API.
          </p>
          <h2 class="text-2xl font-semibold mb-4">Features:</h2>
          <ul class="list-disc list-inside text-lg mb-6">
            <li class="mb-2">Search for Amiibo figures by name</li>
            <li class="mb-2">View detailed information about each Amiibo</li>
            <li class="mb-2">Filter Amiibo by series, game, and more</li>
          </ul>
          <p class="text-lg">
            Explore the world of Amiibo and discover your favorite characters!
          </p>
          <div>
            <input type="text" v-model="searchText" placeholder="Search Amiibo by name"
              class="border border-gray-300 text-gray-800 rounded p-2 w-full my-5" />
          </div>
        </div>
      </div>

      <Loader v-if="isLoading" />

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="item in itemList" :key="item.tail" class="bg-yellow-100 border rounded-lg p-4">
          <img :src="item.image" :alt="item.name" class="w-64 h-48 object-cover mb-4" />
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

definePageMeta({
  layout: false,
  title: "Amiibo Database",
  description:
    "Explore the world of Amiibo and discover your favorite characters!",
  keywords: ["amiibo", "nintendo", "characters", "figures"],
  robots: "index, follow",
});

const amiiboStore = useAmiibo();
const searchText = ref("Mario");
const isOpen = ref(true);

const itemList = computed(() => amiiboStore.getItemList);
const isLoading = computed(() => amiiboStore.isLoading);

// debounce search input, wait for 500ms before searching
let debounceTimeout;
watch(searchText, (value) => {
  clearTimeout(debounceTimeout);
  if (value.length > 2) {
    debounceTimeout = setTimeout(() => {
      amiiboStore.getItemsAction(value);
    }, 1000);
  }
  if (value.length === 0) {
    amiiboStore.getItemsAction();
  }
});

// check if process meta is server
if (import.meta.client) {
  console.log("This function runs only on the client side.");
}

// if (import.meta.server) {
//   console.log("This is server only.");
//   // make a sample API call to jsonplaceholder

//   axios
//     .get("https://jsonplaceholder.typicode.com/posts")
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

onMounted(() => {
  amiiboStore.getItemsAction();
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="homepage-content py-4 px-6">
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
            <input
              type="text"
              v-model="searchText"
              placeholder="Search Amiibo by name"
              class="border border-gray-300 text-gray-800 rounded p-2 w-full my-5"
            />
          </div>
        </div>
      </div>

      <Loader v-if="isLoading" />

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8"
      >
        <div
          v-for="item in itemList"
          :key="item.tail"
          class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
        >
          <div
            class="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-56 object-contain p-4 transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div class="p-5">
            <h3
              class="text-xl font-bold mb-3 text-gray-800 truncate"
              :title="item.name"
            >
              {{ item.name }}
            </h3>
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-sm">
                <span class="font-semibold text-gray-700 w-24">Series:</span>
                <span class="text-gray-600 truncate">{{
                  item.amiiboSeries
                }}</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="font-semibold text-gray-700 w-24">Character:</span>
                <span class="text-gray-600 truncate">{{ item.character }}</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="font-semibold text-gray-700 w-24">Game:</span>
                <span class="text-gray-600 truncate">{{
                  item.gameSeries
                }}</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="font-semibold text-gray-700 w-24">Type:</span>
                <span
                  class="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {{ item.type }}
                </span>
              </div>
            </div>
            <div class="border-t pt-3">
              <p class="text-sm font-semibold text-gray-700 mb-2">
                Release Dates:
              </p>
              <div class="grid grid-cols-2 gap-1 text-xs">
                <div v-if="item.release.au" class="flex items-center">
                  <span class="font-medium text-gray-600">AU:</span>
                  <span class="ml-1 text-gray-500">{{ item.release.au }}</span>
                </div>
                <div v-if="item.release.eu" class="flex items-center">
                  <span class="font-medium text-gray-600">EU:</span>
                  <span class="ml-1 text-gray-500">{{ item.release.eu }}</span>
                </div>
                <div v-if="item.release.jp" class="flex items-center">
                  <span class="font-medium text-gray-600">JP:</span>
                  <span class="ml-1 text-gray-500">{{ item.release.jp }}</span>
                </div>
                <div v-if="item.release.na" class="flex items-center">
                  <span class="font-medium text-gray-600">NA:</span>
                  <span class="ml-1 text-gray-500">{{ item.release.na }}</span>
                </div>
              </div>
            </div>
          </div>
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

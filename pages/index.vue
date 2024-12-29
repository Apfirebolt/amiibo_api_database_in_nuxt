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

      <p>
        This application is built using Nuxt.js, Tailwind CSS, and the Amiibo API. It displays information related to characters, series, and games from the Amiibo database.
      </p>
      <!-- <ClientOnlyTest /> -->
      <!-- <div class="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          @click="openModal"
          class="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div> -->
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
        <!-- <TransitionRoot appear :show="isOpen" as="template">
          <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
              <div
                class="flex min-h-full items-center justify-center p-4 text-center"
              >
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <DialogPanel
                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  >
                    <DialogTitle
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900"
                    >
                      Payment successful
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Your payment has been successfully submitted. We’ve sent
                        you an email with all of the details of your order.
                      </p>
                    </div>

                    <div class="mt-4">
                      <button
                        type="button"
                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        @click="closeModal"
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot> -->
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import axios from "axios";
import { computed, onMounted, ref, watch } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

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
const isOpen = ref(true);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

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

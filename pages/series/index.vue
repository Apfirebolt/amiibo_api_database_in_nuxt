<template>
  <NuxtLayout name="default">
    <div class="min-h-full bg-neutral-100 py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto">
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
              related to Anime Series using the Amiibo API.
            </p>
          </div>
        </div>
        <div v-if="loader" class="text-center mt-6">
          <Loader />
        </div>
        <div
          v-else
          class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="item in seriesList"
            :key="item.name"
            class="group relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary hover:-translate-y-1"
          >
            <div class="flex flex-col h-full">
              <h3
                class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors"
              >
                {{ item.name }}
              </h3>
              <button
                @click="goToDetail(item)"
                class="mt-auto inline-flex items-center justify-center px-4 py-2 bg-primary text-secondary font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                View Details
                <svg
                  class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { onMounted } from "vue";
import useAmiiboSeries from "../composables/useAmiiboSeries";
const { seriesList, fetchSeriesList, loader } = useAmiiboSeries();

// definePageMeta
definePageMeta({
  layout: "dashboard",
  title: "series",
  description: "Series page of the Amiibo Database App in Nuxt",
});

const goToDetail = async (series) => {
  await navigateTo(`/series/${series.key}`);
};

// onMounted
onMounted(() => {
  fetchSeriesList();
});
</script>

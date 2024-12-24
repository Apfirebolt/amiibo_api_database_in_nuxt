<template>
  <NuxtLayout name="default">
    <div class="min-h-full bg-neutral-100 py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-secondary">
          Series
        </h2>
        <div v-if="loader" class="text-center mt-6">
          <Loader />
        </div>
        <div
          v-else
          class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="item in seriesList"
            :key="item.name"
            class="bg-red-100 p-4 rounded-lg shadow"
          >
            <h3 class="text-lg font-semibold text-gray-900">{{ item.name }}</h3>
            <button
              @click="goToDetail(item)"
              class="mt-2 text-primary hover:underline"
            >
              View Details
            </button>
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

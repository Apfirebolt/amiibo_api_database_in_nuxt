<template>
  <NuxtLayout name="default">
    <div class="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        
        <!-- Top Navigation & Header -->
        <div class="mb-8">
          <NuxtLink 
            to="/games" 
            class="inline-flex items-center text-sm font-medium text-slate-600 hover:text-primary transition-colors mb-4"
          >
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Games
          </NuxtLink>

          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
            <div>
              <h1 class="text-3xl font-extrabold text-secondary tracking-tight">
                Game Detail
              </h1>
              <p class="text-sm text-slate-500 mt-1">
                Explore all compatible Amiibo figures for this game title.
              </p>
            </div>

            <!-- Header Badge Stat -->
            <div v-if="game && game.length" class="self-start sm:self-auto inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              {{ game.length }} {{ game.length === 1 ? 'Amiibo Found' : 'Amiibos Found' }}
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
          <Loader />
          <p class="mt-4 text-sm text-slate-500 font-medium">Loading Amiibo figures...</p>
        </div>

        <!-- Amiibo Figures Grid -->
        <div
          v-else-if="game && game.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="item in game"
            :key="item.head"
            class="group bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden"
            data-aos="fade-up"
          >
            <!-- Image Showcase Box -->
            <div class="bg-gradient-to-br from-slate-50 to-slate-100/60 p-6 flex items-center justify-center h-52 relative border-b border-slate-100">
              <span 
                v-if="item.type" 
                class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-sm text-slate-600 shadow-sm border border-slate-200/60 capitalize"
              >
                {{ item.type }}
              </span>
              <img
                :src="item.image"
                :alt="item.name"
                class="max-h-40 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Content Area -->
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <!-- Title & Character -->
                <h3 class="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                  {{ item.name }}
                </h3>
                <p class="text-xs font-medium text-slate-500 mt-0.5">
                  Character: <span class="text-slate-700 font-semibold">{{ item.character || 'N/A' }}</span>
                </p>

                <!-- Metadata Cards -->
                <div class="mt-4 space-y-2">
                  <div class="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span class="text-slate-400 font-medium">Game Series</span>
                    <span class="text-slate-700 font-semibold truncate max-w-[140px]">{{ item.gameSeries || 'N/A' }}</span>
                  </div>
                  <div class="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span class="text-slate-400 font-medium">Amiibo Series</span>
                    <span class="text-slate-700 font-semibold truncate max-w-[140px]">{{ item.amiiboSeries || 'N/A' }}</span>
                  </div>
                </div>

                <!-- Release Dates Section -->
                <div class="mt-4 pt-3 border-t border-slate-100">
                  <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Release Dates
                  </h4>
                  <div v-if="item.release" class="grid grid-cols-2 gap-1.5 text-xs">
                    <div v-if="item.release.au" class="flex items-center justify-between bg-slate-50 px-2 py-1 rounded">
                      <span class="text-slate-500 text-[11px]">🇦🇺 AU</span>
                      <span class="font-mono text-[11px] font-semibold text-slate-700">{{ item.release.au }}</span>
                    </div>
                    <div v-if="item.release.eu" class="flex items-center justify-between bg-slate-50 px-2 py-1 rounded">
                      <span class="text-slate-500 text-[11px]">🇪🇺 EU</span>
                      <span class="font-mono text-[11px] font-semibold text-slate-700">{{ item.release.eu }}</span>
                    </div>
                    <div v-if="item.release.jp" class="flex items-center justify-between bg-slate-50 px-2 py-1 rounded">
                      <span class="text-slate-500 text-[11px]">🇯🇵 JP</span>
                      <span class="font-mono text-[11px] font-semibold text-slate-700">{{ item.release.jp }}</span>
                    </div>
                    <div v-if="item.release.na" class="flex items-center justify-between bg-slate-50 px-2 py-1 rounded">
                      <span class="text-slate-500 text-[11px]">🇺🇸 NA</span>
                      <span class="font-mono text-[11px] font-semibold text-slate-700">{{ item.release.na }}</span>
                    </div>
                  </div>
                  <p v-else class="text-xs text-slate-400 italic">No release dates found.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p class="text-slate-500 font-medium">No Amiibo figures found for this game.</p>
          <NuxtLink to="/games" class="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-opacity-90 transition-opacity">
            Browse All Games
          </NuxtLink>
        </div>

      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { onMounted } from "vue";
import useAmiiboGames from "@/composables/useAmiiboGames";
const { game, fetchGame, loading } = useAmiiboGames();


definePageMeta({
  layout: "dashboard",
  title: "Games Detail",
  description: "Games detail page of the Amiibo Database App in Nuxt",
});

const route = useRoute();

// onMounted
onMounted(async () => {
  const gameId = route.params._id;
  await fetchGame(gameId);
});
</script>

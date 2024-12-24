import { ref } from "vue";
import httpClient from "~/utils/interceptor";

export default function useAmiiboGames() {
  const games = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchGames = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await httpClient.get(
        "https://www.amiiboapi.com/api/gameseries/"
      );
      games.value = response.data.amiibo;
    } catch (err) {
      error.value =
        err.message || "An error occurred while fetching the games.";
    } finally {
      loading.value = false;
    }
  };

  return {
    games,
    loading,
    error,
    fetchGames,
  };
}

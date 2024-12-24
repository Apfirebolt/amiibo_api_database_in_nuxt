import { ref } from "vue";
import httpClient from "~/utils/interceptor";

export default function useAmiiboSeries() {
  const series = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchSeries = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await httpClient.get(
        "https://www.amiiboapi.com/api/amiiboseries/"
      );
      series.value = response.data.amiibo;
    } catch (err) {
      error.value =
        err.message || "An error occurred while fetching the series.";
    } finally {
      loading.value = false;
    }
  };

  return {
    series,
    loading,
    error,
    fetchSeries,
  };
}

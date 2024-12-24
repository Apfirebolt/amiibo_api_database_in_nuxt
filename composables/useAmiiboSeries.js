import { ref } from "vue";
import httpClient from "~/utils/interceptor";

export default function useAmiiboSeries() {
  const series = ref([]);
  const seriesList = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchSeriesList = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await httpClient.get(
        "https://www.amiiboapi.com/api/amiiboseries/"
      );
      seriesList.value = response.data.amiibo;
    } catch (err) {
      error.value =
        err.message || "An error occurred while fetching the series.";
    } finally {
      loading.value = false;
    }
  };

  const fetchSeries = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await httpClient.get(
        `https://www.amiiboapi.com/api/amiibo/?amiiboSeries=${id}`
      );
      series.value = response.data.amiibo;
    } catch (err) {
      error.value =
        err.message || "An error occurred while fetching the series list.";
    } finally {
      loading.value = false;
    }
  };

  return {
    series,
    seriesList,
    loading,
    error,
    fetchSeries,
    fetchSeriesList
  };
}

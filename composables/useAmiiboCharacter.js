import { ref } from "vue";
import httpClient from "~/utils/interceptor";

export default function useAmiiboCharacter() {
  const characters = ref([]);
  const character = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCharacters = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await httpClient.get(
        "https://www.amiiboapi.com/api/character/"
      );
      characters.value = response.data.amiibo;
    } catch (err) {
      error.value =
        err.message || "An error occurred while fetching the characters.";
    } finally {
      loading.value = false;
    }
  };

  const fetchCharacter = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await httpClient.get(
        `https://www.amiiboapi.com/api/amiibo/?character=${id}`
      );
      character.value = response.data.amiibo;
    } catch (err) {
      error.value =
        err.message || "An error occurred while fetching the character.";
    } finally {
      loading.value = false;
    }
  }

  return {
    characters,
    character,
    loading,
    error,
    fetchCharacters,
    fetchCharacter
  };
}

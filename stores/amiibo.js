import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../utils/interceptor";

export const useAmiibo = defineStore("amiibo", {
  state: () => ({
    itemList: ref([]),
    loading: ref(false),
  }),

  getters: {
    getItemList() {
      return this.itemList;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getItemsAction(searchText = "") {
      try {
        this.loading = true;
        const response = await httpClient.get(`?name=${searchText}`);
        if (response) {
          console.log('Response data:', response.data.amiibo);
          this.itemList = response.data.amoiibo;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    resetItemData() {
      this.itemList = [];
    },
  },
});
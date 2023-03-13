import { defineStore } from "pinia";
import { ref } from "vue";
import { Person } from "@/person";

export const personStore = defineStore("person", () => {
  const persons = ref<Person[]>([]);

  const updateList = ref<number>(0);

  function setPersons(personList: Person[]) {
    persons.value = personList;
  }

  function setUpdate(count: number) {
    updateList.value = count;
  }

  return {
    persons,
    setPersons,
    updateList,
    setUpdate,
  };
});

export const loadingStore = defineStore("loading", () => {
  const loading = ref<boolean>(false);

  function setLoading(state: boolean) {
    loading.value = state;
  }

  return {
    loading,
    setLoading,
  };
});

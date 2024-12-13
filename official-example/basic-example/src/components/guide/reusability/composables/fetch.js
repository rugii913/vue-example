import { ref } from "vue";

export function useFetch(url) {
    const data = ref(null);
    const error = ref(null);

    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            data.value = json;
        })
        .catch((reason) => {
            error.value = reason;
        });

    return { data, error };
}

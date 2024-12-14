import { ref, toValue, watchEffect } from "vue";

export function useFetch(urlGetter) {
    const data = ref(null);
    const error = ref(null);

    const fetchData = () => {
        fetch(toValue(urlGetter))
            .then((response) => response.json())
            .then((json) => {
                data.value = json;
            })
            .catch((reason) => {
                error.value = reason;
            });
    };

    watchEffect(() => {
        fetchData();
    });

    return { data, error };
}

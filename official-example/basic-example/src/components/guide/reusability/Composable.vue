<template>
    <div class="container">
        <div>현재 마우스 위치</div>
        <div>x: {{ x }}, y: {{ y }}</div>
        <br />
        <div>fetch 결과</div>
        <input type="text" :value="url" @input="event => { url = event.target.value }" />
        <div v-if="data">data</div>
        <div v-if="data">{{ data }}</div>
        <div v-if="error">error</div>
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMouseTrack } from "./composables/mouseTrack";
import { useFetch } from "./composables/fetch";

export default defineComponent({
    setup() {
        const { x, y } = useMouseTrack();

        const url = ref("/initial-url");
        const { data, error } = useFetch(() => url.value);

        return { x, y, url, data, error };
    },
    data() {
        return {
            fetchUrl: this.url,
        };
    },
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}
</style>

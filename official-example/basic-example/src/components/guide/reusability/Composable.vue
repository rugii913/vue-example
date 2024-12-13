<template>
    <div class="container">
        <div>현재 마우스 위치</div>
        <div>x: {{ x }}, y: {{ y }}</div>
        <br />
        <div>fetch 결과</div>
        <div v-if="data">data</div>
        <div v-if="data">{{ data }}</div>
        <div v-if="error">error</div>
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMouseTrack } from "./composables/mouseTrack";
import { useFetch } from "./composables/fetch";

export default defineComponent({
    setup() {
        const { x, y } = useMouseTrack();
        const { data, error } = useFetch("...");

        return { x, y, data, error };
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

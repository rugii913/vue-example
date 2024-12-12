<template>
    <div class="container">
        <div>현재 마우스 위치</div>
        <div>x: {{ x }}, y: {{ y }}</div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMouseTrack } from "./composables/mouseTrack";

export default defineComponent({
    setup() {
        const { x, y } = useMouseTrack();

        return { x, y }
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

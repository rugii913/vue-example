<template>
    <div class="container">
        <div>현재 마우스 위치</div>
        <div>x: {{ x }}, y: {{ y }}</div>
        <br />
        <div>fetch 결과</div>
        <input type="text" :value="url" @input="updateUrl" />
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

        /*
        * cf. https://ko.vuejs.org/api/composition-api-setup#basic-usage
        * - setup()에서 반환된 refs는 자동으로 얕은 언래핑되므로, 접근할 때 .value를 사용하면 안 됨, 그대로 참조
        * - template에서 접근할 때, this를 이용해서 접근할 때 모두 같은 방식으로 언래핑됨
        * */
        return { x, y, url, data, error };
    },
    methods: {
        updateUrl(textInputEvent) {
            this.url = textInputEvent.target.value;
        },
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

<!-- 참고 https://vue3datepicker.com/installation/#local -->
<!-- script setup을 사용한 composition API를 이용할 경우 -->
<script>
// @ts-check

export default {
  data() {
    return {
      date: null,
    };
  },
  mounted() {
    const now = new Date();
    this.date = now;
  },
};
</script>

<!-- script setup을 사용한 composition API를 이용할 경우 -->
<!-- <script setup>
// @ts-check
import { onMounted, ref } from "vue";

const date = ref();
onMounted(() => {
  const now = new Date();
  date.value = now;
});
</script> -->

<template>
  <VueDatePicker v-model="date"></VueDatePicker>
</template>

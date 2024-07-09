<script>
/* 
- 간소화된 라우팅 임시 작성
  - (참고) https://v3-docs.vuejs-korea.org/guide/scaling-up/routing.html
- 쓸만한 라우팅은 vue-router 라이브러리 사용할 것
  - (참고) https://router.vuejs.kr/
*/
import VueAutoExampleMain from "./components/vue-auto-example/VueAutoExampleMain.vue"
import HomePage from "./pages/HomePage.vue"

const routes = {
  "/": HomePage,
  "/vue-auto-example": VueAutoExampleMain,
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || "/"]
    }
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>
  <div>
    <a href="#/">Home</a> | 
    <a href="#/vue-auto-example">Vue.js auto configured example</a>
  </div>
  <div>
    <component :is="currentView" />
  </div>
</template>

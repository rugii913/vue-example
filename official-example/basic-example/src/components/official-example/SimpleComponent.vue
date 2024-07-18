<!-- 
## 단순한 컴포넌트 
- 참고 자료
  - (공식 홈페이지 → API → 옵션 API → 컴포넌트 인스턴스) https://v3-docs.vuejs-korea.org/api/component-instance.html
    - 기타 참고 API
      - (공식 홈페이지 → API → 빌트-인 → 컴포넌트) https://v3-docs.vuejs-korea.org/api/built-in-components.html
      - (공식 홈페이지 → API → 빌트-인 → 특수 엘리먼트) https://v3-docs.vuejs-korea.org/api/built-in-special-elements.html
      - (공식 홈페이지 → API → 싱글 파일 컴포넌트 → 문법 설명서) https://v3-docs.vuejs-korea.org/api/sfc-spec.html
      - (공식 홈페이지 → API → 싱글 파일 컴포넌트 → <script setup>) https://v3-docs.vuejs-korea.org/api/sfc-script-setup.html
      - (공식 홈페이지 → API → 싱글 파일 컴포넌트 → <CSS 기능>) https://v3-docs.vuejs-korea.org/api/sfc-css-features.html
  - (공식 홈페이지 → 문서 → 핵심 가이드 → 컴포넌트 기초) https://v3-docs.vuejs-korea.org/guide/essentials/component-basics.html
    - 공식 홈페이지 → 문서 → 컴포넌트 심화도 전체적으로 참고
- (목적) component를 이용하여 UI를 독립적이고 재사용 가능한 부분으로 분할, 각각의 독립적인 부분을 작성하는 형태로 작업
- component 사용 방법에 대해서는 더 볼 내용이 많으므로 사용 방법은 생략
  - 아래 간단한 형태의 component 예제를 보고 감만 잡는 정도만
-->
<!--
상위 component로부터 prop을 전달받고, rendering하는 단순한 예제
Here we show the simplest possible component which accepts a prop and renders it.
Learn more about components in the guide!
-->
<template>
  <div>
    <ol>
      <!--
      하위 component에서 사용할 todo: Object로 groceryList의 item들을 넘김
      v-for를 사용할 경우, 각 component에 key를 제공해줘야 함
      We are providing each todo-item with the todo object it's representing, so that its content can be dynamic.
      We also need to provide each component with a "key", which is explained in the guide section on v-for.
    -->
      <TodoItem v-for="item in groceryList" :todo="item" :key="item.id"></TodoItem>
    </ol>
  </div>
</template>

<script>
import TodoItem from "./SimpleComponentTodoItem.vue"

export default {
  /* 하위 component로 사용할 TodoItem 명시 */
  components: {
    TodoItem
  },
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
  }
}
</script>

<style scoped>
ol {
  list-style-type: decimal;
}
</style>

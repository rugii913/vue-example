<!-- 
## 조건문과 반복문(v-if, v-for)
- 참고 자료
  - (공식 홈페이지 → API → 빌트인 디렉티브)
    - (v-if) https://vuejs.org/api/built-in-directives.html#v-if
    - (v-for) https://vuejs.org/api/built-in-directives.html#v-for
  - (공식 홈페이지 → 문서 → 핵심 가이드 → 조건부 렌더링) https://v3-docs.vuejs-korea.org/guide/essentials/conditional.html
  - (공식 홈페이지 → 문서 → 핵심 가이드 → 리스트 렌더링) https://v3-docs.vuejs-korea.org/guide/essentials/list.html

### 조건부 렌더링
- v-if, v-else, v-else-if를 사용
  - v-if="표현식" 표현식의 평가 값에 맞춰 DOM element 렌더링 여부를 결정
- options API의 <template>에 v-if 사용
  - (ex.) <template v-if="ok">...</template>
  - 둘 이상의 element를 조건부 렌더링하기 위해 사용 (cf. 기본적으로 directive는 한 element에만 연결될 수 있음)
    - options API의 <template> 자체를 렌더링할지 말지를 결정
- 주의 사항
  - 한 element에 v-if와 v-for를 함께 사용하는 것은 권장되지 않음
    - 함께 사용할 경우 v-if가 먼저 평가됨
- v-show
  - 실제로 DOM element는 생성되지만, css를 이용해 화면에 보이지 않게 함
  - 조건 평가에 따른 DOM element 전환 비용이 높은 경우(자주 전환해야 하는 경우) 사용 고려

### 리스트 렌더링
- 배열을 DOM의 <li></li> element 혹은 유사한 방식으로 렌더링하는 경우 사용
- key를 통한 상태 유지
  - v-for로 렌더링된 리스트를 업데이트할 때, 기존 element를 재사용하고 재정렬 하기 위해서는
    - Vue.js가 활용한 각 항목의 고유한 key 속성 필요
  - key, Vue.js의 효율적인 렌더링 등에 대한 자세한 내용은 아래 참고
    - https://v3-docs.vuejs-korea.org/guide/essentials/list.html#v-for-with-v-if
    - https://v3-docs.vuejs-korea.org/guide/essentials/list.html#array-change-detection
    - https://v3-docs.vuejs-korea.org/guide/essentials/list.html#displaying-filtered-sorted-results
- 사용 방법(문법)
  - item in items 형식의 특별한 문법을 사용
    - item이 배열 내 반복 element의 alias 역할
    - (ex.) <li v-for="item in items"> {{ item.message }} </li>
  - 두 번째 alias, index
    - (ex.) <li v-for="(item, index) in items"> {{ parentMessage }} - {{ index }} - {{ item.message }} </li>
    - 현재 item의 인덱스를 가리키는 두 번째 alias인 index도 지원
  - JavaScript의 forEach(..)에 넘기는 callback과 유사한 느낌으로 보면 됨
    - 구조 분해 할당도 가능
  - JavaScript 문법처럼 in 대신 of도 사용 가능
  - 객체에 v-for 사용
    - (ex.) <li v-for="value in myObject"> {{ value }} </li>
    - (ex.) <li v-for="(value, key) in myObject"> {{ key }}: {{ value }} </li>
    - (ex.) <li v-for="(value, key, index) in myObject"> {{ index }}. {{ key }}: {{ value }} </li>
  - 숫자 범위에 v-for 사용
    - (ex.) <span v-for="n in 10"> {{ n }} </span>
      - 1..n 범위를 기준으로 반복 → 0이 아니라 1부터 시작함에 유의
  - options API의 <template>에 v-for 사용
    - <template> 태그에 v-for를 사용하여 여러 element 블록을 렌더링할 수 있음
  - component에 v-for 사용
    - component에 직접 v-for을 부여할 수 있음
      - cf. key는 반드시 부여해야함
    - 반복은 되지만 component로 데이터를 자동적으로 전달해주지는 않으므로 
      - props를 명시해서 데이터를 전달해줘야 함
- 주의 사항
  - 한 element에 v-if와 v-for를 함께 사용하는 것은 권장되지 않음
    - 함께 사용할 경우 v-if가 먼저 평가됨
  - v-for가 먼저 평가되도록 사용해야 한다면 v-for를 더 상위 <template> element 등으로 빼내어 적용하는 방식 활용  → https://v3-docs.vuejs-korea.org/guide/essentials/list.html#v-for-with-v-if
-->
<!--
We can render content conditionally or in a loop with the v-if and v-for directives.
-->
<template>
  <div>
    <button @click="show = !show">Toggle List</button>
    <button @click="list.push(list.length + 1)">Push Number</button>
    <button @click="list.pop()">Pop Number</button>
    <button @click="list.reverse()">Reverse List</button>
    <ul v-if="show && list.length">
      <li v-for="(item, index) of list">index {{ index }}: {{ item }}</li><!-- show가 true이며 list.length!==0인 경우 -->
    </ul>
    <p v-else-if="list.length">List is not empty, but hidden.</p><!-- show가 false이며 list.length!==0인 경우 -->
    <p v-else>List is empty.</p><!-- show가 true이며 list.length===0인 경우, show가 false이며 list.length===0인 경우 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      list: [1, 2, 3]
    }
  }
}
</script>

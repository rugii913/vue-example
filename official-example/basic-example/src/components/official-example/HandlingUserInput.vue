<!--
- v-on directive를 이용하여 사용자 입력을 다루는 예제
  - (공식 홈페이지 → API → 빌트인 디렉티브) https://v3-docs.vuejs-korea.org/api/built-in-directives.html
  - (공식 홈페이지 → 문서 → 핵심 가이드 → 템플릿 문법 → 디렉티브 / 인자 / 동적인 인자 / 수식어) https://v3-docs.vuejs-korea.org/guide/essentials/template-syntax.html 
-->
<!--
This example demonstrates handling user input with the v-on directive.
-->
<script>

export default {
  data() {
    return {
      message: 'Hello World!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    notify() {
      alert('navigation was prevented.')
    }
  }
}
</script>

<template>
  <div>
    <!--
    - 의미 불명확, 여기서 refs를 언급한 이유를 잘 모르겠음
    - template에서는 this. 을 명시할 필요가 없음을 의미하는 것으로 보이기는 함
    -->
    <!--
    Note we don't need .value inside templates because
    refs are automatically "unwrapped" in templates.
    -->
    <h1>{{ this.message }}</h1>
    <h1>{{ message }}</h1>

    <!--
    - (API 중 built-in directives 중) v-on → https://vuejs.org/api/built-in-directives.html#v-on
      - element에 event listener를 붙임
      - shorthand 표시는 @
      - 이미 선언된 method 혹은 function(단순한 경우엔 그들의 identifier)를 넘길 수 있고, inline expression statement, argument가 없는 객체를 넘길 수도 있음
      - directive 바로 뒤에 modifiers를 붙여 부가적인 기능 활용 가능 ex. element 기본 동작 방지
    -->
    <!--
    Bind to a method/function.
    The @click syntax is short for v-on:click.
    -->
    <button @click="reverseMessage">Reverse Message</button>

    <!-- Can also be an inline expression statement -->
    <button @click="message += '!'">Append "!"</button>
    <!--
    Vue also provides modifiers for common tasks
    such as e.preventDefault() and e.stopPropagation()
    -->
    <a href="https://vuejs.org" @click.prevent="notify">
      A link with e.preventDefault()
    </a>
  </div>
</template>

<style scoped>
#view-area div {
  flex-direction: column-reverse;
}

h1, button, a {
  display: block;
  margin-bottom: 1em;
}
</style>

<!-- 
## 단순한 Markdown 편집기
- (cf.) 예제에서 marked, lodash-es 라이브러리 사용
  - marked 라이브러리의 marked는 Markdown으로 쓰여진 텍스트를 HTML로 변환하기 위한 것
  - loadsh-es의 debounce는 너무 자주 업데이트되지 않도록 하기 위한 것
- texarea에서 div로 양방향 바인딩할 때 v-bind가 아닌
  - v-bind(단축 문법 ":")와 v-on(단축 문법 "@")를 사용
    - textarea에 input event가 있을 때 data 중 input을 바로 업데이트 하지 않고, debounce를 이용해 지연 업데이트
  - output은 v-html directive를 이용해 HTML 문서로 표현되고
    - 이 때 computed를 이용하여 input에 있는  Markdown 형식 텍스트를  HTML로 변환
-->
<!--
A simple markdown editor.
-->
<template>
  <div class="editor">
    <textarea class="input" :value="input" @input="update"></textarea>
    <div class="output" v-html="output"></div>
  </div>
</template>

<script>
import { marked } from "marked";
import { debounce } from "lodash-es";

export default {
  /* 앞서 예제에서 보여준 data() { return {...} } 방식이 아닌 화살표 함수로 표현하고 있음 */
  data: () => ({
    input: "# hello"
  }),
  computed: {
    output() {
      return marked(this.input)
    }
  },
  methods: {
    update: debounce(function (e) {
      this.input = e.target.value
    }, 100)
  }
}
</script>

<style>
.editor {
  width: 80%;
  height: 800px;
  display: flex;
}

.input,
.output {
  overflow: auto;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}

.input {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>

<!-- 
## 데이터 바인딩(v-bind)
- 참고 자료
  - (공식 홈페이지 → API → 빌트인 디렉티브 → v-bind) https://vuejs.org/api/built-in-directives.html#v-bind
  - (공식 홈페이지 → 문서 → 핵심 가이드 → 클래스와 스타일 바인딩) https://v3-docs.vuejs-korea.org/guide/essentials/class-and-style.html
- 복수 개의 attribute 혹은하나의 component prop을 expression에 동적으로 binding하기 위해 사용
  - "동적으로"의 의미 → component의 data가 변경되면, binding된 data의 평가 결과 역시 변경되고, 이에 따라 attribute의 값도 변경됨
- 사용 방법
  - (일반적인 경우) v-bind:attribute_이름="attribute_값"
  - (동적인 attribute_이름을 사용할 경우) v-bind:[attribute_key]="attribute_value"
- shorthand
  - ":" → v-bind가 들어갈 자리에 그 대신 :를 넣으면 됨
  - .prop modifier를 사용할 경우, shorthand로 "." 사용 가능
    - (ex.) :someProperty.prop="someObject"은 .someProperty="someObject"와 같음
  - attribute와 bound value가 이름이 같은 경우 value 생략 가능

### class and style bindings
- attribute 중 class, style에 binding하는 경우 특별한 기능 제공
  - ".."(attribute_값 자리)의 expression이 문자열 뿐만 아니라, object, array로도 평가될 수 있음

#### HTML class로 binding
- object로 평가되는 경우
  - (ex.) <div :class="{ active: isActive }"></div>
    - isActive가 true이면 active class가 존재
  - (cf.) <div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>
    - 일반적인 class attribute와 :class directive를 함께 사용할 수 있음
  - object를 return하는 computed property와도 binding할 수 있음(예제는 공식 문서 class and style bindings 참고)
- array로 평가되는 경우
  - (ex.) <div :class="[activeClass, errorClass]"></div>
    - data에서 activeClass와 errorClass의 값을 가져와 binding
  - (ex.) <div :class="[isActive ? activeClass : '', errorClass]"></div>
    - array의 element를 평가하기 위해 삼항 연산자를 사용할 수도 있음
    - 조금 더 간결한 표현을 위해 array 안에 object를 넣은 expression을 사용할 수도 있음
      - (ex.) <div :class="[{ [activeClass]: isActive }, errorClass]"></div>
      - 위에서는 isActive 평가 결과가 true이면 activeClass가 존재할 것
- child component에게 사용하기
  - child component가 single root element인 component라면
    - parent component에서 child component에게 class를 부여할 경우
    - child component의 single root element가 원래 갖고 있던 class에 더해짐
  - chilc component가 multiple root element라면, 어떤 element가 그 class를 받을지 명시해야 함
    - 이 때, component property의 $attrs를 사용
    - (ex.) <p :class="$attrs.class">Hi!</p>
    - attribute inheritance에 대한 자세한 내용은 다음 참고 → https://vuejs.org/guide/components/attrs.html

#### inline style로 binding
- object로 평가되는 경우
  - (ex.1) <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
  - (ex.2) <div :style="styleObject"></div>
    - template에서 간결함을 유지하기 위해 사용할 수 있는 방법
    - styleObject: { color: "red", fontSize: "13px" }라는 data를 갖고 있다면, ex.1과 평가 결과는 같음
- array로 평가되는 경우
  - (ex.) <div :style="[baseStyles, overridingStyles]"></div>
    - data에서 baseStyles, overridingStyles의 값을 가져와 binding(HTML class로 binding하는 경우와 같음)
- 접두사 자동 완성(auto-prefixing)
  - -webkit-, -moz-, -o-, -ms-와 같은 특정 브라우저 전용 CSS property의 prefix가 있는 경우
  - Vue.js가 알아서 현재 브라우저에 맞는 style property를 찾아 해결하려고 시도함
- 다중 값(multiple values)
  - 하나의 style property에 대해 여러 value를 array 형태로 줄 수 있음(prefixed value도 가능)
    - (ex.) <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
    - 위의 경우 flex를 지원하는 브라우저에서는 '-webkit-box', '-ms-flexbox'는 반영하지 않고 'flex'만 사용할 것
-->
<!--
Here we are reactively binding element attributes / properties to the state.
The :title syntax is short for v-bind:title.
-->
<template>
  <p>
    <span :title="message">
      Hover your mouse over me for a few seconds to see my dynamically bound title!
    </span>
  </p>

  <!--
  class bindings have special support for objects and arrays
  in addition to plain strings
  -->
  <p :class="{ red: isRed }" @click="toggleRed">
    This should be red... but click me to toggle it.
  </p>

  <!-- style bindings also support object and arrays -->
  <p :style="{ color }" @click="toggleColor">
    This should be green, and should toggle between green and blue on click.
  </p>

  <!-- 위와 같은 결과, 조금 이상하게 보일 순 있지만, 어쨌든 object 형태로 평가한 결과라고 생각하면 됨 -->
  <p :style="{ color: color }" @click="toggleColor">
    This should be green, and should toggle between green and blue on click.
  </p>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello World!',
      isRed: true,
      color: 'green'
    }
  },
  methods: {
    toggleRed() {
      this.isRed = !this.isRed
    },
    toggleColor() {
      this.color = this.color === 'green' ? 'blue' : 'green'
    }
  }
}
</script>

<style>
.red {
  color: red;
}
</style>

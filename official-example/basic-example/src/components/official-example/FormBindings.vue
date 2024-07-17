<!-- 
## 폼 바인딩(v-model directive 관련)
- 참고 자료
  - (공식 홈페이지 → API → 빌트인 디렉티브)
    - (v-model) https://vuejs.org/api/built-in-directives.html#v-model
  - (공식 홈페이지 → 문서 → 핵심 가이드) 
    - (Form 입력 바인딩) https://v3-docs.vuejs-korea.org/guide/essentials/forms.html
    - (컴포넌트 v-model) https://v3-docs.vuejs-korea.org/guide/components/v-model.html
- (목적) application의 state와 form 입력 간 양방향 바인딩(two-way binding)을 만들기 위해 사용
- (내부 동작 참고) v-model은 내부적으로 템플릿 컴파일러가 v-bind, v-on으로 변경함
- 사용 방법
  - 사용 가능한 곳
    - <input> <select>, <textarea>
    - component
  - value bindings
    - input type 중 radio, checkbox, 그리고 select options에서 v-bind(단축 문법 ":"")을 이용해 dynamic property와 값을 binding 가능
  - component v-model
    - v-model을 component에 사용하여 양방향 바인딩 가능
    - (cf. ) 이 경우 내부적으로 상위 component에서는 v-bind, v-on을 활용, 하위 component에서는 props와 emits를 구성하여 활용함
  - 수식어
    - .lazy → input이 아닌 change 이벤트를 수신(listen)
    - .number → 유효한 경우 입력 string을 number로 캐스팅
    - .trim → 사용자 입력의 공백 트리밍
  - 주의사항
    - v-model을 사용할 경우 form element의 value, checked, selected attribute로 부여된 초기 값을 무시함
      - 항상 binding된 application state를 유효한 값으로 취급하므로, options API의 경우 data 옵션을 이용하여 초기값을 부여해야 함
    - <textarea> 내부에서 이중 중괄호 문법(interpolation)은 동작하지 않으므로 반드시 v-model을 사용해야 함
    - <select> 사용 시 match되는 옵션이 없다면, 첫 렌더링 시 unselected 상태가 됨
      - iOS의 경우 이 때 오류가 발생하므로, <select> 사용 시 유효한 초기값을 부여할 것
    - <select>에 multiple attribute가 있는 경우(multiple select) array로 binding
      - 이 때 array 형태로 적절히 초기화 해줘야 함
-->
<!--
We can create two-way bindings between state and form inputs using the v-model directive.
-->
<template>
  <div class="container">
    <div>
      <h2>Text Input</h2>
      <input v-model="text" /> {{ text }}
    </div>

    <div>
      <h2>Text Input - modifier .lazy</h2>
      <input v-model.lazy="text2" /> {{ text2 }}
    </div>

    <div>
      <h2>Checkbox</h2>
      <input type="checkbox" id="checkbox" v-model="checked" />
      <label for="checkbox">Checked: {{ checked }}</label>
    </div>

    <!--
    multiple checkboxes의 경우 v-model의 같은 array에 binding 가능
    - 단 이 때 binding하는 data를 array로 잘 초기화해두어야 함
    - array로 초기화하지 않은 경우 원하는 동작을 얻을 수 없음 - boolean으로 동작
    -->
    <!-- multiple checkboxes can bind to the same array v-model value -->
    <div>
      <h2>Multi Checkbox</h2>
      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames" />
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
      <label for="mike">Mike</label>
      <p>Checked names:
      <pre>{{ checkedNames }}</pre>
      </p>
    </div>

    <div>
      <h2>Radio</h2>
      <input type="radio" id="one" value="One" v-model="picked">
      <label for="one">One</label>
      <br>
      <input type="radio" id="two" value="Two" v-model="picked">
      <label for="two">Two</label>
      <br>
      <span>Picked: {{ picked }}</span>
    </div>

    <div>
      <h2>Select</h2>
      <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <span>Selected: {{ selected }}</span>
    </div>

    <!-- (cf.) <select>의 multiple attribute는 HTML에서 공식적으로 지원하는 attribute임 -->
    <div>
      <h2>Multi Select</h2>
      <select v-model="multiSelected" multiple style="width:100px">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <span>Selected: {{ multiSelected }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'Edit me',
      text2: 'text2',
      checked: true,
      checkedNames: ['Jack'],
      picked: 'One',
      selected: 'A',
      multiSelected: ['A']
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 60%;
}
</style>

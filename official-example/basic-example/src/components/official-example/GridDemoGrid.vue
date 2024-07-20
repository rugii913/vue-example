<template>
  <table v-if="filteredData.length">
    <!-- computed인 filteredData의 길이가 0보다 클 때만 렌더링, 0일 때는 아래 <p v-else>No matches found.</p>로 렌더링 -->
    <thead>
      <tr>
        <!-- 클릭 시 sortBy(key) 호출 -->
        <th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }"> <!-- state 중 sortKey가 key와 같으면 class attribute로 active 추가 -->
          <!-- 맨 앞 글자만 대문자로 변경 - data prop으로 받은 데이터에서는 모두 소문자로 되어 있음 -->
          {{ capitalize(key) }}
          <!-- Name, Power 옆 화살표 부분 렌더링 - class는 스타일 중 공통으로 적용할 부분, :class 부분은 state에 맞춰 dynamic하게 스타일이 선택되어야 하는 부분 -->
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"> <!-- 평가 결과가 1이면 asc 부여, -1이면 dsc 부여, 각각 다른 방향의 화살표를 보여주는 부분 -->
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData"> <!-- prop으로 받은 data들 중 볼 수 있도록 렌더링하는 것은 computed인 filteredData -->
        <td v-for="key in columns">
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>No matches found.</p>
</template>

<script>
export default {
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data() {
    return {
      /* data, columns, filterKey는 상위 component로부터 받고, 렌더링을 위한 sortKey, sortOrder는 이 GridDemoGrid component에서 data 옵션으로 갖고 있음 */
      sortKey: '', // data를 어떤 columns 중 어떤 key로 정렬할지
      sortOrders: this.columns.reduce((o, key) => ((o[key] = 1), o), {}) // 초기값은 { name: 1, power: 1 } 형태가 될 것
      /* 
      (cf.) MDN 쉼표 연산자 comma operator https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Comma_operator
      - 각 피연산자를 왼쪽부터 오른쪽 순서로 평가하고, 마지막 표현식의 값을 반환
        - 단일 표현식을 요구하는 곳에 복수의 표현식을 사용하고 싶을 때 사용
        - { o[key] = 1; return o; }를 블럭을 사용하지 않고 표현하기 위해 사용한 연산자로 보임
      - (ex.) https://www.mycompiler.io/ko/new/nodejs 에서 다음을 실행해볼 것
        - const obj1 = {}; const obj2 = ((obj1["name"] = 1), obj1); console.log(obj1); console.log(obj2);
      */
    }
  },
  computed: {
    filteredData() {
      const sortKey = this.sortKey
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
      const order = this.sortOrders[sortKey] || 1
      let data = this.data // prop으로 받은 data → 객체의 array 형태
      if (filterKey) { // prop의 filterKey(Grid에서 searchQuery를 넘긴 것)이 truthy인 경우 동작
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            // Objects.keys(..)로 key로 이뤄진 string[]를 반환받고, 이 각 string[] 즉 각 key 이름으로 매칭되는 내용들에서 filterKey(searchQuery)를 포함하는 문자열이 있는지 체크 → true인 row만 필터링
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) { // 이 component의 sortKey state가 truthy인 경우 동작
        data = data.slice().sort((a, b) => { // cf. Array.prototype.slice()는 얕은 복사본 객체를 얻기 위해 호출
          a = a[sortKey] // (ex.) a == { name: "Bruce Lee", power: 1 }이라면 a["power"] == 1, 즉 각 객체에서 sortKey의 값만 골라 비교하고자 하는 것
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order 
        })
      }
      return data
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key // argument로 들어온 값을 options data 중 sortKey에 할당
      this.sortOrders[key] = this.sortOrders[key] * -1 // argument로 들어온 값과 매칭되는  sortOrders object의 key에 대한 값에 -1을 곱함
    },
    capitalize(str) { // 맨 앞 글자만 대문자로 변경 - data prop으로 받은 데이터에서는 모두 소문자로 되어 있음 
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
}
</script>

<style>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

/*
(cf.) CSS 테두리 선으로 삼각형 화살표 만들기 https://apost.dev/867/
- 구글링 "css border로 화살표 만들기"
*/
.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>

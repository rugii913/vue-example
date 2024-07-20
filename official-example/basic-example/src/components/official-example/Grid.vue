<!-- 
 ## 정렬과 필터가 있는 그리드
- 재사용 가능한 grid component를 생성하고 데이터를 렌더링하는 예제
  - Grid.vue 파일에는 기반 데이터 및 검색창 input element
  - GridDemoGrid.vue 파일에는 grid 모양 렌더링 및 검색창 input element에 내용이 있는 경우 수행하는 필터 로직 등 존재
- Grid.vue에서 가진 정보를 props로 GridDemoGrid component에 내려줌
  - :data는 grid에 채울 데이터, :columns는 열의 제목, :filter-key는 데이터를 검색할 조건(searchQuery)
  - 양방향 바인딩으로 input에 사용자 입력 시 searchQuery 데이터가 변경되고,
    - filter-key prop으로 변경된 searchQuery 데이터를 내려줌
    - 그러면 GridDemoGrid component의 computed 옵션 filteredData에서 filter-key를 이용하여 data prop으로 받은 내용을 필터링
  - 그 외 sorting 관련 부분도 GridDemoGrid component에서 처리
- 데이터를 받아온 뒤에, 받은 데이터를 기반으로 frontend app에서 정렬, 필터링 처리가 가능함을 볼 수 있음
  - 이 과정에서 꽤 tricky한 부분도 있다고 느낌
-->
<!--
An example of creating a reusable grid component and using it with external data.
-->
<template>
  <div>
    <form id="search">
      Search <input name="query" v-model="searchQuery"> <!-- searchQuery 데이터와 양방향 바인딩 -->
    </form>
    <DemoGrid :data="gridData" :columns="gridColumns" :filter-key="searchQuery">
    </DemoGrid>
  </div>
</template>

<script>
import DemoGrid from './GridDemoGrid.vue'

export default {
  components: {
    DemoGrid
  },
  data: () => ({
    searchQuery: '',
    gridColumns: ['name', 'power'],
    gridData: [
      { name: 'Chuck Norris', power: Infinity },
      { name: 'Bruce Lee', power: 9000 },
      { name: 'Jackie Chan', power: 7000 },
      { name: 'Jet Li', power: 8000 }
    ]
  })
}
</script>

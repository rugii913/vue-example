<!-- 
## 단순한 컴포넌트
- 이 예제에서는 Vue.js GitHub 저장소의 두 브랜치(main, v2-compat)의 최근 세 개의 커밋을 GitHub API를이용해 가져옴
  - 브라우저에 https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=main 를 입력하면 가져오는 raw 데이터를 볼 수 있음
  - 가져온 데이터를 built-in directives 등을 이용하여 적절한 형태로 보여줌
-->
<!--
This example fetches latest Vue.js commits data from GitHub’s API and displays them as a list.
You can switch between the two branches.
-->
<template>
  <div>
    <h1>Latest Vue Core Commits</h1>
    <!--
    (cf.) v-for를 적용할 때 특수 element <template>을 사용함
    - 참고 자료
      - (공식 홈페이지 → API → 빌트-인 → 특수 엘리먼트 → <template>) https://v3-docs.vuejs-korea.org/api/built-in-special-elements.html#template
      - (공식 홈페이지 → 가이드 → 핵심 가이드 → 리스트 렌더링 → <template>에서 v-for 사용하기) https://v3-docs.vuejs-korea.org/guide/essentials/list.html#v-for-on-template
     -->
    <template v-for="branch in branches">
      <input type="radio" :id="branch" :value="branch" name="branch" v-model="currentBranch">
      <label :for="branch">{{ branch }}</label>
    </template>
    <p>vuejs/vue@{{ currentBranch }}</p>
    <ul>
      <li v-for="{ html_url, sha, author, commit } in commits"><!-- commits의 각 원소들에서 html_url, sha, author, commit 정보만 사용 -->
        <a :href="html_url" target="_blank" class="commit">{{ sha.slice(0, 7) }}</a><!-- target attribute는 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target 참고, _blank는 새 탭으로 띄움 -->
        - <span class="message">{{ truncate(commit.message) }}</span><br>
        by <span class="author">
          <a :href="author.html_url" target="_blank">{{ commit.author.name }}</a>
        </span>
        at <span class="date">{{ formatDate(commit.author.date) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`

export default {
  data: () => ({
    branches: ['main', 'v2-compat'],
    currentBranch: 'main',
    commits: null
  }),

  created() {
    /* 
    created는 옵션 API가 초기화된 후를 의미함 → 이 때 fetchData()를 호출하여 데이터를 가져옴
    - (공식 홈페이지 → 가이드 → 핵심 가이드 → 생명주기 훅) https://v3-docs.vuejs-korea.org/guide/essentials/lifecycle.html
    */
    // 

    // fetch on init
    this.fetchData()
  },

  watch: {
    // re-fetch whenever currentBranch changes
    currentBranch: 'fetchData'
  },

  methods: {
    async fetchData() {
      // 데이터를 가져올 url
      const url = `${API_URL}${this.currentBranch}`
      // 데이터를 가져옴 → Body의 json() 함수를 이용하여 object로 parsing → data option의 commits에 할당
      // (cf. MDN Request: json() method) https://developer.mozilla.org/en-US/docs/Web/API/Request/json
      this.commits = await (await fetch(url)).json()
    },
    truncate(v) {
      const newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v // \n(줄바꿈)의 인덱스가 0보다 크면 newline까지의 slice만 반환, 0보다 작으면 그대로 반환
    },
    formatDate(v) {
      return v.replace(/T|Z/g, ' ') /* 정규표현식 - 문자 T, Z는 모두 찾음 */
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
  color: #42b883;
}
li {
  line-height: 1.5em;
  margin-bottom: 20px;
}
.author,
.date {
  font-weight: bold;
}
</style>

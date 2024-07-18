<script>
export default {
  /*
  하위 component인 SimpleComponentTodoItem에서 prop으로 todo를 받아들임
  상위 compoent인 SimpleComponent에서는 여기에서 사용할 todo로 item을 넘겨주고 있음
  */
  props: {
    todo: Object
  }
}
</script>

<template>
  <li>{{ todo.text }}</li>
</template>

import { onMounted, onUnmounted } from "vue";

// composable이 꼭 무엇을 return하게 할 필요도 없음 - 특히 composable 간 중첩하여(nest) 다른 composable에 의해 호출되는 경우
// cf. composable을 중첩시켜 사용함으로써 작게 독립된 단위를 사용하여 복잡한 로직을 구성 → Vue.js composition API에서 composition의 의미
export function useEventListener(target, event, callback) {
    // composable은 이를 사용하는 component의 생명주기에 연결되어 side effect를 설정 및 해제할 수 있음
    onMounted(() => target.addEventListener(event, callback));
    onUnmounted(() => target.removeEventListener(event, callback));
}

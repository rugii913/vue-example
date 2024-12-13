import { ref } from "vue";
import { useEventListener } from "./event";

export function useMouseTrack() {
    // composable로 캡슐화된 내부에서 관리되는 상태
    const x = ref(0);
    const y = ref(0);

    // composable을 이용해 상태를 업데이트하는 등 관리 가능
    function update(mousemoveEvent) {
        x.value = mousemoveEvent.pageX;
        y.value = mousemoveEvent.pageY;
    }

    useEventListener(window, "mousemove", update);
    /* 
     * cf. 이 useMouseTrack()을 호출하는 각 component instance는 서로 간섭하지 않는 x, y 상태의 복사본을 생성
     * - 컴포넌트 간 공유되는 상태를 관리하려면 다음 참고 → https://ko.vuejs.org/guide/scaling-up/state-management
     *   - 또는 pinia, vuex와 같은 상태 관리 라이브러리를 사용
    */
    // 관리되는 상태를 return value로 노출
    return { x, y };
}

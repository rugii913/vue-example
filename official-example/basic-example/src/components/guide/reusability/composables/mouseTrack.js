import { onMounted, onUnmounted, ref } from "vue";

export function useMouseTrack() {
    // composable로 캡슐화된 내부에서 관리되는 상태
    const x = ref(0);
    const y = ref(0);

    // composable을 이용해 상태를 업데이트하는 등 관리 가능
    function update(mousemoveEvent) {
        x.value = mousemoveEvent.pageX;
        y.value = mousemoveEvent.pageY;
    }

    // composable은 이를 사용하는 component의 생명주기에 연결되어 side effect를 설정 및 해제할 수 있음
    onMounted(() => window.addEventListener("mousemove", update));
    onUnmounted(() => window.removeEventListener("mousemove", update));

    // 관리되는 상태를 return value로 노출
    return { x, y };
}

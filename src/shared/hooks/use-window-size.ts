import { debounce } from "@/src/shared/utils";
import { useSyncExternalStore } from "react";

type Callback = () => void;

let store = {
  width: 0,
  height: 0,
};

function getServerSnapshot() {
  return store;
}

function getSnapshot() {
  return store;
}

function subscribe(callback: Callback) {
  const handleResize = () => {
    store = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    callback();
  };

  const debouncedHandleResize = debounce(handleResize, 100);

  handleResize();
  window.addEventListener("resize", debouncedHandleResize);
  return () => window.removeEventListener("resize", debouncedHandleResize);
}

export default function useWindowSize() {
  const windowSize = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return windowSize;
}

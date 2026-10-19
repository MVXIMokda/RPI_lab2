import { useEffect, useState } from "react";

function readWindowWidth() {
  return typeof window === "undefined" ? 0 : window.innerWidth;
}

/**
 * Ширина окна браузера, которая обновляется при каждом resize.
 *
 * Подписка на событие создаётся в useEffect, а возвращаемая из него
 * функция очистки снимает обработчик. После размонтирования компонента
 * в window не остаётся ссылок на его состояние, поэтому утечки памяти нет.
 */
export function useWindowWidth() {
  const [width, setWidth] = useState(readWindowWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}

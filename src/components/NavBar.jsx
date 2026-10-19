import { useEffect, useId, useState } from "react";
import { useWindowWidth } from "../hooks/useWindowWidth.js";
import { Link } from "../router/Link.jsx";
import "./NavBar.css";

const DEFAULT_ITEMS = [
  { id: "home", label: "Главная", href: "/" },
  { id: "partners", label: "Партнеры", href: "/#partners" },
  { id: "about", label: "О нас", href: "/#about" },
  { id: "lecturers", label: "Лекторы", href: "/lecturers" },
  { id: "courses", label: "Курсы", href: "/courses" },
];

// Ширина, ниже которой навигация переходит в компактный режим.
// 768px = 48rem — тот же порог, что у медиазапросов в стилях страниц.
const COMPACT_MAX_WIDTH = 768;

export function NavBar({ items = DEFAULT_ITEMS, activeId = "home" }) {
  const windowWidth = useWindowWidth();
  const isCompact = windowWidth > 0 && windowWidth < COMPACT_MAX_WIDTH;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const isMenuVisible = isCompact && isMenuOpen;

  useEffect(() => {
    if (!isMenuVisible) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuVisible]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav
      className={isCompact ? "navbar navbar--compact" : "navbar"}
      aria-label="Основная навигация"
    >
      <Link href="/" className="navbar__brand" onClick={closeMenu}>
        <span className="navbar__brand-mark" aria-hidden="true">
          л
        </span>
        Учебная платформа
      </Link>

      {isCompact ? (
        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isMenuVisible}
          aria-controls={menuId}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="navbar__toggle-icon" aria-hidden="true" />
          <span className="navbar__toggle-label">
            {isMenuVisible ? "Закрыть" : "Меню"}
          </span>
        </button>
      ) : null}

      <ul
        id={menuId}
        className={
          isMenuVisible ? "navbar__bar navbar__bar--open" : "navbar__bar"
        }
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className="navbar__link"
                aria-current={isActive ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

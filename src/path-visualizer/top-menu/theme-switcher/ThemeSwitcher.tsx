import React, { useEffect, useState } from "react";
import { ReactComponent as SunIcon } from "../../../assets/svg/sun.svg";
import { ReactComponent as MoonIcon } from "../../../assets/svg/moon.svg";
import "./ThemeSwitcher.scss";
import useLocalStorage from "../../../utils/useLocalStorage";
import { Theme } from "../../../models";

const ThemeSwitcher = ({ ...props }) => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  // change theme
  useEffect(() => {
    document.body.classList.remove("dark", "light");
    if (theme === "dark") document.body.classList.add("dark");
    if (theme === "light") document.body.classList.add("light");
  }, [theme]);
  return (
    <div
      className="Theme-Switcher"
      onClick={(e) => {
        e.stopPropagation();
        if (theme === "dark") setTheme("light");
        if (theme === "light") setTheme("dark");
      }}
      {...props}
    >
      {theme === "light" && <SunIcon />}

      {theme === "dark" && (
        <MoonIcon
          fill="var(--other-primary-color)"
          width={"16"}
          height={"16"}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;

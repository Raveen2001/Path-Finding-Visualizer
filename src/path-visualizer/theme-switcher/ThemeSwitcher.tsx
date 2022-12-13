import React, { useEffect, useState } from "react";
import { ReactComponent as SunIcon } from "../../assets/svg/sun.svg";
import { ReactComponent as MoonIcon } from "../../assets/svg/moon.svg";
import "./ThemeSwitcher.scss";

const ThemeSwitcher = ({ ...props }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  // change theme
  useEffect(() => {
    document.body.classList.remove("dark", "light");
    if (isDarkTheme) document.body.classList.add("dark");
    else document.body.classList.add("light");
  }, [isDarkTheme]);
  return (
    <div
      className="Theme-Switcher"
      onClick={(e) => {
        e.stopPropagation();
        setIsDarkTheme((v) => !v);
      }}
      {...props}
    >
      {isDarkTheme && <SunIcon />}

      {!isDarkTheme && (
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

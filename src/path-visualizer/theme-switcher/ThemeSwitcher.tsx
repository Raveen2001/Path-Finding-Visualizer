import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ReactComponent as ThemeIcon } from "../../assets/svg/theme.svg";
import { ReactComponent as SunIcon } from "../../assets/svg/sun.svg";
import { ReactComponent as MoonIcon } from "../../assets/svg/moon.svg";
import "./ThemeSwitcher.scss";

const ThemeSwitcher = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
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
    >
      {/* <ThemeIcon fill="var(--other-primary-color)" width={"16"} height={"16"} /> */}
      {isDarkTheme && (
        <SunIcon fill="var(--other-primary-color)" width={"16"} height={"16"} />
      )}

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

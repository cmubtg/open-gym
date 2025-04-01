// Source: https://github.com/fireship-io/tailwind-dashboard
import { BiSun, BiMoon } from "react-icons/bi";
import useDarkMode from "../../hooks/useDarkMode";

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <div onClick={handleMode} className="mt-0.5 mr-1">
      {darkTheme ? (
        <BiSun size="17" className="nav_icon" />
      ) : (
        <BiMoon size="17" className="nav_icon" />
      )}
    </div>
  );
};

export default ThemeIcon;

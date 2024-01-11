// Source: https://github.com/fireship-io/tailwind-dashboard
import { BiSun, BiMoon } from 'react-icons/bi';
import useDarkMode from '../hooks/useDarkMode';

const ThemeIcon = () => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
      <span onClick={handleMode}>
        {darkTheme ? (
          <BiSun size='24' className='nav_icon mt-2' />
        ) : (
          <BiMoon size='24' className='nav_icon mt-2' />
        )}
      </span>
    );
  };

export default ThemeIcon;
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <div className="flex h-6 w-screen font-semibold header items-center px-2 gap-2">
      <img src={logo} alt="Logo" />
      KITTY
    </div>
  );
};

export default Header;

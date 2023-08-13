import logo from "../../images/Mesto.svg";

function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип сайта Место." />
    </header>
  );
}

export default Header;

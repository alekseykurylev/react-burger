import headerLink from "./header-link.module.css";

const HeaderLink = ({ children, icon, active }) => {
  return (
    <a
      className={`text text_type_main-default text_color_inactive ${
        headerLink.link
      } ${active ? headerLink.active : ""}`}
      href="/"
    >
      {icon}
      {children}
    </a>
  );
};

export default HeaderLink;

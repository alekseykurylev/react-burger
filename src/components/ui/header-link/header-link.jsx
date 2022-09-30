import headerLink from "./header-link.module.scss";

const HeaderLink = ({ children, icon, active }) => {
  return (
    <a
      className={`${headerLink.link} ${active ? headerLink.active : ""}`}
      href="/"
    >
      {icon}
      {children}
    </a>
  );
};

export default HeaderLink;

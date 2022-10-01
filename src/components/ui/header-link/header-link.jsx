import PropTypes from "prop-types";
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

HeaderLink.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  active: PropTypes.bool,
};

export default HeaderLink;

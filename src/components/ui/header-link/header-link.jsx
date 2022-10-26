import PropTypes from "prop-types";
import styles from "./header-link.module.scss";
import { NavLink } from "react-router-dom";

const HeaderLink = ({ children, icon, pathname }) => {
  return (
    <NavLink
      to={{ pathname: pathname }}
      className={styles.link}
      activeClassName={styles.active}
      exact
    >
      {icon}
      {children}
    </NavLink>
  );
};

HeaderLink.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  pathname: PropTypes.string,
};

export default HeaderLink;

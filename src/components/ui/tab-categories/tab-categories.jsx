import styles from "./tab-categories.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

const TabCategories = ({ scrollToCategory, currentCategory }) => {
  const { categories } = useSelector((store) => store.ingredients);

  return (
    <div className={styles.tab}>
      {categories.map((category) => (
        <Tab
          key={category.type}
          value={category.type}
          active={currentCategory === category.type}
          onClick={() => scrollToCategory(category.type)}
        >
          {category.name}
        </Tab>
      ))}
    </div>
  );
};

export default TabCategories;

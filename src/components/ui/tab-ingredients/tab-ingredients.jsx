import styles from "./tab-ingredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import CategoryIngredients from "../category-ingredients/category-ingredients";
import { useRef, useState, useEffect } from "react";

const TabIngredients = ({ openIngredient }) => {
  const { categories } = useSelector((store) => store.ingredients);
  const [currentCategory, setCurrentCategory] = useState("bun");
  const refCategories = useRef(null);

  useEffect(() => {
    const rootScroll = refCategories.current;
    const categoriesScroll = refCategories.current.childNodes;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio === 1) {
            setCurrentCategory(entry.target.id);
          }
        });
      },
      {
        root: rootScroll,
        rootMargin: "0px 0px -90% 0px",
      }
    );

    categoriesScroll.forEach((item) => {
      observer.observe(item);
    });
  }, []);

  const scrollToCategory = (type) => {
    setCurrentCategory(type);
    const targetCategory = refCategories.current.children[type];
    targetCategory.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
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

      <CategoryIngredients
        openIngredient={openIngredient}
        ref={refCategories}
      />
    </>
  );
};

TabIngredients.propTypes = {
  openIngredient: PropTypes.func.isRequired,
};

export default TabIngredients;

import styles from "./burger-ingredients.module.scss";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState, useEffect } from "react";
import CategoryIngredients from "../ui/category-ingredients/category-ingredients";

const BurgerIngredients = () => {
  const { categories } = useSelector((store) => store.ingredients);
  const [currentCategory, setCurrentCategory] = useState("bun");
  const ref = useRef();

  useEffect(() => {
    const rootScroll = ref.current;
    const categoriesScroll = ref.current.childNodes;

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
    const targetCategory = ref.current.children[type];
    targetCategory.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
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
      <CategoryIngredients ref={ref} />
    </section>
  );
};

export default BurgerIngredients;

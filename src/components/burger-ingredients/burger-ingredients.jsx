import { useEffect, useRef, useState } from "react";
import Modal from "../ui/modal/modal";
import IngredientDetails from "../ui/ingredient-details/ingredient-details";
import { ingredientsSlice } from "../../services/slices/ingredients";
import { useDispatch } from "react-redux";
import CategoryIngredients from "../ui/category-ingredients/category-ingredients";
import { getIngredients } from "../../utils/api";
import TabCategories from "../ui/tab-categories/tab-categories";
//import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  // const { ingredients, ingredientsFailed, ingredientsRequest } = useSelector(
  //   (store) => store.ingredients
  // );
  const { addDetails, removeDetails } = ingredientsSlice.actions;
  const [currentCategory, setCurrentCategory] = useState("bun");
  const [openModal, setOpenModal] = useState(false);
  const refCategories = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

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

  const openIngredient = (ingredient) => {
    dispatch(removeDetails());
    dispatch(addDetails(ingredient));
    setOpenModal(true);
  };

  const scrollToCategory = (type) => {
    setCurrentCategory(type);
    const targetCategory = refCategories.current.children[type];
    targetCategory.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="pt-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <TabCategories
          scrollToCategory={scrollToCategory}
          currentCategory={currentCategory}
        />
        <CategoryIngredients
          openIngredient={openIngredient}
          refCategories={refCategories}
        />
      </section>

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;

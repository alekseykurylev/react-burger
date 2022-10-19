import { useEffect, useState } from "react";
import Modal from "../ui/modal/modal";
import IngredientDetails from "../ui/ingredient-details/ingredient-details";
import { ingredientsSlice } from "../../services/slices/ingredients";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../utils/api";
import TabIngredients from "../ui/tab-ingredients/tab-ingredients";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const { ingredients, ingredientsFailed, ingredientsRequest } = useSelector(
    (store) => store.ingredients
  );
  const { addDetails, removeDetails } = ingredientsSlice.actions;
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const openIngredient = (ingredient) => {
    dispatch(removeDetails());
    dispatch(addDetails(ingredient));
    setOpenModal(true);
  };

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      {ingredientsRequest ? (
        "Загрузка ингредиентов..."
      ) : ingredientsFailed ? (
        "Ошибка сервера, зайдите позже"
      ) : ingredients.length <= 0 ? (
        "Извините, но у нас закончились продукты, зайдите позже."
      ) : (
        <>
          <TabIngredients openIngredient={openIngredient} />
          {openModal && (
            <Modal onClose={() => setOpenModal(false)}>
              <IngredientDetails />
            </Modal>
          )}
        </>
      )}
    </section>
  );
};

export default BurgerIngredients;

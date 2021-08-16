import { useEffect, useState } from 'react';
import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import api from '../../services/api';
import { FoodType } from '../../types/food';
import { FoodsContainer } from './styles';

export const Dashboard = (): JSX.Element => {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [editingFood, setEditingFood] = useState<FoodType>({} as FoodType);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModal] = useState<boolean>(false);

  useEffect(() => {
    const loadFoods = async () => {
      const response = await api.get<FoodType[]>('/foods');
      setFoods([...response.data]);
    };

    loadFoods();
  }, []);

  const handleAddFood = async (food: FoodType) => {
    const foodList = [...foods];

    try {
      const response = await api.post<FoodType>('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foodList, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: FoodType) => {
    try {
      const foodUpdated = await api.put<FoodType>(`/foods/${editingFood?.id}`, {
        ...food,
        available: true,
      });

      const foodsUpdated = foods.map((f: FoodType) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods([...foodsUpdated]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter((food: FoodType) => food.id !== id);

    setFoods([...foodsFiltered]);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModal(!editModalOpen);
  };

  const handleEditFood = (food: FoodType) => {
    setEditModal(!editModalOpen);
    setEditingFood(food);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food: FoodType) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

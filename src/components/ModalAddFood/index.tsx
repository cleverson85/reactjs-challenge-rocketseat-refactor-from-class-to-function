import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FoodType } from '../../types/food';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { Form } from './styles';

interface ModalAddFoodProps {
  setIsOpen: () => void;
  handleAddFood: (data: FoodType) => Promise<void>;
  isOpen: boolean;
}

export const ModalAddFood = (props: ModalAddFoodProps) => {
  const { isOpen, setIsOpen, handleAddFood } = props;

  const handleSubmit = async (data: FoodType) => {
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

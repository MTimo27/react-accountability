import { useEffect, useReducer, useState } from 'react';

import CardList from './components/CardList';
import CreationForm from './components/CreationForm';

import {
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';

import { achivementsCollection } from './firebase/firebase-config.js';

export interface CardData {
  id: string;
  category: string;
  description: string;
  date: string;
}

interface CardFormAction {
  type: string;
  value?: string;
}

export const cardFormReducer = (
  state: CardData,
  action: CardFormAction
): CardData => {
  switch (action.type) {
    case 'CATEGORY':
      return {
        ...state,
        category: action.value!,
      };
    case 'DESCRIPTION':
      return {
        ...state,
        description: action.value!,
      };
    case 'DATE':
      return {
        ...state,
        date: action.value!,
      };
    case 'RESET':
      return {
        id: '',
        category: '',
        description: '',
        date: '',
      };
    default:
      return state;
  }
};

function App() {
  const [cardFormState, dispatchCardFormState] = useReducer(
    cardFormReducer,
    { category: '', description: '', date: '', id: '' }
  );

  const [cardList, setCardList] = useState<CardData[]>([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getAchivements = async () => {
      const data = await getDocs(achivementsCollection);
      setCardList(
        data.docs.reverse().map((doc) => ({
          id: doc.id,
          category: doc.data().category,
          description: doc.data().description,
          date: doc.data().date,
        }))
      );
    };
    getAchivements();
  }, [trigger]);

  const deleteCardHandler = (card: CardData) => {
    deleteDoc(doc(achivementsCollection, card.id));
    setTrigger((prev) => !prev);
  };

  const editCardHandler = async (
    event: React.FormEvent<HTMLFormElement> | undefined,
    card: CardData
  ) => {
    if (event) event.preventDefault();
    console.log(card);

    if (
      card.category !== '' ||
      card.description !== '' ||
      card.date !== ''
    ) {
      await updateDoc(doc(achivementsCollection, card.id), {
        category: card.category,
        description: card.description,
        date: card.date,
      });
      setTrigger((prev) => !prev);
    } else alert('Please fill all the fields!');
  };

  const handleAddCard = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      cardFormState.category !== '' ||
      cardFormState.description !== '' ||
      cardFormState.date !== ''
    ) {
      await addDoc(achivementsCollection, {
        category: cardFormState.category,
        description: cardFormState.description,
        date: cardFormState.date,
      });
      dispatchCardFormState({
        type: 'RESET',
      });
      setTrigger((prev) => !prev);
    } else alert('Please fill all the fields!');
  };

  const formChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    dispatchCardFormState({
      type: name.toUpperCase(),
      value: value,
    });
  };

  return (
    <div className="w-full flex-col">
      <CreationForm
        formChangeHandler={formChangeHandler}
        handleAddCard={handleAddCard}
        category={cardFormState.category}
        description={cardFormState.description}
        date={cardFormState.date}
      />
      <CardList
        cardList={cardList}
        deleteCardHandler={deleteCardHandler}
        editCardHandler={editCardHandler}
      />
    </div>
  );
}

export default App;

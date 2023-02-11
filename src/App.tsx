import { useEffect, useReducer, useState } from 'react';

import CardList from './components/CardList';
import CreationForm from './components/CreationForm';

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

  const deleteCardHandler = (card: CardData) => {
    setCardList((prevState) => {
      return prevState.filter((item) => {
        return item.id !== card.id;
      });
    });
  };

  const editCardHandler = (
    event: React.FormEvent<HTMLFormElement> | undefined,
    card: CardData
  ) => {
    if (event) event.preventDefault();

    setCardList((prevState) => {
      return prevState.map((item) => {
        if (item.id === card.id) {
          return card;
        }
        return item;
      });
    });
  };

  const handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setCardList((prevState) => {
      cardFormState.id = Math.random().toString();
      return [cardFormState, ...prevState];
    });

    dispatchCardFormState({
      type: 'RESET',
    });
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
    <div className="App">
      <CreationForm
        formChangeHandler={formChangeHandler}
        handleFormSubmit={handleFormSubmit}
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

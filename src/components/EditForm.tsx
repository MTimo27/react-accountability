import React, { Dispatch, useReducer } from 'react';
import { CardData, cardFormReducer } from '../App';

const EditForm: React.FC<{
  cardData: CardData;
  editCardHandler: (
    event: React.FormEvent<HTMLFormElement>,
    card: CardData
  ) => void;
  setEdit: Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const [cardFormState, dispatchCardFormState] = useReducer(
    cardFormReducer,
    {
      category: props.cardData.category,
      description: props.cardData.description,
      date: props.cardData.date,
      id: props.cardData.id,
    }
  );

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
    <form
      onSubmit={(event) => {
        props.setEdit(false);
        props.editCardHandler(event, cardFormState);
      }}
    >
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={cardFormState.category}
          onChange={formChangeHandler}
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          name="description"
          value={cardFormState.description}
          onChange={formChangeHandler}
        />
      </label>

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={cardFormState.date}
          onChange={formChangeHandler}
        />
      </label>

      <button type="submit">Submit changes</button>
    </form>
  );
};

export default EditForm;

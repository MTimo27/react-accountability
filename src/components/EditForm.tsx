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
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col">
        <label
          htmlFor="category"
          className="font-semibold mb-1"
        >
          Category
        </label>
        <input
          className="border-2 rounded-md border-gray-200 p-1.5 focus:outline-none focus:ring focus:ring-indigo-200"
          type="text"
          name="category"
          value={cardFormState.category}
          onChange={formChangeHandler}
        />
      </div>

      <div className="flex flex-col">
        <label
          className="font-semibold mb-1"
          htmlFor="description"
        >
          Description
        </label>
        <input
          className="border-2 rounded-md border-gray-200 p-1.5 focus:outline-none focus:ring focus:ring-indigo-200"
          type="text"
          name="description"
          value={cardFormState.description}
          onChange={formChangeHandler}
        />
      </div>

      <div className="flex flex-col">
        <label
          className="font-semibold mb-1"
          htmlFor="date"
        >
          Date
        </label>
        <input
          className="border-2 rounded-md mb-2 border-gray-200 p-1.5 focus:outline-none focus:ring focus:ring-indigo-200"
          type="date"
          name="date"
          value={cardFormState.date}
          onChange={formChangeHandler}
        />
      </div>

      <button
        className="sm:my-0 sm:mx-auto sm:w-32 p-1.5 rounded-md border-none bg-indigo-700 text-white"
        type="submit"
      >
        Submit changes
      </button>
    </form>
  );
};

export default EditForm;

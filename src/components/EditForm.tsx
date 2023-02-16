import React, { Dispatch, useReducer } from "react";
import { CardData, cardFormReducer } from "../App";

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
      visibility: props.cardData.visibility,
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

      <div className="flex flex-col">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value={cardFormState.visibility}
            className="sr-only peer"
            name="visibility"
            onChange={formChangeHandler}
            checked={
              cardFormState.visibility === "private"
                ? false
                : true
            }
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium">
            Make public
          </span>
        </label>
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

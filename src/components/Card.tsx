import React, { useState } from 'react';
import { CardData } from '../App';
import EditForm from './EditForm';

const Card: React.FC<{
  cardData: CardData;
  deleteCardHandler: (card: CardData) => void;
  editCardHandler: (
    event: React.FormEvent<HTMLFormElement> | undefined,
    card: CardData
  ) => void;
}> = (props) => {
  const [edit, setEdit] = useState(false);
  return (
    <div className="w-full border-2 border-gray-200 rounded-md p-5">
      {!edit ? (
        <div className="flex flex-col gap-2">
          <h1
            className="text-lg font-semibold
        "
          >
            {props.cardData.category}
          </h1>
          <p>{props.cardData.description}</p>
          <p className="text-end font-semibold">
            {props.cardData.date}
          </p>

          <div className="flex mt-2 gap-2 justify-end">
            <button
              onClick={() => {
                props.editCardHandler(
                  undefined,
                  props.cardData
                );
                setEdit(true);
              }}
              className="w-32 p-1.5 rounded-md border-none bg-gray-400 text-white"
            >
              Edit
            </button>
            <button
              onClick={() =>
                props.deleteCardHandler(props.cardData)
              }
              className="w-32 p-1.5 rounded-md border-none bg-red-700 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <>
          <EditForm
            cardData={props.cardData}
            editCardHandler={props.editCardHandler}
            setEdit={setEdit}
          />
        </>
      )}
    </div>
  );
};

export default Card;

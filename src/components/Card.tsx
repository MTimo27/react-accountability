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
    <div>
      {!edit ? (
        <>
          <h1>{props.cardData.category}</h1>
          <p>{props.cardData.description}</p>
          <p>{props.cardData.date}</p>
          <button
            onClick={() =>
              props.deleteCardHandler(props.cardData)
            }
          >
            Delete
          </button>
          <button
            onClick={() => {
              props.editCardHandler(
                undefined,
                props.cardData
              );
              setEdit(true);
            }}
          >
            Edit
          </button>
        </>
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

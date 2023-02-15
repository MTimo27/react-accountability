import React, {
  useEffect,
  useReducer,
  useState,
} from "react";

import CardList from "./components/CardList";
import CreationForm from "./components/CreationForm";

import {
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
} from "firebase/firestore";

import { auth, db } from "./firebase/firebase-config.js";
import { Auth } from "./components/Auth";

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
    case "CATEGORY":
      return {
        ...state,
        category: action.value!,
      };
    case "DESCRIPTION":
      return {
        ...state,
        description: action.value!,
      };
    case "DATE":
      return {
        ...state,
        date: action.value!,
      };
    case "RESET":
      return {
        id: "",
        category: "",
        description: "",
        date: "",
      };
    default:
      return state;
  }
};

function App() {
  const [cardFormState, dispatchCardFormState] = useReducer(
    cardFormReducer,
    { category: "", description: "", date: "", id: "" }
  );

  const [cardList, setCardList] = useState<CardData[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [currentUser, setCurrentUser] = React.useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    const getAchivements = async () => {
      try {
        if (currentUser !== undefined) {
          const data = await getDocs(
            collection(db, currentUser)
          );
          setCardList(() => {
            const result = data.docs.map((doc) => ({
              id: doc.id,
              category: doc.data().category,
              description: doc.data().description,
              date: doc.data().date,
            }));
            return result.reverse();
          });
        } else setCardList([]);
      } catch (error) {
        console.log(error);
      }
    };
    getAchivements();
  }, [trigger, currentUser]);

  const deleteCardHandler = (card: CardData) => {
    try {
      if (currentUser !== undefined) {
        deleteDoc(
          doc(collection(db, currentUser), card.id)
        );
        setTrigger((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editCardHandler = async (
    event: React.FormEvent<HTMLFormElement> | undefined,
    card: CardData
  ) => {
    if (event) event.preventDefault();
    try {
      if (
        card.category !== "" &&
        card.description !== "" &&
        card.date !== ""
      ) {
        if (currentUser !== undefined) {
          await updateDoc(
            doc(collection(db, currentUser), card.id),
            {
              category: card.category,
              description: card.description,
              date: card.date,
            }
          );
          setTrigger((prev) => !prev);
        }
      } else alert("Please fill all the fields!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCard = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (
        cardFormState.category !== "" &&
        cardFormState.description !== "" &&
        cardFormState.date !== ""
      ) {
        if (currentUser !== undefined) {
          await addDoc(collection(db, currentUser), {
            category: cardFormState.category,
            description: cardFormState.description,
            date: cardFormState.date,
          });
          dispatchCardFormState({
            type: "RESET",
          });
          setTrigger((prev) => !prev);
        }
      } else alert("Please fill all the fields!");
    } catch (error) {
      console.log(error);
    }
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

  console.log(auth.currentUser);

  return (
    <div className="w-full flex-col">
      <Auth
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
      />
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

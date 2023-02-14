import { CardData } from '../App';
import Card from './Card';

const CardList: React.FC<{
  cardList: CardData[];
  deleteCardHandler: (card: CardData) => void;
  editCardHandler: (
    event: React.FormEvent<HTMLFormElement> | undefined,
    card: CardData
  ) => void;
}> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <h1 className="text-lg font-semibold mb-2">
        Achivements
      </h1>
      <div className="flex flex-col w-11/12 sm:w-1/3 justify-center items-center gap-2">
        {props.cardList.map((card) => (
          <Card
            key={card.id}
            cardData={card}
            deleteCardHandler={props.deleteCardHandler}
            editCardHandler={props.editCardHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;

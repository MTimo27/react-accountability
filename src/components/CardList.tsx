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
    <div>
      <h1>Achivement List</h1>
      <div>
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

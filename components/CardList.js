import Card from "./Card";
import styles from "./../styles/CardList.module.scss"

export default function CardList({ cards, error, marry, toggle, deleteCard }) {

  if (error) return <div>Failed to load waifus</div>
  if (!cards) return <div>Loading...</div>

  return (
    <div className={styles.cardList}>
      {cards.data.map(card => <Card key={card.id} data={card} marry={marry} deleteCard={deleteCard} toggle={toggle} />)}
    </div>
  )
}

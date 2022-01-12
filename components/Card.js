import React from 'react'
import styles from '../styles/Card.module.scss'

export default function Card({ data }) {
  return (
    <div class={styles.card}>
      <div class={styles.cardCover}>
        <img src={data.image} alt="" />
      </div>
      <div class={styles.cardActions}>
        <button class={styles.cardAction}><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class={styles.cardData}>
        <h1 class={styles.cardTitle}>{data.name}</h1>
        <button class={styles.cardSeries}>{data.series}</button>
      </div>
    </div>
  )
}

import Link from 'next/link'
import React from 'react'
import styles from '../styles/Card.module.scss'

export default function Card({ data, marry, deleteCard, toggle }) {
  const married = !!data.married;
  return (
    <div className={styles.card}>
      <div className={styles.cardCover}>
        <img data-married={married} src={data.image} alt="" />
      </div>
      <div className={styles.cardActions}>
        <button onClick={() => deleteCard(data.id, data.name)} className={`${styles.cardAction} ${styles.cardDelete}`}><i className="fas fa-trash-alt"></i></button>
        <button onClick={() => toggle(2, true, data)} className={`${styles.cardAction} ${styles.cardEdit}`}><i className="fas fa-edit"></i></button>
        <button onClick={() => marry(data.id, !data.married)} className={`${styles.cardAction} ${styles.cardMarry}`}><i className="fas fa-ring"></i></button>
      </div>
      <div className={styles.cardData}>
        <h1 className={styles.cardTitle}>{data.name}</h1>
        <Link href={{ pathname: '/', query: { page: 1, series: data.slug }}} className={styles.cardSeries}>
          <a className={styles.cardSeries}>{data.series}</a>
        </Link>
      </div>
    </div>
  )
}

import React from 'react'
import styles from '../styles/Card.module.scss'

export default function Card() {
  return (
    <div className={styles.card}>
      <img src="./8rQOSfl.png" alt=""/>
      <h1 className={styles.name}>Shenhe</h1>
      <a href="" className={styles.series}>Genshin Impact</a>
      <hr/>
      <button>Favorite</button>
      <button>Remove</button>
    </div>
  )
}

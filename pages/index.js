import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/Card' 
import styles from '../styles/Home.module.scss'

export default function Home({ waifus }) {
  return (
    <div className={styles.list}>
      {waifus.map(waifu => <Card data={waifu}/>)}     
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch('http://localhost:3000/api/waifus');
  const waifus = await res.json();

  return {
    props: {
      waifus
    }
  }
}

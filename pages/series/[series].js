import { useRouter } from "next/router"
import useSWR from "swr";
import Card from "../../components/Card";
import CardForm from "../../components/CardForm";
import CardList from "../../components/CardList";
import styles from "../../styles/Home.module.scss"

// const fetcher = async (url) => fetch(url, {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/json'
//   },
//   body: JSON.stringify({

//   })
// }).then(res => res.json());

export default function Series({ waifus }) {
  return (
    <div className="container">
      <CardList cards={waifus} />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const series = params.series
  const res = await fetch('http://localhost:3000/api/waifus');
  const waifus = await res.json();
  return {
    props: {
      waifus: waifus.filter(waifu => waifu.slug == series)
    }
  }
}

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
  }

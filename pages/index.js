import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/Card' 
import styles from '../styles/Home.module.scss'
import { useState } from 'react'
import CardForm from '../components/CardForm'
import useSWR, { useSWRConfig } from 'swr'
import CardList from '../components/CardList'
import SeriesForm from '../components/SeriesForm'
import ModalDialog from '../components/ModalDialog'
import { useRef } from 'react/cjs/react.development'
import { useRouter } from 'next/router'
import EditForm from '../components/EditForm'
import Link from 'next/link'

async function fetcher({ url, page, filter }) {
  // The offset of the data based on the page number
  const offset = (page - 1) * 48;
  // Check if there is a filter
  const res = (filter != 'all') ? await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      action: 'filter',
      filter: filter
    })
  }) : await fetch(url);
  // Turn the response into json data
  const data = await res.json();
  // Return a subset of the data based on the offset
  return { total: data.length, data: data.slice(offset, offset + 48)};
}

const seriesFetcher = url => fetch(url).then(data => data.json());

export default function Home() {

  // Initial Idea
  // const [waifuFormToggled, setWaifuFormToggled] = useState('none');

  // Temporary
  const [waifuFormToggled, setWaifuFormToggled] = useState('none');
  const [seriesFormToggled, setSeriesFormToggled] = useState('none');
  const [editFormToggled, setEditFormToggled] = useState('none');
  const [editFormData, setEditFormData] = useState(null);

  function toggle(form, show, data = null) {
    if (data) setEditFormData(data);

    switch (form) {
      case 0:
        setWaifuFormToggled(show ? 'flex' : 'none');
        break;
      case 1:
        setSeriesFormToggled(show ? 'flex' : 'none');
        break;
      case 2:
        setEditFormToggled(show ? 'flex' : 'none');
        break;
    }
    // Initial Idea
    // setToggled(show ? 'flex' : 'none');
  }


  const url = 'http://localhost:3000/api/waifus';

  const router = useRouter();

  // const seriesFilter =  router.query.series ?? 'all';
  const seriesFilter =  router.query.series ?? 'all';
  const currentPageNumber = parseInt(router.query.page) ?? 1;

  // const { mutate } = useSWRConfig();

  // const { data:cardData, error:cardDataError, mutate:mutateCardData }

  const { data:waifus, error:waifusError, mutate:mutateWaifus } = useSWR({ url:url, page:currentPageNumber, filter:seriesFilter }, fetcher);
  const { data:series, error:seriesError, mutate:mutateSeries } = useSWR('http://localhost:3000/api/series', seriesFetcher);

  if (seriesError) return <div>Failed to load series</div>
  if (!series) return <div>Loading...</div>

  async function deleteCard(waifuId, waifuName) {
    if (window.confirm(`Are you sure you want to delete ${waifuName}?`)) {
      const filteredWaifus = waifus.data.filter(w => w.id != waifuId);
      mutateWaifus([...filteredWaifus], false);
      await fetch('http://localhost:3000/api/waifus', {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          waifuId: waifuId
        })
      });
      mutateWaifus();
    }
  }

  async function marry(waifuId, married) {
    const filteredWaifus = waifus.data.map(w => {
      if (w.id == waifuId) w.married = married;
      return w;
    });
    mutateWaifus([...filteredWaifus], false);
    await fetch('http://localhost:3000/api/waifus', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        action: 'marry',
        waifuId: waifuId,
        married: married
      })
    });
    mutateWaifus();
  }

  function showNextPageButton() {
    const totalPages = Math.ceil(waifus.total / 48);
    if (currentPageNumber < totalPages) return <Link href={{ pathname: '/', query: { page: currentPageNumber + 1, series: seriesFilter }}}>
      <a className={styles.pageBtn}><i class="fas fa-chevron-right"></i></a>
    </Link>
  }

  function showPrevPageButton() {
    if (currentPageNumber > 1) return <Link href={{ pathname: '/', query: { page: currentPageNumber - 1, series: seriesFilter }}}>
      <a className={styles.pageBtn}><i class="fas fa-chevron-left"></i></a>
    </Link>
  }

  return (
    <main>
      { waifus && showPrevPageButton() }
      { waifus && showNextPageButton() }
      <section id={styles.forms}>
        <div className={styles.container}>
          <button className={styles.btn} onClick={() => toggle(0, true)}><i className="fas fa-plus"></i> Add Waifu</button>
          <button className={styles.btn} onClick={() => toggle(1, true)}><i className="fas fa-plus"></i> Add Series</button>
          <ModalDialog toggled={waifuFormToggled}>
            <h2>Add Waifu</h2>
            <CardForm toggle={toggle} series={series} mutate={mutateWaifus} />
          </ModalDialog>
          <ModalDialog toggled={seriesFormToggled}>
            <h2>Add Series</h2>
            <SeriesForm toggle={toggle} mutate={mutateSeries} />
          </ModalDialog>
          <ModalDialog toggled={editFormToggled}>
            <h2>Edit Waifu</h2>
            <EditForm toggle={toggle} data={editFormData} setData={setEditFormData} series={series} mutate={mutateWaifus} />
          </ModalDialog>
        </div>
      </section>
      <section id={styles.cards}>
        <div className={styles.container}>
          <CardList cards={waifus} error={waifusError} marry={marry} deleteCard={deleteCard} toggle={toggle} />
        </div>
      </section>
    </main>
  )
}

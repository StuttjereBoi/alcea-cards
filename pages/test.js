import React from 'react'
import { useRef, useState } from 'react/cjs/react.development';
import Card from '../components/Card'
import CardList from '../components/CardList';
import EditCardForm from '../components/EditCardForm';
import EditForm from '../components/EditForm'
import ModalDialog from '../components/ModalDialog';

export default function test() {

  const toggleState = useState('none');
  const [editFormData, setEditFormData] = useState(null);

  function toggle(show, data = null) {
    if (data) {
      setEditFormData(data);
    }
    toggleState[1](show ? 'flex' : 'none');
  }

  return (
    <main>
      <ModalDialog toggled={toggleState[0]} title="niggers">
        <EditForm toggle={toggle} data={editFormData} series={[
          {
            id: 1,
            title: 'Genshin Impact',
            slug: 'genshin-impact'
          }
        ]} />
      </ModalDialog>
      <CardList cards={[
        {
          id: 1,
          name: "mona",
          image: "https://images-ext-2.discordapp.net/external/Li0mvA-dHbOYBOkes1BKUTAmjlS--5Mi5lSM1hhjdhE/https/imgur.com/JfIZFZV.png?width=395&height=701",
          married: true,
          series: "Genshin Impact",
          seriesId: 1
        }
      ]} toggle={toggle} />
    </main>
  )
}

    // <main style={{
    //   background: '#ddd',
    //   display: 'flex',
    //   height: '100vh',
    //   width: '100vw',
    //   justifyContent: 'center',
    //   alignItems: 'center'
    // }}>
    //   <EditCardForm data={{
    //     name: 'jacob'
    //   }} />

      /* <EditForm backdropRef={editFormBackdropRef} toggleDialog={toggleDialog} series={[
        {
          id: 1,
          title: "Anime",
          slug: "anime"
        },
        {
          id: 2,
          title: "Manga",
          slug: "manga"
        }
      ]} /> */
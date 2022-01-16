import { useState } from 'react/cjs/react.development';
import styles from './../styles/CardForm.module.scss';

export default function CardForm({ series, selectedSeries, toggle, mutate }) {

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [seriesId, setSeriesId] = useState(1);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('http://localhost:3000/api/waifus', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        action: 'add',
        name: name,
        image: image,
        seriesId: seriesId
      })
    });
    setName('');
    setImage('');
    mutate();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-row'>
        <div className='form-col'>
          <label htmlFor="name" className={styles.lbl}>name</label>
          <input type="text" className={styles.inputText} value={name} onChange={e => setName(e.target.value)} id="name" />
        </div>
      </div>
      <div className='form-row'>
        <div className='form-col'>
          <label htmlFor="image" className={styles.lbl}>image</label>
          <input type="text" className={styles.inputText} value={image} onChange={e => setImage(e.target.value)} id="image" />
        </div>
      </div>
      <div className='form-row'>
        <div className='form-col'>
          <label htmlFor="series" className={styles.lbl}>series</label>
          <select className={styles.inputText} value={seriesId} onChange={e => setSeriesId(e.target.value)} id="series">
            {series.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>
      </div>
      <div className='form-row'>
        <div className='form-col'>
          <button type='button' className={styles.formBtn} onClick={() => toggle(0, false)}>close</button>
        </div>
        <div className='form-col'>
          <button className={styles.formBtn}>add</button>
        </div>
      </div>
    </form>
  )
}

import { useState } from 'react/cjs/react.development';
import styles from './../styles/CardForm.module.scss';

export default function EditForm({ data, setData, series, toggle, mutate }) {

  if (!data) return <div>No Data</div>

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('http://localhost:3000/api/waifus', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        action: 'edit',
        id: data.id,
        name: data.name,
        image: data.image,
        seriesId: data.seriesId
      })
    });
    setData(null);
    mutate();
    toggle(2, false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-row'>
        <div className='form-col'>
          <label htmlFor="name" className={styles.lbl}>name</label>
          <input type="text" className={styles.inputText} value={data.name} onChange={e => setData({ ...data, name: e.target.value })} id="name" />
        </div>
      </div>
      <div className='form-row'>
        <div className='form-col'>
          <label htmlFor="image" className={styles.lbl}>image</label>
          <input type="text" className={styles.inputText} value={data.image} onChange={e => setData({ ...data, image: e.target.value })} id="image" />
        </div>
      </div>
      <div className='form-row'>
        <div className='form-col'>
          <label htmlFor="series" className={styles.lbl}>series</label>
          <select className={styles.inputText} value={data.seriesId} onChange={e => setData({ ...data, seriesId: e.target.value })} id="series">
            {series.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>
      </div>
      <div className='form-row'>
        <div className='form-col'>
          <button type='button' className={styles.formBtn} onClick={() => toggle(2, false)}>close</button>
        </div>
        <div className='form-col'>
          <button className={styles.formBtn}>update</button>
        </div>
      </div>
    </form>
  )
}

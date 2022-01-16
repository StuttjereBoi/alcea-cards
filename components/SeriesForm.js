import React from 'react'
import { useState } from 'react/cjs/react.development';

export default function SeriesForm({ toggle, mutate }) {

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  function str2slug(str) {
    str = str.toLowerCase();
    str = str.replace(/\s/g, '-');
    return str;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/series`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        slug: slug
      })
    });
    setTitle('');
    setSlug('');
    mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Title</p>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} onBlur={e => setSlug(str2slug(e.target.value))} />
      <input type="text" value={slug} onChange={e => setSlug(str2slug(e.target.value))} />
      <button type='button' onClick={() => toggle(1, false)}>close</button>
      <button>Submit</button>
    </form>
  )
}

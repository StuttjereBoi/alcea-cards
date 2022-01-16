import { sql_query } from '../../../lib/db';

async function get(res) {
  const results = await sql_query(`
      SELECT waifus.id, waifus.name, waifus.image, waifus.married, waifus.seriesId, series.title AS series, series.slug
      FROM waifus
      INNER JOIN series ON waifus.seriesId = series.id
      ORDER BY waifus.married DESC, waifus.name
  `);
  return res.json(results);
}

async function getSingle(id) {
  const results = await sql_query(`
    SELECT waifus.id, waifus.name, waifus.image, waifus.married, waifus.seriesId, series.title AS series, series.slug
    FROM waifus
    INNER JOIN series ON waifus.seriesId = series.id
    WHERE waifus.id = ?
    ORDER BY waifus.name
    LIMIT 1
  `, [
    id
  ]);
  return results[0];
}

async function marry(res, { waifuId, married }) {
  await sql_query(`
    UPDATE waifus
    SET married = ?
    WHERE id = ?;
  `, [
    married,
    waifuId
  ]);
  res.status(200).json(await getSingle(waifuId));
}

async function update(res, { id, name, image, seriesId }) { 
  await sql_query(`
    UPDATE waifus
    SET
    name = ?,
    image = ?,
    seriesId = ?
    WHERE id = ?;
  `, [
    name,
    image,
    seriesId,
    id
  ]);
  return res.json(await getSingle(id)); 
}

async function addSeries(res, { name, image, seriesId }) {
  await sql_query(`
    INSERT INTO waifus SET
    name = ?,
    image = ?,
    seriesId = ?
  `, [
    name,
    image,
    seriesId
  ]);
  res.status(200).json(data)
}

async function filterSeries(res, { filter }) {
  const results = await sql_query(`
      SELECT waifus.*, series.title AS series, series.slug
      FROM waifus
      INNER JOIN series ON waifus.seriesId = series.id
      WHERE series.slug = ?
      ORDER BY waifus.married DESC, waifus.name
  `, [filter]);
  return await res.json(results);
}

async function remove(res, { waifuId }) {
  await sql_query(`DELETE FROM waifus WHERE id = ?`, [ waifuId ]);
  return res.json({ waifuId });
}

const handler = async (req, res) => {
  const data = req.body;
  try {
    switch (req.method) {
      case 'GET':
        await get(res);
        break;
      case 'POST':
        switch (data.action) {
          case 'add':
            await addSeries(res, data)
            break;
          case 'filter':
            await filterSeries(res, data);
            break;
        }     
        break;
      case 'PUT':
        switch (data.action) {
          case 'marry':
            await marry(res, data);
            break;
          case 'edit':
            await update(res, data);
            break;
        }
        break;
      case 'DELETE':
        await remove(res, data);
    }
  } catch (e) {
    return res.status(500).json({error: e.message});
  } 
}

export default handler
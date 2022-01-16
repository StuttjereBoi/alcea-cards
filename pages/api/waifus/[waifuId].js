import { sql_query } from '../../../lib/db';

export default async function handler(req, res) {
  const { waifuId } = req.query;
  switch (req.method) {
    case 'get': await read(res); break;
    case 'put': await update(); break;
    case 'delete': await remove(); break;
    default: await read(); break;
  }
}

async function read(waifuId, res) {
  const result = await sql_query(`
    SELECT waifus.*, series.title AS series, series.slug
    FROM waifus
    WHERE waifus.id = ?
    INNER JOIN series ON waifus.seriesId = series.id
  `, [ waifuId ]);
  res.json(result);
}

async function update() {

}

async function remove() {

}
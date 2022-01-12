import { sql_query } from '../../lib/db';

const handler = async (_, res) => {
  try {
    const results = await sql_query(`
      SELECT waifus.name, waifus.image, series.title AS series
      FROM waifus
      INNER JOIN series ON waifus.seriesId = series.id
      ORDER BY waifus.name
    `);
    return res.json(results);
  } catch (e) {
    return res.status(500).json({error: e.message});
  } 
}

export default handler
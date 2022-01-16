import { sql_query } from "../../lib/db";

async function get(res) {
  const results = await sql_query(`SELECT * FROM series ORDER BY title`);
  return res.json(results);
}

async function post(res, data) {
  console.log(data);
  await sql_query(`
    INSERT INTO series SET
    title = ?,
    slug = ?
  `, [
    data.title,
    data.slug
  ]);
  res.status(200).json(data);
}

export default async function handler(req, res) {
  const data = req.body;
  switch (req.method) {
    case 'GET':
      await get(res);
      break;
    case 'POST':
      await post(res, data);
      break;
  }
}
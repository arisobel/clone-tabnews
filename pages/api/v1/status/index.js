import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbVersion = await database.query({text:"SHOW server_version;"});
  const maxConn  = await database.query({text:"SHOW max_connections;"});
  const databaseName = process.env.POSTGRES_DB;
  const oppened_conections  = await database.query({
    text:`SELECT count(*)::int FROM pg_stat_activity where datname = $1;`,
    values: [databaseName]
  });
  
  response.status(200).json({
    updated_at: updatedAt,
    
    dependencies:{
      database: {
        ver: dbVersion.rows[0].server_version,
        max_conns: parseInt(maxConn.rows[0].max_connections),
        oppened_conections: oppened_conections.rows[0].count
      },
    },
    
  });
}

export default status;
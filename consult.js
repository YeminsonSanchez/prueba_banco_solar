const { Pool } = require("pg");

const config = {
  user: "", //you user here (requered)
  host: "localhost",
  database: "bancosolar",
  password: "", //you password here (requered)
  port: 5432,
};

const pool = new Pool(config);

const newUser = async (payload) => {
  const SQLquery = {
    text: "INSERT INTO usuario (nombre, balance) VALUES ($1, $2) RETURNING *;",
    values: payload,
  };
  try {
    const result = await pool.query(SQLquery);
    console.log(
      "se ha insertado un nuevo registro en la tabla usuario.",
      result.rows[0]
    );

    return result.rows;
  } catch (error) {
    return console.log(error.code, error.message);
  }
};
const allUsers = async () => {
  const SQLquery = {
    text: "SELECT id, nombre, balance FROM usuario;",
  };
  try {
    const result = await pool.query(SQLquery);
    return result.rows;
  } catch (error) {
    return console.log(error.code, error.message);
  }
};

const editUser = async (payload) => {
  const SQLquery = {
    text: "UPDATE usuario SET nombre = $2, balance = $3 WHERE id = $1 RETURNING *;",
    values: payload,
  };
  try {
    console.log(payload);
    const result = await pool.query(SQLquery);
    console.log("se ha actualizado un registro de la tabla usuario.");
    return result.rows[0];
  } catch (error) {
    return console.log(error.code, error.message);
  }
};

const deleteUser = async (id) => {
  const SQLquery = {
    text: "DELETE FROM usuario WHERE id = $1;",
    values: [id],
  };

  const SQLquery2 = {
    text: "DELETE FROM transferencia WHERE emisor = $1 OR receptor = $1;",
    values: [id],
  };
  try {
    const deleteTransfer = await pool.query(SQLquery2);
    const deleteUser = await pool.query(SQLquery);

    console.log(
      "se ha eliminado un registro de la tabla tranferencia con el id: ",
      id
    );
    return deleteUser.rows[0];
  } catch (error) {
    return console.log(error.code, error.message);
  }
};

const newTransfer = async (payload) => {
  const SQLquery = {
    text: "INSERT INTO transferencia (emisor, receptor, monto, fecha) VALUES ((SELECT id FROM usuario WHERE nombre = $1),(SELECT id FROM usuario WHERE nombre = $2), $3, NOW()) RETURNING *;",
    values: [payload[0], payload[1], Number(payload[2])],
  };

  const descontar = {
    text: "UPDATE usuario SET balance = balance - $1 WHERE id = (SELECT id FROM usuario WHERE nombre = $2) RETURNING *",
    values: [Number(payload[2]), payload[0]],
  };

  const acreditar = {
    text: "UPDATE usuario SET balance = balance + $1 WHERE id = (SELECT id FROM usuario WHERE nombre = $2) RETURNING *",
    values: [Number(payload[2]), payload[1]],
  };
  try {
    const client = await pool.connect();
    await client.query("BEGIN");
    await client.query(descontar);
    await client.query(acreditar);
    const insertTranssaction = await client.query(SQLquery);
    console.log("se le ha descontados al usuario: ", payload[0]);
    console.log("se le ha acreditado al usuario: ", payload[1]);
    console.log(
      "transaccion realizada con exito: ",
      insertTranssaction.rows[0]
    );
    await client.query("COMMIT");
    client.release();
  } catch (error_consult) {
    // retorna el error de la consulta por consola
    client.query("ROLLBACK");
    client.release();
    throw (error_consult.code, error_consult.message);
  }
};

const allTransfers = async () => {
  const SQLquery = {
    text: "SELECT t.id, u.nombre AS emisor, us.nombre AS receptor, t.monto, t.fecha FROM transferencia t INNER JOIN usuario u ON t.emisor = u.id INNER JOIN usuario us ON t.receptor = us.id;",
    rowMode: "array",
  };
  try {
    const result = await pool.query(SQLquery);
    return result.rows;
  } catch (error) {
    return console.log(error.code, error.message);
  }
};

module.exports = {
  newUser,
  allUsers,
  editUser,
  deleteUser,
  newTransfer,
  allTransfers,
};

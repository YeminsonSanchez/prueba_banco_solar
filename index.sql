CREATE DATABASE bancosolar;

\c bancosolar;

CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  balance FLOAT CHECK (balance >= 0)
);

CREATE TABLE transferencia (
  id SERIAL PRIMARY KEY,
  emisor INT,
  receptor INT,
  monto FLOAT,
  fecha TIMESTAMP,
  FOREIGN KEY (emisor) REFERENCES usuario(id),
  FOREIGN KEY (receptor) REFERENCES usuario(id)
);
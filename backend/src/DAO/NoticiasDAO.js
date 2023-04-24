import db from "../infra/db.js";

class NoticiasDAO {
  // GET -- Listar todos os notícias
  static listar() {
    const query = "SELECT * FROM NOTICIAS";
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  // POST  --  Criar uma nova notícia
  static inserir(noticia) {
    const query = `INSERT INTO NOTICIAS (genero, titulo, subtitulo, artigo, autor, 
          data, hora) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
      db.run(
        query,
        [
          noticia.genero,
          noticia.titulo,
          noticia.subtitulo,
          noticia.artigo,
          noticia.autor,
          noticia.data,
          noticia.hora
        ],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao inserir a notícia",
              error: err,
            });
          }
          resolve(noticia);
        }
      );
    });
  }

  // GET -- BUSCAR POR Titulo
  static buscarPorTitulo(titulo) {
    const query = "SELECT * FROM NOTICIAS WHERE titulo = ?";
    return new Promise((resolve, reject) => {
      db.get(query, [titulo], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }

  static buscarPorID(id) {
    const query = "SELECT * FROM NOTICIAS WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }

  // PUT  -- Atualizando notícia
  static atualizar(id, noticia) {
    const query = `UPDATE NOTICIAS SET genero = ?, titulo = ?, subtitulo = ?, artigo = ?, 
        autor = ?, data = ?, hora = ?  WHERE id = ?`;

    return new Promise((resolve, reject) => {
      db.run(
        query,
        [
          noticia.genero,
          noticia.titulo,
          noticia.subtitulo,
          noticia.artigo,
          noticia.autor,
          noticia.data,
          noticia.hora,
          id
        ],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao inserir a notícia",
              error: err,
            });
          }
          resolve({
            mensagem: "Nóticia atualizada com sucesso",
          });
        }
      );
    });
  }

  // DELETE -- Deletar notícia pelo id
  static deletar(id) {
    const query = "DELETE FROM NOTICIAS WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o seu notícia",
            erro: err,
          });
        }
        resolve({ mensagem: "Notícia deletada com sucesso", id: id });
      });
    });
  }
}

export default NoticiasDAO
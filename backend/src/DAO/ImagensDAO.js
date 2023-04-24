import db from "../infra/db.js";

class ImagensDAO {

    // GET -- Listar todas as imagens
    static listar() {
        const query = "SELECT * FROM IMAGENS"
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
            })
        })
    }
     
    // POST  --  Criar uma nova imagem
    static inserir(imagem){
         const query = `INSERT INTO IMAGENS (titulo, descricao, url) VALUES (?, ?, ?)`;

         return new Promise((resolve, reject) => {
             db.run(query, 
              [
                imagem.titulo, 
                imagem.descricao, 
                imagem.url,
              ], 
              (err) =>{
                if (err){
                  reject({
                        mensagem: "Erro ao inserir a Imagem",
                        error:err,
                  });
               }
              resolve(imagem);
           });
       });
    }
    
    // GET -- BUSCAR POR Titulo
    static buscarPorTitulo(titulo) {
        const query = "SELECT * FROM IMAGENS WHERE titulo = ?";
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
        const query = "SELECT * FROM IMAGENS WHERE id = ?";
        return new Promise((resolve, reject) => {
          db.get(query, [id], (err, row) => {
            if (err) {
              reject(false);
            }
            resolve(row);
          });
        });
      }

  // PUT  --  Atualizando imagens
  static atualizar(id, imagem){
    const query =
    "UPDATE IMAGENS SET titulo = ?, descricao = ?, url = ? WHERE id = ?";
    return new Promise((resolve, reject) =>{
      db.run(
        query,
        [
        imagem.titulo, 
        imagem.descricao, 
        imagem.url,
        id
        ],
        (err)=>{
          if (err){
            reject({
              mensagem: "Erro ao atualizar a imagem",
              erro: err,
            });
          }
          resolve({
            mensagem: "Imagem atualizada com sucesso"
          });
        }
      );


    });
  }   

    // DELETE -- Deletar uma imagem pelo id
    static deletar(id){
        const query = "DELETE FROM IMAGENS WHERE id = ?";
        return new Promise((resolve,reject) =>{
          db.run(query, [id], (err) =>{
            if(err){
              reject({
                mensagem: "Erro ao deletar a sua imagem",
                erro: err,
              });
            }
            resolve({mensagem: "Imagem deletada com sucesso", id: id});
          });
        });
      }   
}

export default ImagensDAO;

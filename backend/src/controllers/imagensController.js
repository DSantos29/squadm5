// Importa o bd.js para poder usar o banco de dados simulado
import ImagensDAO from "../DAO/ImagensDAO.js"
import Imagens from "../models/Imagens.js"

class imagensController {
    static rotas(app){
        // Rota para o recurso imagem
        app.get('/imagem', imagensController.listar)
        app.post('/imagem', imagensController.inserir)
        app.get("/imagem/:titulo", imagensController.filtrarPorTitulo)
        app.delete("/imagem/id/:id", imagensController.apagarImagem)
        app.put("/imagem/id/:id", imagensController.atualizarImagem)
    }

    // GET -- Listar todas as imagens
    static async listar(req, res){
        const resultado = await ImagensDAO.listar()
        res.send(resultado)

    }

    // POST  --  Criar uma nova imgem
    static async inserir(req, res) {
        const imagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            url: req.body.url
        }

        if (!imagem || !imagem.titulo || !imagem.descricao || !imagem.url) {
            res.status(400).send("Precisa passar as informações")
            return
        }


        const result = await ImagensDAO.inserir(imagem)


        if (result.erro) {
            res.status(500).send(result)
        }

        res.status(201).send({ "Mensagem": "imagem inserida com sucesso", "Nova imagem: ": imagem })
    }

    // GET -- BUSCAR POR TITULO
    static async filtrarPorTitulo(req, res){
        const imagem = await ImagensDAO.buscarPorTitulo(req.params.titulo)

        if (!imagem) {

            res.status(404).send("titulo da imagem não encontrado")
        }

        res.status(200).send(imagem)      
    }

    // DELETE -- Deletar uma imagem pelo id
    static async apagarImagem(req, res){
       const imagem = await ImagensDAO.buscarPorID(req.params.id)

       if(!imagem){
           res.status(404).send("Imagem não encontrada")
           return
       }

       const result = await ImagensDAO.deletar(req.params.id)

       if(result.erro){
            res.status(400).send({ 'Mensagem': 'Imagem não deletado' })
            return
       }

       res.status(200).send(result)
    }

    // PUT -- Atualizar uma Imagem
    static async atualizarImagem(req, res) {
        const id = await ImagensDAO.buscarPorID(req.params.id)
        if (!id) {
            res.status(404).send('imagem não encontrado')
            return
        }

        const imagem = new Imagens(req.body.titulo, req.body.descricao, req.body.url)



        if (!imagem || !imagem.titulo || !imagem.descricao || !imagem.url) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }

        if (!Object.keys(imagem).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }

        const result = await ImagensDAO.atualizar(req.params.id, imagem)

        if (result.erro) {
            res.status(500).send('Erro ao atualizar a imagem')
            return
        }

        res.status(200).send({ "Mensagem": "Dados atualizados", "imagem: ": imagem })

    }      
}

export default imagensController
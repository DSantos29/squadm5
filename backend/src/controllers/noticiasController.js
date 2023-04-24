// Importa o bd.js para poder usar o banco de dados simulado
import NoticiasDAO from "../DAO/NoticiasDAO.js"
import Noticias from "../models/Noticias.js"

class noticiasController {
    static rotas(app){
        // Rota para o recurso notícias
        app.get('/noticia', noticiasController.listar)
        app.post('/noticia', noticiasController.inserir)
        app.get("/noticia/:titulo", noticiasController.filtrarPorTitulo)
        app.delete("/noticia/id/:id", noticiasController.apagarNoticia)
        app.put("/noticia/id/:id", noticiasController.atualizarNoticia)
    }

    // GET -- Listar todos os usuários
    static async listar(req, res){
        const resultado = await NoticiasDAO.listar()
        res.send(resultado)
    }

    // POST  --  Criar um novo usuário
    static async inserir(req, res) {
        const noticia = {
            genero: req.body.genero,
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            artigo: req.body.artigo,
            autor: req.body.autor,
            data: req.body.data, 
            hora: req.body.hora
        }

        if (!noticia || !noticia.genero || !noticia.titulo || !noticia.subtitulo || !noticia.artigo || !noticia.autor || !noticia.data || !noticia.hora) {
            res.status(400).send("Precisa passar as informações")
            return
        }

        const result = await NoticiasDAO.inserir(noticia)

        if (result.erro) {
            res.status(500).send(result)
        }

        res.status(201).send({ "Mensagem": "noticia criado com sucesso", "Nova noticia: ": noticia })
    }

    // GET -- BUSCAR POR TITULO
    static async filtrarPorTitulo(req, res){
        const noticia = await NoticiasDAO.buscarPorTitulo(req.params.titulo)

        if (!noticia) {

            res.status(404).send("titulo não encontrado")
        }

        res.status(200).send(n)      
    }

    // DELETE -- Deletar notícia pelo id
    static async apagarNoticia(req, res){
       const noticia = await NoticiasDAO.buscarPorID(req.params.id)

       if(!noticia){
           res.status(404).send("Notícia não encontrado")
           return
       }

       const result = await NoticiasDAO.deletar(req.params.id)

       if(result.erro){
            res.status(400).send({ 'Mensagem': 'Notícia não deletada' })
            return
       }

       res.status(200).send(result)
    }

    // PUT -- Atualizar notícia
    static async atualizarNoticia(req, res) {
        const id = await NoticiasDAO.buscarPorID(req.params.id)
        if (!id) {
            res.status(404).send('Noticia não encontrada')
            return
        }

        const noticia = new Noticias(
            req.body.genero,
            req.body.titulo,
            req.body.subtitulo,
            req.body.artigo,
            req.body.autor,
            req.body.data, 
            req.body.hora
        )

        if (!noticia || !noticia.genero || !noticia.titulo || !noticia.subtitulo || !noticia.artigo || !noticia.autor || !noticia.data || !noticia.hora) {
            res.status(400).send("Precisa passar as informações")
            return
        }

        if (!Object.keys(noticia).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }

        const result = await NoticiasDAO.atualizar(req.params.id, noticia)

        if (result.erro) {
            res.status(500).send('Erro ao atualizar o usuario')
            return
        }

        res.status(200).send({ "Mensagem": "Dados atualizados", "notícia: ": noticia })

    }      
}

export default noticiasController

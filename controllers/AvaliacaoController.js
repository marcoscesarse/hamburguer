import Avaliacao from "../models/Avaliacao.js";
import Pedido from "../models/Pedido.js";

const AvaliacaoController = {
    create: async (req, res) => {
        try {
            const { nota, pedido_id } = req.body;
            if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
                return res.status(400).json({ error: 'Nota deve ser um inteiro entre 1 e 5' });
            }
            const pedido = await Pedido.findByPk(pedido_id);
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido nao encontrado' });
            }
            const avaliacao = await Avaliacao.create(req.body);
            res.status(201).json(avaliacao);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const avaliacoes = await Avaliacao.findAll();
            if (avaliacoes.length === 0) {
                throw new Error('Nenhuma avaliacao encontrada');
            }
            res.status(200).json(avaliacoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    findById: async (req, res) => {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id);
            if (!avaliacao) {
                return res.status(404).json({ error: 'Avaliacao nao encontrada' });
            }
            res.status(200).json(avaliacao);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id);
            if (!avaliacao) {
                return res.status(404).json({ error: 'Avaliacao nao encontrada' });
            }
            if (req.body.nota && (!Number.isInteger(req.body.nota) || req.body.nota < 1 || req.body.nota > 5)) {
                return res.status(400).json({ error: 'Nota deve ser um inteiro entre 1 e 5' });
            }
            await avaliacao.update(req.body);
            res.status(200).json(avaliacao);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id);
            if (!avaliacao) {
                return res.status(404).json({ error: 'Avaliacao nao encontrada' });
            }
            await avaliacao.destroy();
            res.status(200).json({ message: 'Avaliacao excluida com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    restaure: async (req, res) => {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id, { paranoid: false });
            if (!avaliacao) {
                return res.status(404).json({ error: 'Avaliacao nao encontrada' });
            }
            await avaliacao.restore();
            res.status(200).json({ message: 'Avaliacao restaurada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default AvaliacaoController;

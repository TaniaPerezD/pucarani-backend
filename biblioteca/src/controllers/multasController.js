const multasService = require('../services/multasService');


const getAllMultas = async (req, res) => {
  try {
    const multas = await multasService.getAllMultas();
    res.json(multas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMultasById = async (req, res) => {
  try {
    const multa = await multasService.getMultasById(req.params.id);
    if (!multa) {
      return res.status(404).json({ message: 'Multa no encontrado' });
    }
    res.json(multa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMultas = async (req, res) => {
  try {
    const multa = await multasService.createMultas(req.body);
    res.status(201).json(multa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMultas = async (req, res) => {
  try {
    const multa = await multasService.updateMultas(req.params.id, req.body);
    if (!multa) {
      return res.status(404).json({ message: 'Multa no encontrado' });
    }
    res.json(multa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMultas = async (req, res) => {
  try {
    const multa = await multasService.deleteMultas(req.params.id);
    if (!multa) {
      return res.status(404).json({ message: 'Multa no encontrado' });
    }
    res.json({ message: 'Multa eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMultas,
  getMultasById,
  createMultas,
  updateMultas,
  deleteMultas
};

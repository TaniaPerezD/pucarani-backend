const devService = require('../services/estadosService');

const getAllDev = async (req, res) => {
  try {
    const dev = await devService.getAllDev();
    res.json(dev);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDevById = async (req, res) => {
  try {
    const dev = await devService.getDevById(req.params.id);
    if (!dev) {
      return res.status(404).json({ message: 'Dev no encontrado' });
    }
    res.json(dev);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDev = async (req, res) => {
  try {
    const dev = await devService.createDev(req.body);
    res.status(201).json(dev);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateDev = async (req, res) => {
  try {
    const dev = await devService.updateDev(req.params.id, req.body);
    if (!dev) {
      return res.status(404).json({ message: 'Dev no encontrado' });
    }
    res.json(dev);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDev = async (req, res) => {
  try {
    const dev = await devService.deleteDev(req.params.id);
    if (!dev) {
      return res.status(404).json({ message: 'Dev no encontrado' });
    }
    res.json({ message: 'Dev eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllDev,
    getDevById,
    createDev,
    updateDev,
    deleteDev
};

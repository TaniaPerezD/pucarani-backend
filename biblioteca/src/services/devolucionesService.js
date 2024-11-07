const Devolucion = require('../models/devolucionesModel'); 

const getAllDev = async () => {
  return await Devolucion.findAll();
};

const getDevById = async (id) => {
  return await Devolucion.findByPk(id);
};


const createDev = async (data) => {
  return await Devolucion.create(data);
};


const updateDev = async (id, data) => {
  const dev = await Devolucion.findByPk(id);
  if (dev) {
    return await dev.update(data);
  }
  return null;
};

const deleteDev = async (id) => {
  const dev = await Devolucion.findByPk(id);
  if (dev) {
    return await dev.destroy();
  }
  return null;
};

module.exports = {
  getAllDev,
  getDevById,
  createDev,
  updateDev,
  deleteDev,
};
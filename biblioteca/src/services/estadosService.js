const Estado = require('../models/estadosModel'); 

const getAllDev = async () => {
  return await Estado.findAll();
};

const getDevById = async (id) => {
  return await Estado.findByPk(id);
};


const createDev = async (data) => {
  return await Estado.create(data);
};


const updateDev = async (id, data) => {
  const dev = await Estado.findByPk(id);
  if (dev) {
    return await dev.update(data);
  }
  return null;
};

const deleteDev = async (id) => {
  const dev = await Estado.findByPk(id);
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
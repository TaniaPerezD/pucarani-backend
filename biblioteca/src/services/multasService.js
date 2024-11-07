const Multa = require('../models/multasModel'); 

const getAllMultas = async () => {
  return await Multa.findAll();
};

const getMultasById = async (id) => {
  return await Multa.findByPk(id);
};


const createMultas = async (data) => {
  return await Multa.create(data);
};


const updateMultas = async (id, data) => {
  const multa = await Multa.findByPk(id);
  if (multa) {
    return await multa.update(data);
  }
  return null;
};

const deleteMultas = async (id) => {
  const multa = await Multa.findByPk(id);
  if (multa) {
    return await multa.destroy();
  }
  return null;
};

module.exports = {
  getAllMultas,
  getMultasById,
  createMultas,
  updateMultas,
  deleteMultas,
};
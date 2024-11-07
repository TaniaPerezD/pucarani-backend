const Prestamo = require('../models/prestamoModel'); 

const getAllPrestamos = async () => {
  return await Prestamo.findAll();
};

const getPrestamoById = async (id) => {
  return await Prestamo.findByPk(id);
};


const createPrestamo = async (data) => {
  return await Prestamo.create(data);
};


const updatePrestamo = async (id, data) => {
  const prestamo = await Prestamo.findByPk(id);
  if (prestamo) {
    return await prestamo.update(data);
  }
  return null;
};

const deletePrestamo = async (id) => {
  const prestamo = await Prestamo.findByPk(id);
  if (prestamo) {
    return await prestamo.destroy();
  }
  return null;
};

module.exports = {
  getAllPrestamos,
  getPrestamoById,
  createPrestamo,
  updatePrestamo,
  deletePrestamo,
};
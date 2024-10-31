const Libro = require('../models/libroModel'); 

const getAllLibros = async () => {
  return await Libro.findAll();
};

const getLibroById = async (id) => {
  return await Libro.findByPk(id);
};


const createLibro = async (data) => {
  return await Libro.create(data);
};


const updateLibro = async (id, data) => {
  const libro = await Libro.findByPk(id);
  if (libro) {
    return await libro.update(data);
  }
  return null;
};

const deleteLibro = async (id) => {
  const libro = await Libro.findByPk(id);
  if (libro) {
    return await libro.destroy();
  }
  return null;
};

module.exports = {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro,
};

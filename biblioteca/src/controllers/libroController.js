const libroService = require('../services/libroService');


const getAllLibros = async (req, res) => {
  try {
    const libros = await libroService.getAllLibros();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLibroById = async (req, res) => {
  try {
    const libro = await libroService.getLibroById(req.params.id);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateEstadoLibro = async (req, res) => {
  const { id } = req.params;  // ID del libro a actualizar
  const { estado } = req.body;  // Nuevo estado que le vamos a asignar al libro

  try {
    // Buscar el libro por ID
    const libro = await libroService.getLibroById(id);
    
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    // Actualizar el estado del libro
    libro.idestado = estado;  // Actualizamos el estado del libro
    await libro.save();  // Guardamos el cambio

    res.status(200).json(libro);  // Respondemos con el libro actualizado
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLibro = async (req, res) => {
  try {
    const libro = await libroService.createLibro(req.body);
    res.status(201).json(libro);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateLibro = async (req, res) => {
  try {
    const libro = await libroService.updateLibro(req.params.id, req.body);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteLibro = async (req, res) => {
  try {
    const libro = await libroService.deleteLibro(req.params.id);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro,
  updateEstadoLibro
};

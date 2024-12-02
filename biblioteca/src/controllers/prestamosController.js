const prestamoService = require('../services/prestamoService');


const getAllPrestamos = async (req, res) => {
  try {
    const prestamos = await prestamoService.getAllPrestamos();
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateEstadoPrestamo = async (req, res) => {
  const { id } = req.params;  // ID del libro a actualizar
  const { estado } = req.body;  // Nuevo estado que le vamos a asignar al libro

  try {
    // Buscar el libro por ID
    const prestamo = await prestamoService.getPrestamoById(id);
    
    if (!prestamo) {
      return res.status(404).json({ message: 'Prestamo no encontrado' });
    }

    // Actualizar el estado del libro
    prestamo.estados_idestado = estado;  // Actualizamos el estado del libro
    await prestamo.save();  // Guardamos el cambio

    res.status(200).json(prestamo);  // Respondemos con el libro actualizado
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrestamoById = async (req, res) => {
  try {
    const prestamo = await prestamoService.getPrestamoById(req.params.id);
    if (!prestamo) {
      return res.status(404).json({ message: 'Prestamo no encontrado' });
    }
    res.json(prestamo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPrestamo = async (req, res) => {
  try {
    const prestamo = await prestamoService.createPrestamo(req.body);
    res.status(201).json(prestamo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePrestamo = async (req, res) => {
  try {
    const prestamo = await prestamoService.updatePrestamo(req.params.id, req.body);
    if (!prestamo) {
      return res.status(404).json({ message: 'Prestamo no encontrado' });
    }
    res.json(prestamo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePrestamo = async (req, res) => {
  try {
    const prestamo = await prestamoService.deletePrestamo(req.params.id);
    if (!prestamo) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json({ message: 'Prestamo eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPrestamos,
  getPrestamoById,
  createPrestamo,
  updatePrestamo,
  deletePrestamo,
  updateEstadoPrestamo
};

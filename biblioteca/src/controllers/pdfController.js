const minioClient = require('../config/minioClient');

const bucketName = 'pdf-bucket'; // Define tu bucket aquí

// Subir un archivo
const uploadPdf = async (req, res) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({ error: 'No se encontró un archivo en la solicitud' });
      }
  
      const file = req.files.file; // Archivo enviado desde Postman
      const fileName = file.name; // Nombre del archivo
      const metaData = { 'Content-Type': file.mimetype };
  
      console.log('Subiendo archivo:', fileName);
  
      await minioClient.putObject('pdf-bucket', fileName, file.data, metaData);
      res.status(200).json({ message: `Archivo ${fileName} subido correctamente` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al subir el archivo' });
    }
  };
  

// Descargar un archivo
const downloadPdf = async (req, res) => {
  try {
    const { fileName } = req.params;
    const fileStream = await minioClient.getObject(bucketName, fileName);

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    fileStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
};

// Listar archivos
const listPdfs = async (req, res) => {
  try {
    const stream = minioClient.listObjects(bucketName, '', true);
    const files = [];

    stream.on('data', (obj) => files.push(obj.name));
    stream.on('end', () => res.status(200).json({ files }));
    stream.on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Error al listar archivos' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al listar archivos' });
  }
};

// Eliminar un archivo
const deletePdf = async (req, res) => {
  try {
    const { fileName } = req.params;
    await minioClient.removeObject(bucketName, fileName);
    res.status(200).json({ message: `Archivo ${fileName} eliminado correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el archivo' });
  }
};

module.exports = { uploadPdf, downloadPdf, listPdfs, deletePdf };

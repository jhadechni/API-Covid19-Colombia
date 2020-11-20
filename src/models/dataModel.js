const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    Caso:{
      type: Number,
      required: true
    },
    Departamento : String,
    Departamento_nom: String,
    Ciudad_municipio: String,
    Ciudad_municipio_nom : String,
    Edad : Number,
    Sexo: String,
    Fuente_tipo_contagio : String,
    Ubicacion : String,
    Estado : String,
    Recuperado: String,
    Fecha_muerte : String,
    Fecha_diagnostico : String,
    Fecha_recuperado : String,
    Tipo_recuperacion : String
    }
  );


module.exports = mongoose.model('CovidData',userSchema);
/* 3) inserción y actualización de varios registros. */

const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', '1106', {
    host: 'localhost',
    dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize.authenticate().then(() => {
    console.log('conexión a sido establecida satisfactoriamente.');
})
.catch(err => {
    console.error('Incapacidad de conectarse a la base de datos:', err);
});

class Personas extends Sequelize.Model{}
Personas.init({
    nombre: Sequelize.STRING,
    apellido:Sequelize.STRING,
    edad: Sequelize.INTEGER,
    sexo: Sequelize.CHAR
}, {sequelize, modelName: 'personas'});


/* Crear persona */
sequelize.sync()
.then(() => Personas.bulkCreate([
    { nombre: 'Gonzalo', apellido:'Gomez', edad:23,sexo:'m'},
    { nombre: 'Joaquin', apellido:'Cruz', edad:28,sexo:'m'},
    { nombre: 'Florencia', apellido:'Victoria', edad:25,sexo:'f'},
],
{
    ignoreDuplicates: false,
}))
.then(() => console.log("personas agregadas"));

/* Actualiza personas */
Personas.update(
    {sexo: 'f'},
    {
        where:{
            sexo:'m'
        },
    }
);
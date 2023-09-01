/* 1) Inserción y actualización de un registro.  */


const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', '1106', {
    host: 'localhost',
    dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
    .authenticate()
    .then(() => {
        console.log('La conexión a sido establecida con excito');
    })
    .catch(err => {
        console.error('No se puede conectar a la base de datos:', err);
    });


class Personas extends Sequelize.Model{}

/* Modelado Persona*/

Personas.init(
    {
        nombre: Sequelize.STRING,
        apellido: Sequelize.STRING,
        edad: Sequelize.INTEGER,
        sexo: Sequelize.CHAR
    },
    {
        sequelize, 
        modelName:'personas'
    }
);

/* Crea persona */
sequelize.sync()
.then(() => Personas.create({
    nombre: 'Luis',
    apellido:'Herenu',
    edad:26,
    sexo:'m'
}))
.then(persona => {
    console.log(persona.toJSON());
});

/* Actualiza persona */
Personas.update({nombre: 'Luis Marcelo'},{
    where:{
        id:'1'
    }
}).then(() => {
    console.log('actualización finalizada');
});

// generate.js
const fs = require('fs');
const path = require('path');

// Obtén el nombre del modelo del argumento de la consola
const modelName = process.argv[2];

if (!modelName) {
    console.error('Por favor, proporciona un nombre para el modelo.');
    process.exit(1);
}

// Define los nombres de los archivos
const modelFileName = `${modelName}.js`;
const controllerFileName = `${modelName}Controller.js`;

// Define las plantillas para los archivos
const modelTemplate = `// _models/${modelFileName}
const db = require('../_database');

class ${modelName} {
    static findAll() {
        return db.query('SELECT * FROM ${modelName}');
    }

    static findById(id) {
        return db.query('SELECT * FROM ${modelName} WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static create(data) {
        return db.query('INSERT INTO ${modelName} SET ?', data)
            .then(result => ({ id: result.insertId, ...data }));
    }
}

module.exports = ${modelName};
`;

const controllerTemplate = `// _controllers/${controllerFileName}
const models = require('../_models');

class ${modelName}Controller {
    static async getAll(req, res) {
        try {
            const items = await models.${modelName}.findAll();
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const item = await models.${modelName}.findById(req.params.id);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const item = await models.${modelName}.create(req.body);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = ${modelName}Controller;
`;

// Crea los archivos en los directorios correspondientes
fs.writeFile(path.join(__dirname, '_models', modelFileName), modelTemplate, (err) => {
    if (err) {
        console.error('Error al crear el archivo del modelo:', err);
    } else {
        console.log(`Archivo de modelo creado: _models/${modelFileName}`);
    }
});

fs.writeFile(path.join(__dirname, '_controllers', controllerFileName), controllerTemplate, (err) => {
    if (err) {
        console.error('Error al crear el archivo del controlador:', err);
    } else {
        console.log(`Archivo de controlador creado: _controllers/${controllerFileName}`);
    }
});

// Actualizar el índice de _models
const modelsIndexPath = path.join(__dirname, '_models', 'index.js');
fs.readFile(modelsIndexPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el índice de _models:', err);
    } else {
        const updatedModelsIndex = data + `\nconst ${modelName} = require('./${modelFileName}');\nmodule.exports.${modelName} = ${modelName};`;
        fs.writeFile(modelsIndexPath, updatedModelsIndex, (err) => {
            if (err) {
                console.error('Error al actualizar el índice de _models:', err);
            } else {
                console.log('Índice de _models actualizado.');
            }
        });
    }
});

// Actualizar el índice de _controllers
const controllersIndexPath = path.join(__dirname, '_controllers', 'index.js');
fs.readFile(controllersIndexPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el índice de _controllers:', err);
    } else {
        const updatedControllersIndex = data + `\nconst ${modelName}Controller = require('./${controllerFileName}');\nmodule.exports.${modelName}Controller = ${modelName}Controller;`;
        fs.writeFile(controllersIndexPath, updatedControllersIndex, (err) => {
            if (err) {
                console.error('Error al actualizar el índice de _controllers:', err);
            } else {
                console.log('Índice de _controllers actualizado.');
            }
        });
    }
});
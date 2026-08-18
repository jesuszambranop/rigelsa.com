const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
global.window = {};
require(path.join(root, 'js', 'data.js'));
require(path.join(root, 'js', 'inventario-bilingue.js'));

const data = global.window.RIGEL_DATA;
const errors = [];

function checkUnique(items, label) {
  const values = items.map(item => item.slug);
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) errors.push(`${label}: slugs duplicados: ${[...new Set(duplicates)].join(', ')}`);
}

function localPath(value) {
  return String(value || '').replace(/^\//, '').split(/[?#]/, 1)[0];
}

function collectAssets(items) {
  const result = [];
  for (const item of items) {
    for (const value of [item.imagen, item.ficha, item.fichaEn, ...(item.galeria || []), ...(item.imagenes || [])]) {
      if (value && !/^https?:/i.test(value)) result.push(localPath(value));
    }
  }
  return result;
}

if (!data) errors.push('window.RIGEL_DATA no fue creado.');
if (data) {
  if (!data.productos.length) errors.push('El catálogo en español está vacío.');
  if (data.productos.length !== data.productosEn.length) errors.push('Los catálogos ES y EN tienen tamaños diferentes.');
  if (data.articulos.length !== data.articulosEn.length) errors.push('Los blogs ES y EN tienen tamaños diferentes.');
  checkUnique(data.productos, 'Productos');
  checkUnique(data.articulos, 'Artículos');

  const assets = [...new Set(collectAssets([
    ...data.productos,
    ...data.productosEn,
    ...data.articulos,
    ...data.articulosEn
  ]))];
  for (const asset of assets) {
    const target = path.join(root, asset);
    if (!fs.existsSync(target)) errors.push(`Recurso inexistente: ${asset}`);
    else if (!fs.statSync(target).size) errors.push(`Recurso vacío: ${asset}`);
  }

  console.log(`Catálogo: ${data.productos.length} productos ES / ${data.productosEn.length} productos EN`);
  console.log(`Blog: ${data.articulos.length} artículos ES / ${data.articulosEn.length} artículos EN`);
  console.log(`Recursos dinámicos comprobados: ${assets.length}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Datos dinámicos correctos.');

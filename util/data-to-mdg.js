const io = require("../lib/io");

function buildMDG(path = "") {
  let namePattern = /([\w\.-_]+)/gm;
  let edgePattern = /^([\w\.-_]+)\s+([\w\.-_]+)/gm;
  let matrix = [];
  let modules = [];
  let edges = [];
  let rawData = "";

  return new Promise((resolve, reject) => {
    io.readFile(path, (err, data) => {
      if (err)
        reject(err);
      rawData = data.toString();
      rawData = rawData.replace(/\b\s+$/gm, "");
      rawData = rawData.replace(/\s{2,}}/gm, " ");
      edges = rawData.match(edgePattern);
      modules = rawData.match(namePattern);
      modules = modules.reduce(function (acc, curr) {
        if (acc.indexOf(curr) == -1)
          acc.push(curr);
        return acc;
      }, []);

      for (let i = 0; i < modules.length; i++) {
        matrix.push(new Array(modules.length));
        for (let j = 0; j < modules.length; j++) {
          if (i === j) {
            matrix[i][j] = 0;
            continue;
          }
          matrix[i][j] = Number(
            (edges.indexOf(`${modules[i]} ${modules[j]}`) > -1) || (edges.indexOf(`${modules[j]} ${modules[i]}`) > -1)
          );
        }
      }

      resolve({
        modules: modules,
        matrix: matrix,
        edgeCount: edges.length,
        moduleCount: modules.length
      });

    });
  });
}

module.exports = buildMDG;
const dataToMDG = require("./util/data-to-mdg");
const clusterInfo = require("./util/clustering-info");
const PESA = require("./src/PESA/pesa");
const initObjectives = require("./src/init-objectives");
const io = require("./lib/io");
const path = require("path");
const uid = require("./lib/uid");
const createDot = require("./util/chrom-to-dot");
const dotOutput = require("./util/dot-to-output");
const plotlib = require("nodeplotlib");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: path.resolve(__dirname, `output/data.csv`),
  header: [
    { id: 'id', title: 'ID' },
    { id: 'algorithm', title: 'ALGORITHM' },
    { id: 'dataset', title: 'DATASET' },
    { id: 'date', title: 'DATE' },
    { id: 'mq', title: 'MQ' },
    { id: 'cohesion', title: 'TOTAL COHESION' },
    { id: 'coupling', title: 'TOTAL COUPLING' },
    { id: 'stddev', title: 'CLUSTERS STDDEV' },
    { id: 'clusters', title: 'NUMBER OF CLUSTERS' },    
    { id: 'edges', title: 'NUMBER OF EDGES' },
    { id: 'nodes', title: 'NUMBER OF MODULES' },
  ]
});

let datasets = {
  "bison": [],
  "cia": [],
  "dot": [],
  "ispell": [],
  "mtunis": [],
  "nos": [],
  "rcs": [],
  "stunnel": [],
  "telnet2": [],
  "xtell": [],
  "php": [],
  "grappa": [],
  "acqCIGNA": []
};

async function runPESA() {  
  
  let plotData = [];
  let layout = {
    title: 'PESA',
    autosize: false,
    width: 1000,
    height: 1000,
    margin: {
      l: 65,
      r: 50,
      b: 65,
      t: 90,
    },
    scene: {
      xaxis: { title: 'cohesion' },
      yaxis: { title: 'MQ' },
      zaxis: { title: 'cluster count' },
    },
  };

  let runs = 5;
  let counter = 0;

  // clustering params
  let dataset = null;
  let mdg = null;
  let fronts = [];
  let itter = 3500;
  let nP = 50;
  let nE = 50;
  let nG = 150;
  let pC = 0.8;
  let pM = 0.2;
  let lowerBound = 1;
  let upperBound = null;
  let chrmLength = null;
  let objs = null;

  while (counter < runs) {
    let id = uid();
    for (let i = 0, n = Object.keys(datasets).length; i < n; i++) {
      dataset = Object.keys(datasets)[i];
      mdg = await dataToMDG(`./dataset/${dataset}`);
      upperBound = mdg.modules.length / 2;
      chrmLength = mdg.modules.length;
      objs = initObjectives(mdg.matrix);

      console.log(`Runing PESA on ${dataset} ...`);
      fronts = PESA(itter, nP, nE, nG, objs, chrmLength, lowerBound, upperBound, pC, pM);
      
      let plot = new Plot(dataset, "scatter3d");
      fronts.forEach(item => {        
        plot.x.push(item.getCohesion(mdg.matrix));
        plot.y.push(item.getMQ(mdg.matrix));
        plot.z.push(item.getClusterNumber(mdg.matrix));
      });
      plotData.push(plot);

      let bestSln = fronts.sort((a, b) => b.objectives[2] - a.objectives[2])[0];

      console.log(`Creating output for ${dataset} ...`);
      datasets[dataset].push(await createLog(bestSln, mdg, dataset, id));
    }
    console.log(`creating plot ...`);
    plotlib.plot(plotData, layout);
    plotData = [];
    counter++;
  }

  console.log(`Writing log file ...`);
  for (let i = 0, n = Object.keys(datasets).length; i < n; i++) {
    let key = Object.keys(datasets)[i];
    for (let j = 0; j < datasets[key].length; j++) {
      await csvWriter.writeRecords(datasets[key][j]);
    }
  }

}

function createLog(sln, mdg, dataset, logID) {
  return new Promise((resolve, reject) => {
    let info = getInfo(sln.chromosome, mdg);
    let dot = createDot(mdg.modules, mdg.matrix, sln, info);
    let dotPath = path.resolve(__dirname, `output/${dataset}-${logID}.dot`);
    let outputPath = path.resolve(__dirname, `output`);
    let log = [{
      id: logID,
      algorithm: "PESA",
      dataset: dataset,
      date: new Date().toLocaleDateString('en-US', { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      mq: info.mq,
      cohesion: info.cohesion,
      coupling: info.coupling,
      stddev: info.clusterStdDev,
      clusters: info.clusterCount,
      nodes: info.moduleCount,
      edges: info.edgeCount
    }];

    io.createFile(`./output/${dataset}-${logID}.dot`, dot, (err) => {
      if (err) reject(err);
      dotOutput(dotPath, outputPath, `${dataset}-${logID}`, "pdf", (err) => {
        if (err) reject(err);
        else resolve(log);
      });
    });
  });
}

function getInfo(chromosome, mdg) {
  return {
    mq: clusterInfo.mq(chromosome, mdg.matrix),
    cohesion: clusterInfo.cohesion(chromosome, mdg.matrix),
    coupling: clusterInfo.coupling(chromosome, mdg.matrix),
    moduleCount: mdg.moduleCount,
    edgeCount: mdg.edgeCount,
    clusterCount: clusterInfo.clusterCount(chromosome),
    clusterStdDev: clusterInfo.clusterStdDev(chromosome)
  }
}

function Plot(name = "", type = "scatter3d", mode = "markers") {
  return { name: name, x: [], y: [], z: [], type: type, mode: mode };
}

runPESA();



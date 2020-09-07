
function createDot(moduleList = [], mdg = [], solution, lable, width = 500, height = 500, rotate = 0) {
  let data = `
/*-----------------------------------------*/
/* Software Module Clustering With NSGA-II */
/* Author: Ahmad-Fz                        */
/*-----------------------------------------*/
digraph G {
graph [label="
MQ: ${lable.mq}
Cohesion: ${lable.cohesion}
Coupling: ${lable.coupling}
Number of edges: ${lable.edgeCount}
Number of modules: ${lable.moduleCount}
Number of clusters: ${lable.clusterCount}", labelloc=t, labeljust=l, fontsize=15]
size= "${width},${height}";
rotate = ${rotate};
${ addSubGraphs(solution.chromosome, moduleList)}
${ addNodesConnections(mdg, moduleList)}
}`;

  return data;
}

function addSubGraphs(chromosome = [], moduleList = []) {
  let strSubGraph = "";
  let strModules = "";
  let clusterNum = 0;
  let clusters = getClusterList(chromosome);
  let modules = [];



  Object.keys(clusters).forEach(key => {
    strModules = "";
    modules = getClusterModules(Number(key), chromosome, moduleList);

    modules.forEach(item => {
      strModules += `"${item}"[label="${item}",shape=ellipse,color=lightblue,fontcolor=black,style=filled];\r\n`;
    });

    strSubGraph += `
subgraph cluster${clusterNum + 1} {
label = "Cluster::${clusterNum + 1}";
color = black;
style = bold;
    
${strModules}
}\r\n`;
    clusterNum++;
  });

  return strSubGraph;
}

function addNodesConnections(mdg = [], modulesList = []) {
  let edges = "";

  for (let row = 0; row < mdg.length; row++) {
    for (let col = row + 1; col < mdg.length; col++) {
      if (mdg[row][col] === 1)
        edges += `"${modulesList[row]}" -> "${modulesList[col]}" [color=blue,font=6,arrowhead=none];\r\n`;
    }
  }

  return edges;

}

function getClusterList(chromosome = []) {
  return chromosome.reduce(function (acc, cur) {
    if (cur in acc) {
      acc[cur]++;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {});
}

function getClusterModules(clusterNumber, chromosome = [], modulesList = []) {
  let modules = [];
  chromosome.forEach((item, index) => {
    if (item === clusterNumber)
      modules.push(modulesList[index]);
  });
  return modules;
}

module.exports = createDot;
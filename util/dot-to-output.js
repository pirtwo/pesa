const { exec } = require("child_process");

function dotToOutput(dotPath, outputPath, outputName, outputFormat, callback) {
  let operator = getOperator(outputFormat.toLowerCase());
  let command = `dot ${operator} ${dotPath} -o ${outputPath + '/' + outputName + '.' + outputFormat}`;
  exec(command, callback);
}

function getOperator(outputFormat) {
  let opt = "";
  switch (outputFormat) {
    case "png":
      opt = "-Tpng";
      break;
    case "svg":
      opt = "-Tsvg";
      break;
    case "png":
      opt = "-Tpng";
      break;
    case "pdf":
      opt = "-Tpdf";
      break;
    default:
      opt = "-Tsvg";
      break;
  }
  return opt;
}

module.exports = dotToOutput;
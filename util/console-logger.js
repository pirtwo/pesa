function consoleLogger(solutions = [], modules = []) {
  console.log(modules);
  solutions.forEach(sln => {
    console.log(`Rank = ${s.rank} objs = ${s.objectives}`);
  });
}
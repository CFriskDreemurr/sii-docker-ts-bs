module.exports = {
    apps : [{
      script    : "src\index.ts",
      instances : "3",
      exec_mode : "cluster"
    }]
  }
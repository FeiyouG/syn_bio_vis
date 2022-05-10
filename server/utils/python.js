// import { exec } from "child_process";
//
// export const run_python = function(argv, res) {
//   var argv_str = ""
//
//   for (var i = 0; i < argv.length; i++) {
//     // argv_str += `${argv[i]} `.replace(/\n/g, "\\n").replace(\(, "\(");
//     argv_str += `${argv[i]} `;
//   }
//
//   console.log(argv_str)
//
//   exec(`python ${argv_str}`, res);
// }


import { spawn } from 'child_process'

/**
* @param  path      the path to the python scripts
* @param  args      list of arguments for the python scripts
* @param  callback  function invoked when child process exits;
*                   first parameter is a status code,
*                   second parameter is a data or error message
*/
export const runPython = function(path, args, callback) {

  var stdout = ""
  var stderr = ""

  args.unshift(path)
  const child = spawn("python", args)

  child.stdout.on('data', (data) => stdout += data)
  child.stderr.on('data', (data) => stderr += data)
  child.on('error', (error) => {
    // console.error(`Simulation failed to start:\n${error}}`)
    error(500, "Internal Server Error")
  })

  child.on('exit', (code, signal) => {
    // console.log(stderr)
    if (code == 0) {
      // console.log(`Simulation successfully`)
      callback(200, stdout)
    } else {
      // console.error(`subprocess finished simulation with code ${code} and signal ${signal} with error:\n${error}`);
      callback(400, { message: "Bad syntax in *.pil file" })
    }
  })

}

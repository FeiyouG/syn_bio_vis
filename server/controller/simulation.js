import { json } from "body-parser";
const {PythonShell} = require('python-shell');

export const getSimRes = async (req, res) => {
  try {
    console.log("Fetching simulation result");
  } catch (error) {
    // TODO: correctly handle error
    res.status(404).json({ message: error.message });
  }
}

export const startSimReq = async (req, res) => {
  try {
    console.log("Start simulation");
  } catch (error) {
    // TODO: correctly handle error
    res.status(404).json({ message: error.message });
  }
}

export const runPython = async(req, res) => {
  // need to pass in arguments with req probably
  try {
    let options = {
      mode: 'text',
      pythonOptions: ['-u'], // get print results in real-time
        scriptPath: '/simulation/', //If you are having python_test.py script in same folder, then it's optional.
      args: [req.toehold, req.bm] //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run('sim_strand_displacement.py', options, function (err, result){
      if (err) throw err;
      // result is an array consisting of messages collected
      //during execution of script.
      console.log('result: ', result.toString());
      res.send(result.toString())
    });  
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
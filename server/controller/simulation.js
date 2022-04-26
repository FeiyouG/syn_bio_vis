import { PythonShell } from 'python-shell';
// import { spawn } from 'child-process';
// This module contains functions triggered by post and get requests
// from the clients
// NOTE: HTTP Status Code Lookup:
// https://www.restapitutorial.com/httpstatuscodes.html

// --------------------
// MARK: GET REQUESTs
// --------------------


// --------------------
// MARK: POST REQUEST
// --------------------

// Run a simulation and return the result to client
export const runSim = async (req, res) => {
  try {
    console.log("Start simulation");
    console.log(req.body);
    try {
      let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        // scriptPath: '/simulation/', //If you are having python_test.py script in same folder, then it's optional.
        args: [req.toehold, req.bm] //An argument which can be accessed in the script using sys.argv[1]
      };
  
      PythonShell.run('hello.py', options, function (err, result){
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        console.log('result: ', result.toString());
        res.status(200).json({ res_msg: result.toString() })
      });  
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

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
    // Run the simulation here
    /*
    var dataToSend;
    const python = spawn('python', ['sim_strand_displacement.py']);
    python.stdout.on('data', function (data) {
      console.log("getting data from python");
      dataToSend = data.toString();
    });
    python.on('close', (code) => {
      console.log("finished running python");
      // res.send(dataToSend);
      res.status(200).json({message: dataToSend});
    });
    */
    try {
      let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        // scriptPath: '/simulation/', //If you are having python_test.py script in same folder, then it's optional.
        args: [req.toehold, req.bm] //An argument which can be accessed in the script using sys.argv[1]
      };
  
      PythonShell.run('sim_strand_displacement.py', options, function (err, result){
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        console.log('result: ', result.toString());
        res.status(200).json({ res_msg: result.toString() })
        res.send(result.toString())
      });  
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    
    // res.status(200).json({ message: "Greeting from the Server 👋" })
  } catch (error) {
    // TODO: correctly handle error
    res.status(404).json({ message: error.message });
  }
}

/*
// run python simulation and return json?
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
      res.status(200).json({ res_msg: result.toString() })
      res.send(result.toString())
    });  
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
*/
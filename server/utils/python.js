import {PythonShell} from "python-shell"
// Run a simulation and return the result to client
// arguments: filename, toehold, bm
export const runPython = async (req, res) => {
  try {
    try {
      let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        // scriptPath: '/simulation/', //If you are having python_test.py script in same folder, then it's optional.
        args: [req.toehold, req.bm] //An argument which can be accessed in the script using sys.argv[1]
      };

      console.log(req.filename)
      PythonShell.run(req.filename, options, function(err, result) {
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        console.log('result: ', result.toString());
      });
    } catch (error) {
      console.log(error)
    }

  } catch (error) {
    console.log(error)
  }
}

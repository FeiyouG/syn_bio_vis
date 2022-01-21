# syn_bio_vis
An interactive tool for teaching and learning molecular programming.

## Our Observable Notebooks:

**Lesson 1**: [DNA Hybridization and Synthesis](https://observablehq.com/@sborje/lesson-1-dna-hybridization-and-synthesis)

**Lesson 2**: [Introduction to DNA Strand Displacement (DSD)](https://observablehq.com/@jasonhof/lesson-2-introduction-to-dna-strand-displacement-dsd)

**Lesson 3**: [Abstraction for DNA Circuits](https://observablehq.com/@jasonhof/lesson-3-abstraction-for-dna-circuits)

**Lesson 4**: Introduction to Circuits

**Lesson 5**: Exploring Circuit design

**Lesson 6**: In the Lab

**Lesson 7**: In the World

## Setup the server
We use [Flask](https://flask.palletsprojects.com/en/2.0.x/), a micro web framework, as our server, and [Multistrand](https://github.com/DNA-and-Natural-Algorithms-Group/multistrand) to run our simulations

### First, Swtich to python2 environement

Multistrand currenly only works with python2 version 2.7.12+. You can easily create a virual environment of python2.7 using [virtualenv](https://virtualenv.pypa.io/en/latest/)

### Second, install and run Flask
Install Flask with pip 
```
pip install Falsk
```

Then run Flask as a public server
```
export FLASK_APP=server
flask run -host=0.0.0.0
```

Flask runs on port 5000 by default.

### Finally, access the server

Find out the IP Address of your machine by using the `host` command in your terminal.

Now, go to any browswer and type `[your IP adress]:5000` to access the server

## APIs (Temporary, still working in progress)

- Home page will print the word "HELLO"
- `~/json` will give you an example strand displacement data in json
- `~/toehold_seq/rest_seq` will give use a json file represent the simulation of a strand displacement
  - `toehold_seq` is the sequence of the toehold region
  - `rest_seq` is the sequence of the base besides toehold region
  - The sequence of strand1 and strand2 will be generated automatically from the base sequence. We will allow more flexiblity in declaring strand sequences in later updates

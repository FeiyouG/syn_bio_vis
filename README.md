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

## Run this project

### Prerequisite

First, ensure `node.js` and `npm` are installed on your machine.

Then, clone and `cd` into the project.

### Set up the server

`cd` to the folder `server/`. Run
```shell
$ npm init -y
```
to initialize an empty `package.json` inside `server/`. Open and add the following lines to
your `package.json`:

```json
"type": "module",
"scripts": {
  "start": "nodemon index.js"
},
```

Next, run the following command to install the dependencies for the server:
```shell
$ npm install express body-parser cors nodemon
```
After all packages are installed,
run `npm start` to start the server. Make sure `port 3000` is available as
the server will run in `port 3000` by default

### Set up the client

`cd` to the folder `client/` and run the following command to install all
the dependencies:
```shell
$ npm install react react-dom react-redux redux redux-thunk @material-ui/core axios d3
```
Finally, run `npm start` on the client. The client uses port 3000 as default
too, but it can automatically change to use another port if port 3000 isn't
available.

Please bear in mind that this project is still in early development stage, and
the dependencies will likely to be changed frequently in the future.

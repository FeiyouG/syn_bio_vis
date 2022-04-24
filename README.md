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

## Set up this project

First, ensure
[node.js](https://nodejs.org/en/)
and `npm` are installed on your machine

Then, clone this project:
```shell
$ git clone https://github.com/gfeiyou/syn_bio_vis.git
```
### Set up Server
Inside the folder `syn_bio_vis/server/`, run `npm install` to install all
the dependencies for the server.

Run `npm start` to start the server.

The server is running in port `3001` by default and can not redirect
to another port automatically. So please make sure port `3001` is not in use
when you start the server (We may change this behavior in production code)

### Set up Client
Next, `cd` into `syn_bio_vis/client/` and run `npm install`
to install all the dependencies for the client. Run `npm start` to start the
client. A website will be opened in your default browser. The client runs
in port `3000` by default. But if `3000` is in use, it can automatically
redirect to another port.


## Contribute to this project

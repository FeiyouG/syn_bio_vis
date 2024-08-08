# syn_bio_vis
An interactive tool for teaching and learning molecular programming.


<!-- vim-markdown-toc GFM -->

- [Set up this project](#set-up-this-project)
  - [Set up Server](#set-up-server)
    - [Set up NUPACK and multistrand](#set-up-nupack-and-multistrand)
    - [Start the server](#start-the-server)
  - [Set up Client](#set-up-client)
    - [Start the client](#start-the-client)
- [Contribute to this project](#contribute-to-this-project)

<!-- /TOC -->

## Set up this project

First, ensure
[`node.js`](https://nodejs.org/en/)(>= v16)
and `npm`(>= v8) are installed on your machine

Then, clone this project:
```shell
git clone https://github.com/gfeiyou/syn_bio_vis.git
```

### Set up Server

#### Set up NUPACK and multistrand

The simulation in the server depends on
both [`NUPACK`](http://www.nupack.org)
and [`multistrand`](https://github.com/DNA-and-Natural-Algorithms-Group/multistrand)

1. Download `NUPACK` from the official website.
2. Set `NUPACKHOME` environment variable to
  the directory where `NUPACK` is installed.
    - Add the following line to your `.zshrc` or `.bashrc`,
      ```shell
      export NUPACKHOME = /path/to/NUPACK/installed/dir
      ```
    - Restart your terminal app
      or source your `.zshrc`/`.bashrc`
    - Run `echo $NUPACKHOME`
      and make sure it prints out the correct path
      to the directory where `NUPACK` is installed.
2. Clone `multistrand` to your local machine
3. Create a python2.7 virtual environment
  with [virtualenv](https://virtualenv.pypa.io/en/latest/)
  (`multistrand` uses python2.7)
4. Activate your virtual environment
5. Make sure all dependencies are installed
according to [`multistrand Requirements`](https://github.com/DNA-and-Natural-Algorithms-Group/multistrand#requirements)
6. Navigate to `multistrand` repo
  on your local machine
  in terminal.
7. Try to run an example file
  in `multistrand/tutorials/under_the_hood/` directory
  and make sure `multistrand` works as expected

#### Start the server

Inside the folder `syn_bio_vis/server/`, run `npm install` to install all
the dependencies for the server. Then, run `npm start` to start the server.

```shell
cd /path/to/server_folder
npm install
npm start
```

The server is running in port `3001` by default and can not redirect
to another port automatically. So please make sure port `3001` is not in use
when you start the server (We may change this behavior in production code)

### Set up Client
#### Start the client
Inside the folder `syn_bio_vis/client/`, run `npm install`
to install all the dependencies for the client. Run `npm start` to start the
client.

```shell
cd /path/to/client_folder
npm install
npm start
```

A website will be opened in your default browser. The client runs
in port `3000` by default. But if `3000` is in use, it can automatically
redirect to another port.


## How to Use the Website
1. **Simulation Page**: 
This page is designed for users to input their own DNA strand data, either by entering it manually (this feature is still being developed) or by uploading a file. Here’s how you can use the different sections:

   - **DOMAINS**: Enter two separate sequences of DNA bases. These sequences should only include the letters A, T, C, and G, which stand for the four nucleotides in DNA: Adenine, Thymine, Cytosine, and Guanine. Each sequence should be typed into its own text box.
   
   - **STRANDS**: Enter names for the domains you have provided. List these names separated by commas. This helps identify which sequences correspond to which names.

   - **Complexes**: Provide names for the strands, also separated by commas. This section helps link the strands you defined earlier into complexes that will be analyzed together.

   Alternatively, you can upload a `.pil` file containing your DNA data, and the system will automatically extract and organize all the necessary components from the file.

2. **Tutorial Page**:
For all three tutorials, you will find brief explanations of the key concepts related to the simulations. These can help with studying or guide further personal research. 

   - **Simulation Interactions**: Use the slider to adjust the Free Energy and observe how it affects the DNA strand's shape and structure. You can experiment with different DNA strand sizes, shapes, and formations. 

   - **For Users**: You can perform these experiments directly through the simulation pages.

   - **For Developers**: You can clone the repository and explore the code in the `index.js` files. More information about this process can be found in the `CONTRIBUTING.md` file.


## Contribute to this project
Please refer to [CONTRIBUTING.md](https://github.com/FeiyouG/syn_bio_vis/blob/main/CONTRIBUTING.md)
if you want to contribute to this project.

# Lesson 2: DNA Hybridization and Synthesis

This is lesson 2
in the interactive curriculum
Introduction to Molecular Programming

* **Lesson 1: DNA Hybridization and Synthesis**
* **Lesson 2: Introduction to DNA Strand Displacement (DSD)**
* **Lesson 3: Abstraction for DNA Circuits**
* **Lesson 4: Introduction to Circuits**
* **Lesson 5: Exploring Circuit design**
* **Lesson 6: In The Lab**
* **Lesson 7: In The World**

## Introduction

DNA strand displacement (aka DSD) is a type of molecular computation that takes advantage of the complementarity of DNA base pairs to perform computations. This page displays a simulation of what we understand about the overall behavior of DNA as it binds to another strand.

Below the visualization, you'll find more detail about what is happening in the visualization to enable molecular computation.

### Sequence Design

Input your sequence and click "Simulate" to see the result!*

[ INSERT SIMULATION HERE ]

### Energy Graph

[ INSERT SIMULATION HERE ]

#### How to interact with this page

Slide the scrubber to adjust the Free Energy desired and see the corresponding conformation of DNA strands below. Press Play/Pause to see the steps play out over an accelerated timescale.

#### Molecular Conformation

Each block represents one nucleotide. Different conformations result in different free energy levels for the resulting structure.

Currently, the below visualization depicts hybridization of two single-stranded DNA molecules and their corresponding energy graph. Contiguous colored segments denote complementary domains.

## DNA Background

### Deoxyribonucleic Acid

Deoxyribonucleic Acid (DNA) is the information-bearing molecule that encodes all the instructions necessary for biological replication. DNA consists of two anti-parallel strands that are connected together via binding of complementary nucleotides (nitrogenous bases), denoted: A, T, C, G. These "base pairs" are created when A binds specifically to T, and C binds specifically to G.

### DNA Computing

DNA computing is a branch of computer science that uses DNA molecules as a computing substrate to carry information and perform arithmetic and logic operations. DNA computing’s strength lies in its ability to process information while still in molecular form, allowing computation and programmable control of biological matter at the nanoscale.

### DNA Strand Displacement

DNA strand displacement (DSD) is a model of molecular computation that takes advantage of the complementarity of DNA base pairs to perform computation.

In toehold-mediated DSD, an invading strand of DNA displaces the incumbent strand of a partially double-stranded complex, releasing an output signal via three steps:

1. binding to an complementary short, single-stranded “toehold” region, which significantly accelerates displacement.
2. branch migration, or the replacement of complementary base pairs within the existing duplex.
3. Displacement occurs and the incumbant strand is released as an output signal.
Short (toehold) domains, or 3-7 adjacent nucleotides bind to complementary domains reversably. Long domains, >= 15-20 adjacent nuceotides bind to complementary domains irreversably, i.e. they will not spontaneously dissociate.

Through rational design of these reactions, they can be chained together in cascades to create more complex molecular circuits.

### The Energy Landscape

This interactive visualization simulates a toehold-mediated DSD reaction and its corresponding energy landscape as the chemical reaction progresses from start to finish.

When thinking about free energy, negative values (delta G) are more favorable. Here, this corresponds to a greater number of pair pairs forming. When the input DNA strand binds to the exposed toehold region of the partially double stranded complex, there is an increase in free energy as the complementary toehold regions bind and the two complexes become one. As branch migration occurs and more and more base pairs are formed, the free energy in the system deceases until, ultimately, all the base pairs are displaced and the incumbant strand is released. The single complex becomes two complexes once again and the free energy in the system is at its lowest point.

### For More Information

on DNA, DNA Strand Displacement, and how this simulation works, please see the KinDA repository. The examplessimple1.pil was the original definition file for this interaction. We are currently displaying the T3Bound complex as it traverses the energy landscape

### Works Cited

* Berleant Joseph, Berlind Christopher, Badelt Stefan, Dannenberg Frits, Schaeffer Joseph and Winfree Erik 2018Automated sequence-level analysis of kinetics and thermodynamics for domain-level DNA strand-displacement systemsJ. R. Soc. Interface.152018010720180107. https://doi.org/10.1098/rsif.2018.0107.
* Yurke, B., Turberfield, A., Mills, A. et al. A DNA-fuelled molecular machine made of DNA. Nature 406, 605–608 (2000). https://doi.org/10.1038/35020524.

## ----- Below here is a bunch of code! -----

Please feel free to ignore it if you just want to play with DNA, but feel free to view the cells if you want to see the guts behind this animation.

[ INSERT CODE HERE ]




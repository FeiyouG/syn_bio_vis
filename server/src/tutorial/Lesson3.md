# Lesson 3: Abstraction for DNA Circuits

This is lesson 3
in the interactive curriculum
Introduction to Molecular Programming

- **Lesson 1: DNA Hybridization and Synthesis**
- **Lesson 2: Introduction to DNA Strand Displacement (DSD)**
- **Lesson 3: Abstraction for DNA Circuits**
- **Lesson 4: Introduction to Circuits**
- **Lesson 5: Exploring Circuit design**
- **Lesson 6: In The Lab**
- **Lesson 7: In The World**

## LEVELS OF ABSTRACTION
As you know from your AP Bio class, DNA monomers can be represented
using different levels of abstraction: **bases** (A, G, C, T), **phosphate-sugar-base** (often depicted as a circle-pentagon-rectangle), 
and **organic molecules** (down to the individual elements that bond together). 
The level of abstraction that you use depends on what you want to learn about your DNA molecules or how you want to use them. Similarly, DNA strand displacement circuits can be illustrated using different levels of abstraction, which you can explore here.

### Sequence
Sequence-level abstraction represents DNA strands as strings of bases (e.g. 'CATAC', 'GTA'). This level of abstraction is useful when evaluating a single strand displacement reaction (e.g. its energy landscape, kinetics, etc.)

### Domain
Domain-level abstraction splits DNA strands into regions or **'domains'**. Domain-level abstraction is often sufficient to distinguish between strands and dictate their behaviour (how they interact, how quickly, etc). This level of abstraction is useful for designing a series of multiple strand displacement reactions, otherwise known as a **strand displacement cascade**.

### Chemical Reaction Network (CRN)
In a Chemical Reaction Network, an enumerated list of reactant species reacts at a known rate to form an enumerated list of product species. **CRN-level abstraction** represents individual DNA strands, DNA complexes, or both, as input and output species. This level of abstraction is useful for building more complex circuits that involve multiple strand displacement cascades.



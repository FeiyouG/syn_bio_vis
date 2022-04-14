# Lesson 1: Introduction to DNA Strand Displacement (DSD)

This is lesson 1
in the interactive curriculum
Introduction to Molecular Programming

- **Lesson 1: DNA Hybridization and Synthesis**
- **Lesson 2: Introduction to DNA Strand Displacement (DSD)**
- **Lesson 3: Abstraction for DNA Circuits**
- **Lesson 4: Introduction to Circuits**
- **Lesson 5: Exploring Circuit design**
- **Lesson 6: In The Lab**
- **Lesson 7: In The World**

## Nucleotide Base Building Blocks

Single nucleotide bases
-- Adenine (A), Guanidine (G), Cytosine (C), and Thymine (T) --
can be chemically linked together to create DNA polymers
(often referred to as single **‘strands’**).

## DNA Synthesis

Nowadays,
there are a variety of DNA synthesis technologies
that allow us to create strands
with the exact sequences of bases we want.
The current focus of DNA synthesis technology is
large-scale production,
with the latest generation
allowing synthesis of millions of DNA strands at a time.

## DNA Hybridization

DNA strand design
is governed by **DNA hybridisation**.
DNA hybridization is the formation of
a double-stranded **hybrid**
or helix from two single-stranded DNA molecules.
Individual strands hybridize together
through hydrogen bonds between **complementary bases**.
Complementary base-pairing occurs
between either *A's and T's*,
which form 2 hydrogen bonds,
or *C's and G's*,
which form 3 hydrogen bonds.

Due to the sugar-phosphate backbone of DNA,
two strands in a DNA duplex
are pointed in opposite directions.
Two single DNA strands
whose sequences are **reverse-complementary**
-- i.e., who have complementary sequences
when pointed in opposite directions --
will selectively bind each other
to form a double-stranded hybrid.

Using this concept of DNA hybridization,
we can synthesize strands
that specifically bind to medical targets,
such as DNA or mRNA fragments
within cells,
or synthetic targets,
such as other designed strands.

The kinetics of DNA hybridization
have been so well-characterised
that when we design DNA strands,
we can control for
how quickly and how stably
they bind their target.

This kind of control allows us to
design complex chemical reactions
composed entirely of DNA strands,
wherein a specific input is processed
by a collection of DNA strands
to reliably release a specific output,
a. k. a. DNA computation!

<!-- `.pil format` -->
```SDSimulation
{
  "name": "example"
}
```

#### How to interact with this page (Subject to change)

Slide the scrubber
to adjust the Free Energy desired
and see the corresponding conformation
of DNA strands below.
Press Play/Pause
to see the steps play out
over an accelerated timescale.

#### Molecular Conformation (Subject to change)

Each block represents one nucleotide.
Different conformations result
in different free energy levels
for the resulting structure.

Currently,
the below visualization depicts hybridization
of two single-stranded DNA molecules
and their corresponding energy graph.
Contiguous colored segments
denote complementary domains.

### Works Cited

- Berleant Joseph,
  Berlind Christopher,
  Badelt Stefan,
  Dannenberg Frits,
  Schaeffer Joseph
  and Winfree Erik
  2018Automated sequence-level analysis of kinetics and thermodynamics for domain-level DNA strand-displacement systemsJ.
  R. Soc. Interface.152018010720180107.
  [https://doi.org/10.1098/rsif.2018.0107](https://doi.org/10.1098/rsif.2018.0107).
- Yurke, B.,
  Turberfield, A.,
  Mills, A. et al.
  A DNA-fuelled molecular machine made of DNA.
  Nature 406, 605–608 (2000).
  [https://doi.org/10.1038/35020524](https://doi.org/10.1038/35020524).

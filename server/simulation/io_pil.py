# Convert multistrand complexes to and from *.pil files
# Inspired by https://github.com/DNA-and-Natural-Algorithms-Group/KinDA

import re, sys
from multistrand.objects import *
import argparse


## GLOBALS
# Helpful regular expressions
space   = r"\s*" # 0 or more spaces or tabs
word    = r"[\w\-*]+"
words_s = r"(?:" + word + space + r")+"             # space-separated words
words_p = r"(?:\+" + space + word + space + r")*"   # plus-separated words
seq     = r"[ACGTSWMKBVDHRYN]+"
dec     = r"(?:(?:(?:\d+(?:\.\d*)?)|\.\d+)(?:[eE][+-]?[0-9]+)?|inf)"
c_unit  = r"[nmup]?M"
ic_unit  = r"(?:/[nmup]?M)"
it_unit  = r"(?:/s(?!M)|/sec(?!M)|/min(?!M)|/m(?!M))"
unit    = "(?:" + ic_unit + "?" + space + it_unit + ")"
details = r"\[.*\]"
cmax    = r"(?:cmax" + space + "=" + space + dec + space + c_unit + r")"
opt     = r"\d+nt"
kin     = r"\[kinetic\]"
dummy   = r"(?:\[dummy\])?"
d_paren = r"[().+]+"
num     = r"\d+"

# Reae from *.pil files and return lists of Mutlistrand objects
def from_PIL(pilFile):
  domains = {}
  strands = {}
  complexes = []

  # TODO: Error handling isn't robust
  for line in pilFile:
    line = strip_comment(line).strip()
    if line == "": continue

    type = line.split()[0]

    # If sequence declaration
    if type == "sequence":
      d = parseSequence(line)
      domains[d.name] = d
      c = d.C # d.C is an instance of ComplementDomain instead of Domain
      domains[c.name] = Domain(name = c.name, sequence = c.sequence, length = c.length)
    elif type == "strand":
      s = parseStrand(line, domains)
      strands[s.name] = s
      c = s.C
      strands[c.name] = Strand(name = c.name, domains = c.domain_list)
    elif type == "structure":
      complexes.append(parseStruct(line, strands))
    else:
      # Unknown type on this line; print error message and continue
      print >> sys.stderr, "Warning: Bad syntax on this line:\n%s\nContinuing anyway.\n" % line

  return domains.values(), strands.values(), complexes

def parseSequence(line):
  # Syntax:
  #   sequence <name> = <nucleotides> : <seq_length>
  regex = re.compile("sequence" + space + "(" + word + ")" + space + "="
    + space + "(" + seq + ")" + space + ":" + space + num)
  match_obj = regex.match(line)
  if match_obj != None:
    name = match_obj.group(1)
    nucleotides = match_obj.group(2)

    # Create/add the new Sequence to the Specification
    domain = Domain(name = name, sequence = nucleotides)
    return domain
  else:
    print >> sys.stderr, "Invalid sequence directive:\n%s" % line


def parseStrand(line, domains):
  # Syntax:
  #   strand [\[dummy\]] <name> = <seq1> [<seq2> [<seq3> ...]] : <strand_length>
  regex = re.compile("strand" + space + dummy + space + "(" + word + ")" + space + "=" +
    space + "(" + words_s + ")" + ":" + space + num)
  match_obj = regex.match(line)
  if match_obj != None:
    name = match_obj.group(1)
    domain_list = [domains[n] for n in match_obj.group(2).split()]
    # print name, "=", match_obj.group(2).split() ####

    strand = Strand(name = name, domains = domain_list)
    return strand
  else:
    print >> sys.stderr, "Invalid strand directive:\n%s" % line


def parseStruct(line, strands):
  # Syntax:
  #   structure [\[<options>\]] <name> = <strand1> [+ <strand2> [+ <strand3> ...]] : <dot_parens>
  regex = re.compile("structure" + space + "(" + details + ")?" + space + "(" + word + ")" + space + "=" +
    space + "(" + word + space + words_p + ")" + ":" + space + "(" + d_paren + ")")
  match_obj = regex.match(line)
  if match_obj != None:
    name = match_obj.group(2)
    strand_list = [strands[strand_name.strip()] for strand_name in match_obj.group(3).split("+")]
    binding = match_obj.group(4)

    # Create/add the new Structure
    complex = Complex(name = name, strands = strand_list, structure = binding) # we're ignoring c_max, opt_value which is not okay
    return complex
  else:
    print >> sys.stderr, "Invalid structure directive:\n%s" % line


def strip_comment(line):
  try:
    return line[:line.index("#")]
  except ValueError:
   return line


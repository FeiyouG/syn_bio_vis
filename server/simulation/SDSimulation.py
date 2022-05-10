import os
import sys
import json
import argparse
import io_pil

from multistrand.objects import *
from multistrand.options import Options, Literals
from multistrand.system import SimSystem, energy

parser = argparse.ArgumentParser()
parser.add_argument("pilFile", nargs="*", action="store", type=str)

args = parser.parse_args()

def create_options(complexes):
  # Options
  option = Options()
  option.simulation_mode = 0x0080 # trajectory mode
  option.num_simulations = 1
  option.simulation_time = 0.00002 # 200 microseconds, about 250 steps
  option.temperature = 37.0
  option.dangles = 1
  option.output_interval = 100   # record every 100 steps (so we'll get around 100 record entries)
  option.start_state = complexes
  # option.rate_scaling="Calibrated"
  option.JSKawasaki37()
  option.join_concentration=1e-6  # 1 uM
  option.verbosity=0  # doesn't turn off output during simulation -- but it should.  please wait for multistrand 3.0.

  return option

def get_trajectory(option):

  # strands_sequence = []
  # for strand in strands:
  #   strands_sequence.append(strand.sequence)

  # The trajectory of the SD, strands sorted in the order appear in strand_order
  trajectory = {"strands": [], "conformation":[], "time":[], "energy":[]}

  # The strands in this reaction, mainly for sorting purposes
  strands_order = []

  # TODO: the order is a mess. We need to make sure the order is the same as it is in strands
  # Used to sort trajectory since strand order can change upon association of dissociation
  # key = i in strand_order, value = new_strand_order.index[strand_order[i]]
  strands_map = {}

  # go through each output microstate of the trajectory
  for i in range(len(option.full_trajectory)):

    # 1. GET INFORMATIONS
    time = option.full_trajectory_times[i]  ## time at which this microstate is entered
    states = option.full_trajectory[i]      ## States at step i

    new_strand_order = []   ## stores the ordering of the strands at step i
    structs = []            ## stores the 2ndary structure of strands at step i
    sign = []               ## stores whether it's "+" or " " after the 2ndary structure of a strand
    dG = 0                  ## stores the energy of the conformation at step i

    for state in states:
      strands = state[3]
      struct = state[4]
      energy = state[5]
      # print >> sys.stderr, "strand:\n%s\nstruct\n%s" % (strands, struct)

      for j in range(len(struct)):
        if(struct[j] == "+"): sign += "+"

      new_strand_order += strands.split("+")
      structs += struct.split("+")
      sign += " "
      dG += energy

    # 2. UPDATE STRAND_MAP

    ## If strand_order is not yet intialized, init it with the current ordering of strands
    if(not strands_order): strands_order = new_strand_order

    ## If strand_map is not yet initialized, init it with default values
    if(not strands_map): strands_map = {j:j for j in range(len(strands_order))}

    ## Update strand_map when strand order changes upon association of dissociation
    if(new_strand_order != strands_order):
      for j in range(len(new_strand_order)):
        strands_map[j] = new_strand_order.index(strands_order[j])

    # 3. GET SECONDARY STRUCT in proper order
    new_trajectory = ""
    for i in range(len(strands_order)):
      new_trajectory += structs[strands_map[i]]
      new_trajectory += sign[strands_map[i]]

    # 4. UPDATE TRAJECTORY
    trajectory["conformation"].append(new_trajectory.strip())
    trajectory["time"].append(time)
    trajectory["energy"].append(dG)

  trajectory["strands"] = strands_order
  return trajectory

def save_json(json, file_name="sim_strand_displacement.json"):
  file = open(file_name, "a")
  file.write(json)
  file.close()


def simulate(strands, complexes):
  option= create_options(complexes)
  system = SimSystem(option)
  system.start()

  trajectory = get_trajectory(option)

  return trajectory

if __name__ == '__main__':
  pilFile = args.pilFile
  domain, strands, complexes = io_pil.from_PIL(pilFile)
  trajectory = simulate(strands, complexes)

  json = json.dumps(trajectory, indent=4)
  print(json)


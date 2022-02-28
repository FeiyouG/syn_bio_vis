import os
import json
from multistrand.objects import *
from multistrand.options import Options, Literals
from multistrand.system import SimSystem, energy
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('toehold', type=str, default="TCTA")
parser.add_argument('bm', type=str, default="TCGACT")

args = parser.parse_args()

def create_options(toehold_seq, bm_seq):
  # Domains
  toehold_domain = Domain(name="toehold", sequence=toehold_seq, length=len(toehold_seq))
  bm_domain = Domain(name="bm", sequence=bm_seq, length=len(bm_seq))
  #bm stands for branch migration

  # Strands
  base = Strand(name="incument", domains=[toehold_domain + bm_domain])
  incument = Strand(name="incument", domains=[bm_domain.C])
  input = Strand(name="incument", domains=[base.C])

  # Complex
  start_complex = Complex(strands=[input, base, incument], structure=".(+)(+)")

  # Options
  option = Options()
  option.simulation_mode = 0x0080 # trajectory mode
  option.num_simulations = 1
  option.simulation_time = 0.00002 # 200 microseconds, about 250 steps
  option.temperature = 37.0
  option.dangles = 1
  option.output_interval = 100   # record every 100 steps (so we'll get around 100 record entries)
  option.start_state = [start_complex]
  option.rate_scaling="Calibrated"
  option.join_concentration=1e-6  # 1 uM
  option.verbosity=0  # doesn't turn off output during simulation -- but it should.  please wait for multistrand 3.0.

  return option

def get_trajectory(option):
  # The trajectory of the SD, strands sorted in the order appear in strand_order
  trajectory = {"Conformation":[], "Time":[], "Energy":[]}

  # The strands in this reaction, mainly for sorting purposes
  strand_order = []

  # Used to sort trajectory since strand order can change upon association of dissociation
  # key = i in strand_order, value = new_strand_order.index[strand_order[i]]
  strand_map = {}

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

      for j in range(len(struct)):
        if(struct[j] == "+"): sign += "+"

      new_strand_order += strands.split("+")
      structs += struct.split("+")
      sign += " "
      dG += energy;

    # 2. UPDATE STRAND_MAP

    ## If strand_order is not yet intialized, init it with the current ordering of strands
    if(not strand_order): strand_order = new_strand_order

    ## If strand_map is not yet initialized, init it with default values
    if(not strand_map): strand_map = {j:j for j in range(len(strand_order))}

    ## Update strand_map when strand order changes upon association of dissociation
    if(new_strand_order != strand_order):
      for j in range(len(new_strand_order)):
        strand_map[j] = new_strand_order.index(strand_order[j]);

    # 3. GET SECONDARY STRUCT in proper order
    new_trajectory = ""
    for i in range(len(strand_order)):
      new_trajectory += structs[strand_map[i]]
      new_trajectory += sign[strand_map[i]]

    # 4. UPDATE TRAJECTORY
    trajectory["Conformation"].append(new_trajectory.strip())
    trajectory["Time"].append(time)
    trajectory["Energy"].append(dG)

  return trajectory

def save_json(json, file_name="sim_strand_displacement.json"):
  file = open(file_name, "a")
  file.write(json)
  file.close()


def simulate(toehold_seq, bm_seq):
  option = create_options(toehold_seq, bm_seq)
  system = SimSystem(option)
  system.start()

  trajectory = get_trajectory(option)

  return trajectory
  #  save_json(json)
  #  return json

if __name__ == '__main__':
  # toehold_seq = "TCTA"
  # bm_seq = "TCGACT"
  toehold_seq = args.toehold
  bm_seq = args.bm

  trajectory = simulate(toehold_seq, bm_seq)

  # option = create_options(toehold_seq, bm_seq)
  # system = SimSystem(option)
  # system.start()
  # trajectory = get_trajectory(option)

  json = json.dumps(trajectory, indent=4)
  save_json(json)

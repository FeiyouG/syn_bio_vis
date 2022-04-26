from flask import Flask
from server.utils import sim_strand_displacement

app = Flask(__name__)

@app.route("/json")
def json():
   return sim_strand_displacement.simulate("TCTA", "TCGACT")
    #  return "<p>Hello, World!</p>"

@app.route("/<string:toehold>/<string:bm>")
def strand_displacement(toehold, bm):
	return sim_strand_displacement.simulate(toehold, bm)
	# return toehold + "," + bm

from flask import Flask
import simulation

app = Flask(__name__)

@app.route("/")
def hellow_world():
   return simulate("TCTA", "TCGACT")
    #  return "<p>Hello, World!</p>"

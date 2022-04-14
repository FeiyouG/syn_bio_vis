import {renderToStaticMarkup} from 'react-dom/server.js'
import React from 'react'
import Content from '../src/tutorial/test.mdx'
// This module contains functions triggered by
// tutorial related post and get requests
// NOTE: HTTP Status Code Lookup:
// https://www.restapitutorial.com/httpstatuscodes.html

// --------------------
// MARK: GET REQUESTs
// --------------------

// Run a simulation and return the result to client
export const getTutorial = async (req, res) => {
  try {
    const tutorialName = req.params.tutorialName;
    console.log("Request to get tutorial/" + tutorialName);

    res.status(200)
    // console.log(renderToStaticMarkup(React.createElement(Content)))
    res.sendFile(tutorialName + ".md", {root: './src/tutorial'})
  } catch (error) {
    // TODO: correctly handle error
    res.status(404).json({ message: error.message });
  }
}

// --------------------
// MARK: POST REQUEST
// --------------------


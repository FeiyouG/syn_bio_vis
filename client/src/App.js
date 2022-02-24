import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import Simulation from './components/simulation/simulation'

function App() {
  return (
    <Container maxWidth="lg">
        <Grow in>
          <Container>
            <Grid container justfity="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Simulation s/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
    </Container>
    // <div>
    //   <Simulation />
    // </div>
  );
}

export default App;

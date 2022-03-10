import React from 'react';
import * as d3 from 'd3';

// A custom D3 hook
// That will refnder the graph with `rednerD3Fn`
// only if dependencies change
// Reference: https://www.pluralsight.com/guides/using-d3.js-inside-a-react-app
export const useD3 = (renderGraphFn, dependencies) => {
  const ref = React.useRef();

  React.useEffect(() => {
    renderGraphFn(d3.select(ref.current));
    return () => {};
  }, dependencies);

  return ref;
}

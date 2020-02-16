import React from 'react';

const DefaultFooter = (props: any) => {

  // eslint-disable-next-line
  // const { children, ...attributes } = props;

  return (
    <React.Fragment>
      <span><a href="https://coreui.io">CoreUI</a> &copy; 2019 creativeLabs.</span>
      <span className="ml-auto">Powered by <a href="https://coreui.io/react">CoreUI for React</a></span>
    </React.Fragment>
  );
}


export default DefaultFooter;

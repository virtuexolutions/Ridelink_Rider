import React from 'react';

let navigationRef = React.createRef();
function navigate(routeName, params) {
  navigationRef.current?.navigate(routeName, params);
}

export default {
  navigate,
  navigationRef,
};

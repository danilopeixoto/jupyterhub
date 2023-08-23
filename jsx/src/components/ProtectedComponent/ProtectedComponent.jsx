import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedComponent = (props) => {
  var { scopes, children } = props;
  const user = useSelector((state) => state.user);
  const hasAccess = scopes.every(scope => user.scopes.includes(scope));

  return hasAccess ? children : null;
};

ProtectedComponent.propTypes = {
  scopes: PropTypes.array,
  children: PropTypes.node,
};

export default ProtectedComponent;

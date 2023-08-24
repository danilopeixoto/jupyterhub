import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { check_scope_access } from "../../util/scopes";

const ProtectedComponent = (props) => {
  var { needsScope, children } = props;
  const user = useSelector((state) => state.user);
  const child = children[0];

  let resources = {};
  for (const resource_name of ['user', 'server', 'group', 'service']) {
    if (child.props[resource_name]) {
      resources[resource_name] = child.props[resource_name].name;
    }
  }

  for (const scope of needsScope) {
    if (check_scope_access(user.scopes, scope, resources)) {
      return children
    }
  }

  return null;
};

ProtectedComponent.propTypes = {
  needsScope: PropTypes.array,
  children: PropTypes.node,
};

export default ProtectedComponent;

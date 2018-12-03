import { branch, renderComponent } from "recompose";

const renderWhileLoading = (component, schemaName, propName = 'data') =>
  branch(
    props => props[propName] && (props[propName].loading || !props[propName][schemaName]),
    renderComponent(component),
  );


export default renderWhileLoading;

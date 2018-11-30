import { branch, renderComponent } from "recompose";

const renderWhileLoading = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component),
  );


export default renderWhileLoading;

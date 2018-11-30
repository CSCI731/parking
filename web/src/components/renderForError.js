import { branch, renderComponent } from "recompose";

export const renderForError = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].error,
    renderComponent(component),
  );

export default renderForError;

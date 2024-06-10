import { ReactElement, cloneElement } from "react";
import { useAppContext } from "../lib/contextLib";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactElement;
}

export function UnauthenticatedRoute(props: Props) {
  const { isAuthenticated } = useAppContext();
  const { children } = props;

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return cloneElement(children, props);
}

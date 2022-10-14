import { useContext } from "react";
import { KeycloakContext } from "./KeyCloakProvider";
var useKeycloak = function () {
    return useContext(KeycloakContext);
};
export default useKeycloak;

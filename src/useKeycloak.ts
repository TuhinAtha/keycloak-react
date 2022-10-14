import { useContext } from "react"
import { KeycloakContext } from "./KeyCloakProvider"

const useKeycloak = () => {
  return useContext(KeycloakContext)
}

export default useKeycloak

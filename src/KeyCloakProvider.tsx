import React, { useEffect, useState } from 'react'
import Keycloak, { KeycloakProfile } from 'keycloak-js'

export const initKeycloak = (kc: Keycloak) => {
  return new Promise((resolve, reject) => {
    kc.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
    })
      .then((authenticated) => {
        if (!authenticated) {
          console.log('user us not authenticated')
          reject(kc)
        } else {
          resolve(kc)
        }
      })
      .catch(() => {
        reject(kc)
      })
  })
}

export interface KeycloakContextType {
  keycloak: null | undefined | Keycloak
  userProfile: null | undefined | KeycloakProfile
}

export const KeycloakContext = React.createContext<KeycloakContextType | null>(
  null
)

export type KeycloakProviderPropsType = {
  instance: Promise<Keycloak>
  children: React.ReactNode
}

export const KeycloakProvider = ({
  instance,
  children,
}: KeycloakProviderPropsType): JSX.Element => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
  const [userProfile, setUserProfile] = useState<KeycloakProfile | null>(null)

  useEffect(() => {
    instance
      .then((keycloak: Keycloak) => {
        setKeycloak(keycloak)
        keycloak
          .loadUserProfile()
          .then((profile) => {
            setUserProfile(profile)
          })
          .catch(() => {
            setUserProfile(null)
          })
      })
      .catch((keycloak: Keycloak) => {
        keycloak.login()
      })
  })
  return (
    <KeycloakContext.Provider value={{ keycloak, userProfile }}>
      {Boolean(keycloak) && children}
    </KeycloakContext.Provider>
  )
}

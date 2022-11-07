import React, { useEffect, useState } from 'react'
import Keycloak, { KeycloakConfig, KeycloakProfile } from 'keycloak-js'

export const createKeycloakInstance = (
  config?: KeycloakConfig
): Promise<Keycloak> => {
  let kc: Keycloak
  if (config) {
    kc = new Keycloak(config)
  } else {
    kc = new Keycloak()
  }

  return new Promise((resolve, reject) => {
    kc.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
    })
      .then((authenticated) => {
        if (!authenticated) {
          console.log('user is not authenticated')
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
  children: React.ReactNode
}

export const KeycloakProvider = ({
  children,
}: KeycloakProviderPropsType): JSX.Element => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
  const [userProfile, setUserProfile] = useState<KeycloakProfile | null>(null)

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const kc = await createKeycloakInstance()
        setKeycloak(kc)
        const profile = await kc.loadUserProfile()
        setUserProfile(profile)
      } catch (kc) {
        if (typeof kc === 'object' && kc !== null && 'login' in kc) {
          (kc as Keycloak).login()
        }
      }
    }
    initKeycloak()
  }, [])

  return (
    <KeycloakContext.Provider value={{ keycloak, userProfile }}>
      {Boolean(keycloak) && children}
    </KeycloakContext.Provider>
  )
}

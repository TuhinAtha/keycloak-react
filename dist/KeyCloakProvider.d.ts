import React from 'react';
import Keycloak, { KeycloakConfig, KeycloakProfile } from 'keycloak-js';
export declare const createKeycloakInstance: (config?: KeycloakConfig) => Promise<Keycloak>;
export interface KeycloakContextType {
    keycloak: null | undefined | Keycloak;
    userProfile: null | undefined | KeycloakProfile;
}
export declare const KeycloakContext: React.Context<KeycloakContextType | null>;
export declare type KeycloakProviderPropsType = {
    children: React.ReactNode;
};
export declare const KeycloakProvider: ({ children, }: KeycloakProviderPropsType) => JSX.Element;

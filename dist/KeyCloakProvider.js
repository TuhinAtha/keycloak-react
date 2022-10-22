var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
export var createKeycloakInstance = function (config) {
    var kc;
    if (config) {
        kc = new Keycloak(config);
    }
    else {
        kc = new Keycloak();
    }
    return new Promise(function (resolve, reject) {
        kc.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            pkceMethod: 'S256',
        })
            .then(function (authenticated) {
            if (!authenticated) {
                console.log('user is not authenticated');
                reject(kc);
            }
            else {
                resolve(kc);
            }
        })
            .catch(function () {
            reject(kc);
        });
    });
};
export var KeycloakContext = React.createContext(null);
export var KeycloakProvider = function (_a) {
    var instance = _a.instance, children = _a.children;
    var _b = useState(null), keycloak = _b[0], setKeycloak = _b[1];
    var _c = useState(null), userProfile = _c[0], setUserProfile = _c[1];
    useEffect(function () {
        instance
            .then(function (keycloak) {
            setKeycloak(keycloak);
            keycloak
                .loadUserProfile()
                .then(function (profile) {
                setUserProfile(profile);
            })
                .catch(function () {
                setUserProfile(null);
            });
        })
            .catch(function (keycloak) {
            setKeycloak(keycloak);
            keycloak.login();
        });
    }, []);
    return (_jsx(KeycloakContext.Provider, __assign({ value: { keycloak: keycloak, userProfile: userProfile } }, { children: Boolean(keycloak) && children })));
};

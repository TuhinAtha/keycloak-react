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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
    var children = _a.children;
    var _b = useState(null), keycloak = _b[0], setKeycloak = _b[1];
    var _c = useState(null), userProfile = _c[0], setUserProfile = _c[1];
    useEffect(function () {
        var initKeycloak = function () { return __awaiter(void 0, void 0, void 0, function () {
            var kc, profile, kc_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, createKeycloakInstance()];
                    case 1:
                        kc = _a.sent();
                        setKeycloak(kc);
                        return [4 /*yield*/, kc.loadUserProfile()];
                    case 2:
                        profile = _a.sent();
                        setUserProfile(profile);
                        return [3 /*break*/, 4];
                    case 3:
                        kc_1 = _a.sent();
                        if (typeof kc_1 === 'object' && kc_1 !== null && 'login' in kc_1) {
                            kc_1.login();
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        initKeycloak();
    }, []);
    return (_jsx(KeycloakContext.Provider, __assign({ value: { keycloak: keycloak, userProfile: userProfile } }, { children: Boolean(keycloak) && children })));
};

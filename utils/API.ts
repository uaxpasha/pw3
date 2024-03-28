import axios, { AxiosInstance } from 'axios';
import { auth } from './types';
import { Env } from './Env';

export class API {

    readonly orgId: number;
    readonly orgName: string;
    readonly projectId: number;
    readonly authorization: auth;
    readonly axiosInstance: AxiosInstance;

    environmentVariable: string;

    constructor(
        authorization: auth,
        environmentVariable:
            | 'base_url'
            | 'api_url_TnA_eks'
            | 'api_url_work'
            | 'PayeePayerDeletUrl'
            | 'payment_standalone',
        orgId?: number,
        orgName?: string,
        projectId?: number,
        extraParams?: any,
    ) {
        const baseUrl = Env.getEnvironmentVariable(environmentVariable);
        this.projectId = projectId || null;
        this.orgName = orgName || null;
        this.orgId = orgId;
        this.authorization = authorization;
        this.environmentVariable = environmentVariable;

        const instance = this.initAxiosInstance(
            authorization,
            baseUrl,
            extraParams,
        );
        instance.defaults.timeout = 15000;
        this.axiosInstance = instance;
    }

    initAxiosInstance(authorization: auth, baseUrl: string, extraParams?) {
        try {
          const outPlatform = {
            'content-type': 'application/json',
            'X-Pyy-Authorization': authorization.jwtToken,
            cookie: authorization.cookie,
          };
          const standalone = {
            'content-type': 'application/json',
            Authorization: authorization.Authorization,
            cookie: authorization.cookie,
          };
          const headers =
            this.environmentVariable.toString() === 'payment_standalone'
              ? standalone
              : outPlatform;
    
          const instance = axios.create({
            baseURL: baseUrl,
            headers,
            transformResponse: [
              // eslint-disable-next-line consistent-return
              (data) => {
                try {
                  return JSON.parse(data);
                } catch (e) {
                  return data;
                }
              },
            ],
            params: extraParams || null,
          });
          instance.defaults.timeout = 15000;
          return instance;
        } catch (e) {
          console.error(e);
          throw e;
        }
      }
    
}
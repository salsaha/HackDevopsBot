import * as vm from "azure-devops-node-api";
import * as lim from "azure-devops-node-api/interfaces/LocationsInterfaces";

let  API_URL="https://dev.azure.com/dynamicscrm";
let API_TOKEN= "inam3oavu5kvtjcjikohkn5oawin5xvqxa7hndzbjrbbxqudm2mq"; //Replace with your Personal Access token here
let API_PROJECT = "OneCRM";
/* function getEnv(name: string): string {
    let val = process.env[name];
    if (!val) {
        console.error(`${name} env var not set`);
        process.exit(1);
    }
    return val;
} */

export async function getWebApi(serverUrl?: string): Promise<vm.WebApi> {
    console.log("serverUrl: " + serverUrl);
    serverUrl = serverUrl || API_URL;
    console.log("serverUrl: " + serverUrl);
    return await this.getApi(serverUrl);
}

export async function getApi(serverUrl: string): Promise<vm.WebApi> {
    return new Promise<vm.WebApi>(async (resolve, reject) => {
        try {
            //let token = getEnv("API_TOKEN");
            let token = API_TOKEN;
            let authHandler = vm.getPersonalAccessTokenHandler(token);
            let option = undefined;

            // The following sample is for testing proxy
            // option = {
            //     proxy: {
            //         proxyUrl: "http://127.0.0.1:8888"
            //         // proxyUsername: "1",
            //         // proxyPassword: "1",
            //         // proxyBypassHosts: [
            //         //     "github\.com"
            //         // ],
            //     },
            //     ignoreSslError: true
            // };

            // The following sample is for testing cert
            // option = {
            //     cert: {
            //         caFile: "E:\\certutil\\doctest\\ca2.pem",
            //         certFile: "E:\\certutil\\doctest\\client-cert2.pem",
            //         keyFile: "E:\\certutil\\doctest\\client-cert-key2.pem",
            //         passphrase: "test123",
            //     },
            // };

            let vsts: vm.WebApi = new vm.WebApi(serverUrl, authHandler, option);
            let connData: lim.ConnectionData = await vsts.connect();
            console.log(`Hello ${connData.authenticatedUser.providerDisplayName}`);
            resolve(vsts);
        }
        catch (err) {
            reject(err);
        }
    });
}

export function getProject(): string {
    //return getEnv("API_PROJECT");
    return API_PROJECT;

}

export function banner(title: string): void {
    console.log("=======================================");
    console.log(`\t${title}`);
    console.log("=======================================");
}

export function heading(title: string): void {
    console.log();
    console.log(`> ${title}`);
}
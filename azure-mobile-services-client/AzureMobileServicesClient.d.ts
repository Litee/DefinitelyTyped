// Type definitions for Microsoft Windows AzureMobile Service 1.0.0
// Project: http://www.windowsazure.com/en-us/develop/mobile/
// Definitions by: Morosinotto Daniele <https://github.com/dmorosinotto/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace Microsoft.WindowsAzure {

    // MobileServiceClient object based on Microsoft Azure documentation: http://msdn.microsoft.com/en-us/library/windowsazure/jj554219.aspx
    interface MobileServiceClient {
        new (applicationUrl: string, applicationKey: string): MobileServiceClient;
        applicationUrl: string;
        applicationKey: string;
        currentUser: User;
        //for provider:string use one of ProviderEnum: 'microsoftaccount', 'facebook', 'twitter', 'google'
        login(provider: string, token: string, callback: (error: any, user: User) => void ): void;
        login(provider: string, token: string): asyncPromise;
        login(provider: string, callback: (error: any, user: User) => void ): void;
        login(provider: string): asyncPromise;
        logout(): void;
        getTable(tableName: string): MobileServiceTable;
        withFilter(serviceFilter: (request: any, next: (request: any, callback: (error:any, response: any) => void ) => void, callback: (error: any, response: any) => void ) => void ) : MobileServiceClient;
        invokeApi(apiName: string, options?:InvokeApiOptions): asyncPromise;
    }

    interface InvokeApiOptions
	{
		method?: string;
		body?: any;
		headers?: Object;
		parameters?: Object;
	}

    // User object based on Microsoft Azure documentation: http://msdn.microsoft.com/en-us/library/windowsazure/jj554220.aspx
    interface User {
        getIdentities(): any;// { [providerName: string]: { userId: string, accessToken: string, accessTokenSecret?: string }; };
        accessTokens: any;   // { [providerName: string]: string; }
        level: string; //for level:string use one of LevelEnum: 'admin','anonymous','authenticated'
        userId: string;
    }


    // Interface to Platform.async(func) => Platform.Promise based on code MobileServices.Web-1.0.0.js
    interface asyncPromise {
        then(onSuccess: (result: any) => any, onError?: (error: any) => any): asyncPromise;
        done(onSuccess?: (result: any) => void , onError?: (error: any) => void ): void;
    }

    // MobileServiceTable object based on Microsoft Azure documentation: http://msdn.microsoft.com/en-us/library/windowsazure/jj554239.aspx
    interface MobileServiceTable extends IQuery {
        new (tableName: string, client: MobileServiceClient): MobileServiceTable;
        getTableName(): string;
        getMobileServiceClient(): MobileServiceClient;

        insert(instance: any, paramsQS: Object, callback: (error: any, retInserted: any) => any): void;
        insert(instance: any, paramsQS: Object): asyncPromise;
        insert(instance: any): asyncPromise;

        update(instance: any, paramsQS: Object, callback: (error: any, retUpdated: any) => any): void;
        update(instance: any, paramsQS: Object): asyncPromise;
        update(instance: any): asyncPromise;

        lookup(id: number, paramsQS: Object, callback: (error: any, retValue: any) => any): void;
        lookup(id: number, paramsQS: Object): asyncPromise;
        lookup(id: number): asyncPromise;

        del(instance: any, paramsQS: Object, callback: (error?: any) => void ): void;
        del(instance: any, paramsQS: Object): asyncPromise;
        del(instance: any): asyncPromise;


        read(query: IQuery, paramsQS: Object, callback: (error: any, retValues: any) => any): void;
        read(query: IQuery, paramsQS: Object): asyncPromise;
        read(query: IQuery): asyncPromise;
        read(): asyncPromise;
    }


    // Interface to describe Query object fluent creation based on Microsoft Azure documentation: http://msdn.microsoft.com/en-us/library/windowsazure/jj613353.aspx
    interface IQuery {
        read(paramsQS?: Object): asyncPromise;

        orderBy(...propName: string[]): IQuery;
        orderByDescending(...propName: string[]): IQuery;
        select(...propNameSelected: string[]): IQuery;
        select(funcProjectionFromThis: () => any): IQuery;
        where(mapObjFilterCriteria: any): IQuery;
        where(funcPredicateOnThis: (...qParams: any[]) => boolean, ...qValues: any[]): IQuery;
        skip(n: number): IQuery;
        take(n: number): IQuery;
        includeTotalCount(): IQuery;

        //internals found looking into code MobileServices.Web-1.0.0.js
        //new (tableName: string, context: any): IQuery;
        //getComponents(): any;
        //toOData(): string;
    }

    interface WindowsAzureStatic {
        MobileServiceClient: MobileServiceClient;
    }
}

declare module "azure-mobile-apps-client" {
    export = WindowsAzure;
}

declare var WindowsAzure: Microsoft.WindowsAzure.WindowsAzureStatic;

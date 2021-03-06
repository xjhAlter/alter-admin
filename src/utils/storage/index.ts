interface ProxyStorage {
    getItem(key: string): any;
    setItem(key: string, value: any): void;
    removeItem(key: string): void;
    clear(): void;
}

//sessionStorage
class sessionStorageProxy implements ProxyStorage {
    protected storage: ProxyStorage;

    constructor(storageModel: ProxyStorage) {
        this.storage = storageModel;
    }
    //存
    public setItem(key: string, value: any): void {
        this.storage.setItem(key, value)
    }
    //取
    public getItem(key: string): any {
        return this.storage.getItem(key)
    }
    //移除
    public removeItem(key: string): void {
        this.storage.removeItem(key)
    }
    //清空
    public clear(): void {
        this.storage.clear()
    }
}

//localStorage
class localStorageProxy extends sessionStorageProxy implements ProxyStorage {
    constructor(localStorage: ProxyStorage) {
        super(localStorage)
    }
}

export const storageSession = new sessionStorageProxy(sessionStorage);

export const storageLocal = new localStorageProxy(localStorage);
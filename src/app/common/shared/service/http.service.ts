import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class HttpServcie {
    constructor(private httpClient: HttpClient) {}

    // 获取菜单
    getMeun() {
        const url = "/nihao/api/v1/meau";
        return this.httpClient.get(url, {});
    }
}
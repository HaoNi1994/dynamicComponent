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

    // 根据项目id获取数据
    getProjectData(projectId: string, tab?: string) {
        if(tab && (tab === 'firstInstance' || tab === 'twoInstance' || tab === 'firstChange')) {
            const url = `/nihao/api/v1/getProjectData?projectId=${projectId}&&tab=${tab}`;
            return this.httpClient.get(url, {});
        } else {
            const url = `/nihao/api/v1/getProjectData?projectId=${projectId}`;
            return this.httpClient.get(url, {});
        }
    }

    // 根据项目id获取数据
    getDetail(taskId: string) {
        const url = `/nihao/api/v1/getDetail?taskId=${taskId}`;
        return this.httpClient.get(url, {});
    }

     // 修改属性
     updateProperty(param: any) {
        const url = '/nihao/api/v1/update/property';
        return this.httpClient.post(url, param);
    }

    // 获取属性数据源
    getPropertits(type: string) {
        const url = `/nihao/api/v1/getPropertits/${type}`;
        return this.httpClient.get(url, {});
    }
}
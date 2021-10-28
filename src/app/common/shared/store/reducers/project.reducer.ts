import { Action, createReducer, on } from "@ngrx/store";
import { ProjectInfo, TabInfo } from "../../type/store.type";
import { SetProjectInfo, SetTablInfo, SetTaskInfo } from "../actions/project.action";

// 初始state数据类型
export type ProjectState = {
    // 项目详情
    projectInfo: ProjectInfo;
    // 任务详情
    taskInfo: any;
    // tab栏详情
    tabInfo: TabInfo;
}

// 定义初始state
export const projectState:  ProjectState = {
    projectInfo: { id: '', grade: ''},
    taskInfo: {},
    tabInfo: {}
}

const reducer = createReducer(
    projectState,
    // 注册一系列事件的动作(注入的动作是player.action.ts中定义的动作)
    // 第一个参数是action中定义的动作;第二个参数是一个函数，他接收一个state,他返回一个新的state
    on(SetProjectInfo, (state, { projectInfo}) => ({ ...state, projectInfo})),
    on(SetTaskInfo, (state, { taskInfo}) => ({ ...state, taskInfo})),
    on(SetTablInfo, (state, { tabInfo}) => ({ ...state, tabInfo})),
)

export function projectReducer(state: ProjectState, action: Action) {
    return reducer(state, action);
}
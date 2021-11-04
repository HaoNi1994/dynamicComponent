import { Action, createReducer, on } from "@ngrx/store";
import { ProjectData } from "../../type/data.type";
import { ProjectInfo, TabInfo } from "../../type/store.type";
import { SetProjectInfo, SetTabInfo, SetTaskData, SetTaskInfo } from "../actions/project.action";

// 初始state数据类型
export type ProjectState = {
    // 项目详情
    projectInfo: ProjectInfo;
    // 任务数据
    taskData: ProjectData;
    // 任务详情
    taskInfo: any;
    // tab栏详情
    tabInfo: TabInfo;
}

// 定义初始state
export const projectState:  ProjectState = {
    projectInfo: { id: '', grade: ''},
    taskData: null,
    taskInfo: {},
    tabInfo: {}
}

const reducer = createReducer(
    projectState,
    // 注册一系列事件的动作(注入的动作是player.action.ts中定义的动作)
    // 第一个参数是action中定义的动作;第二个参数是一个函数，他接收一个state,他返回一个新的state
    on(SetProjectInfo, (state, { projectInfo}) => ({ ...state, projectInfo})),
    on(SetTaskData, (state, { taskData}) => ({ ...state, taskData})),
    on(SetTaskInfo, (state, { taskInfo}) => ({ ...state, taskInfo})),
    on(SetTabInfo, (state, { tabInfo}) => ({ ...state, tabInfo})),
)

export function projectReducer(state: ProjectState, action: Action) {
    return reducer(state, action);
}
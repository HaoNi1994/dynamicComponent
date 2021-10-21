import { createAction, props } from "@ngrx/store";
import { ProjectInfo } from "../../type/store.type";
/*
    定义动作
    定义的动作是player.reducer.ts中PlayState中定义的
*/

// 第一个参数是一个字符串的标识符，是用来语义化我们这个动作是用来干什么
export const SetProjectInfo = createAction('[project] Set projectInfo', props<{ projectInfo: ProjectInfo}>());
export const SetTaskInfo = createAction('[task] Set taskInfo', props<{ taskInfo: any}>());


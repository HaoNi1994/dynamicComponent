import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectState } from "../reducers/project.reducer";

const selectPlayerState = (state: ProjectState) => state;
export const getProject = createFeatureSelector<ProjectState>('project');
export const getProjectInfo = createSelector(selectPlayerState, (state: ProjectState) => state.projectInfo);
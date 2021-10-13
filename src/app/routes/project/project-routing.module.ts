import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NoDataComponent } from "../no-data/no-data.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";

const routes: Routes = [
    { path: '', component: NoDataComponent},
    { path: ':id', component: ProjectDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class ProjectRoutingModule{};
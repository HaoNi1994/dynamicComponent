import { NgModule } from "@angular/core";
import { ProjectRoutingModule } from "./project-routing.module";
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { NoDataComponent } from "../no-data/no-data.component";
import { SharedModule } from "src/app/common/shared/shared.module";

@NgModule({
    declarations: [ProjectDetailComponent,NoDataComponent],
    imports: [
        ProjectRoutingModule,
        SharedModule
    ],
    entryComponents: []
})

export class ProjectModule{}
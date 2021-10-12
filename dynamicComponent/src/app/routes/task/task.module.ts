import { NgModule } from "@angular/core";
import { TaskRoutingModule } from "./task-routing.module";
import { TaskComponent } from "./task.component";

@NgModule({
    declarations:[TaskComponent],
    imports:[
        TaskRoutingModule
    ],
    entryComponents: []
})

export class TaskModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskCardsComponent } from './task-cards/task-cards.component';


@NgModule({
  declarations: [
    TaskComponent,
    TaskDetailsComponent,
    TaskCardsComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }

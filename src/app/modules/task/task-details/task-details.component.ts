import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Workspace } from "../../../shared/models/workspace";
import { WorkspaceService } from "../../../shared/services/workspace.service";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.scss"]
})
export class TaskDetailsComponent implements OnInit {

  value:any;
  form: UntypedFormGroup;
  workspaces: any[] = [];
  isWorkspaceId:number;
  constructor(private service: WorkspaceService) {
  }

  ngOnInit(): void {
    this.form = Workspace.getForm(new Workspace({}))
    this.service.getWorkspace().subscribe(workspace => {
      this.workspaces = workspace.data;
    })
  }

  inputs: InputType[] = [];
  addWorkspace() {
    if (this.form.valid) {
      this.service.addWorkspace(this.form.value).subscribe((response: any) => {
        console.log(response)
      })
    }
  }
  save() {
    this.isWorkspaceId = 0;
  }

  edit(id:number){
    this.isWorkspaceId = id;
  }
}
interface InputType {
  value: string;
}

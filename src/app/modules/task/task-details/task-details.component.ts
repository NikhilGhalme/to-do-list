import { HttpErrorResponse } from "@angular/common/http";
import { Component, Injector, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { BaseComponent } from "../../../shared/base-component.component";
import { Workspace } from "../../../shared/models/workspace";
import { WorkspaceService } from "../../../shared/services/workspace.service";

@Component({
	selector: "app-task-details",
	templateUrl: "./task-details.component.html",
	styleUrls: ["./task-details.component.scss"]
})
export class TaskDetailsComponent extends BaseComponent implements OnInit {
	value: any;
	form: UntypedFormGroup;
	workspaces: any[] = [];
	isWorkspaceId: number;
	workspaceId: number;

	constructor(injector: Injector, private service: WorkspaceService) {
		super(injector);
	}

	ngOnInit(): void {
		this.form = Workspace.getForm(new Workspace({}));
		this.getWorkspaces();
	}

	inputs: InputType[] = [];

	addWorkspace() {
		if (this.form.valid) {
			this.service.addWorkspace(this.form.value).subscribe((response: any) => {
				console.log(response);
				this.getWorkspaces();
				this.notify.Notify.success("Workspace added successfully");
			},(error: HttpErrorResponse)=>{
                        if(error.error instanceof  ErrorEvent){
                          console.log(error.error, "Client Error");
                        }else{
                          console.log("Backend Error Code", error.status );
                          console.log("Backend Error Body", error.error );
                        }
          });
		} else {
		}
	}

	save(update: any) {
		this.form.patchValue({id: this.isWorkspaceId, workspace: update.value});
		this.service.updateWorkspace(this.form.value).subscribe((response: any) => {
			console.log("Update The Workspace", response);
			this.notify.Notify.success("Workspace Updated successfully");
		},(error: HttpErrorResponse)=>{
          if(error.error instanceof  ErrorEvent){
            console.log(error.error, "Client Error");
          }else{
            console.log("Backend Error Code", error.status );
            console.log("Backend Error Body", error.error );
          }
        });
		this.isWorkspaceId = 0;

	}

	edit(id: number) {
		this.isWorkspaceId = id;
	}

	delete(update: any) {
		this.service.deleteWorkspace(parseInt(update.id)).subscribe((res) => {
			console.log(res);
			this.notify.Notify.success("Workspace deleted successfully");
		},(error: HttpErrorResponse)=>{
          if(error.error instanceof  ErrorEvent){
            console.log(error.error, "Client Error");
          }else{
            console.log("Backend Error Code", error.status );
            console.log("Backend Error Body", error.error );
          }
        });
	}

	getWorkspaces() {
		this.service.getWorkspace().subscribe(workspace => {
			this.workspaces = workspace.data;
			this.workspaceId = this.workspaces[0].id;
		},(error: HttpErrorResponse)=>{
          if(error.error instanceof  ErrorEvent){
            console.log(error.error, "Client Error");
          }else{
            console.log("Backend Error Code", error.status );
            console.log("Backend Error Body", error.error );
          }
        });
	}

	selectWorkspace(workspace:any){
		this.workspaceId = workspace.id;
	}
}

interface InputType {
	value: string;
}

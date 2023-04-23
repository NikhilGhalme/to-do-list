import { HttpErrorResponse } from "@angular/common/http";
import { Component, Injector, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { BaseComponent } from "../../../shared/base-component.component";
import { GlobalSearchSelectType } from "../../../shared/interfaces/globalSearchSelectType";
import { Workspace } from "../../../shared/models/workspace";
import { GlobalSearchService } from "../../../shared/services/global-search.service";
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
	workspaceIdByGlobalSearch: number;
	selectedWorkspaceGlobalSearch: GlobalSearchSelectType | null ;

	constructor(injector: Injector, private service: WorkspaceService, private  globalSearchService: GlobalSearchService) {
		super(injector);
	}

	ngOnInit(): void {
		this.form = Workspace.getForm(new Workspace({}));
		this.getWorkspaces();

		this.highlightWorkspaceByGlobalSearch();
	}


	highlightWorkspaceByGlobalSearch(){
		this.globalSearchService.getSelectedCard().subscribe((workspace) => {
			console.log(workspace);
			this.selectedWorkspaceGlobalSearch = workspace;
			if(this.selectedWorkspaceGlobalSearch !== null){
				for (const workspace of this.workspaces) {
					if(workspace.id === this.selectedWorkspaceGlobalSearch.id || workspace.id === this.selectedWorkspaceGlobalSearch.workspace_id){
						this.workspaceId = this.selectedWorkspaceGlobalSearch.id;
						this.workspaceId = this.selectedWorkspaceGlobalSearch.workspace_id;
						this.workspaceIdByGlobalSearch = this.selectedWorkspaceGlobalSearch.workspace_id;
					}
				}
			}
		})
	}
	isSelected(id : number):boolean{
		return id === this.workspaceId || id === this.workspaceIdByGlobalSearch;
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
		this.workspaceIdByGlobalSearch  = 0;
	}
}

interface InputType {
	value: string;
}

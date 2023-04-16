import { HttpErrorResponse } from "@angular/common/http";
import { Component, Injector, Input, OnInit } from "@angular/core";
import { BaseComponent } from "../../../shared/base-component.component";
import { WorkspaceService } from "../../../shared/services/workspace.service";

@Component({
	selector: "app-task-cards",
	templateUrl: "./task-cards.component.html",
	styleUrls: ["./task-cards.component.scss"]
})
export class TaskCardsComponent extends BaseComponent implements OnInit {
  @Input() id: number;
  workspace:any;

	constructor(injector: Injector, private service: WorkspaceService) {
		super(injector);
	}

	ngOnInit(): void {
      this.service.getWorkspace().subscribe((workspace) => {
        this.workspace = workspace;
      },(error:HttpErrorResponse) => {
        if (error.error instanceof  ErrorEvent) {
          // this.error = error.error
        }
      })
	}

}

import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";


export class Workspace {
  id: number
  task: string


  constructor(paramsObject: Object){
    Object.assign(this, paramsObject);
  }

static getForm(workspace: Workspace):UntypedFormGroup{
    return new UntypedFormBuilder().group({
      id: [workspace.id],
      workspace: [workspace.task, Validators.required],
    })}
}

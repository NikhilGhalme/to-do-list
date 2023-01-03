import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";


export class User {
  id: number
  first_name: string
  last_name: string
  email: string
  used_for: string
  password: string
  confirm_password: string;

  constructor(paramsObject: Object){
    Object.assign(this, paramsObject);
  }

static getForm(user:User):UntypedFormGroup{
    return new UntypedFormBuilder().group({
      id: [user.id],
      first_name: [user.first_name, Validators.required],
      last_name: [user.last_name, Validators.required],
      email: [user.email, [Validators.required,Validators.email]],
      used_for: [user.used_for, Validators.required],
      password: [user.password, Validators.required],
      confirm_password: [user.confirm_password, Validators.required],
    })}
}

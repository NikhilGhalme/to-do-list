import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";


export class Card {
	id: number;
	heading: string;
	body: string;
	workspace_id: number;

	constructor(paramsObject: Object) {
		Object.assign(this, paramsObject);
	}

	static getForm(card: Card): UntypedFormGroup {
		return new UntypedFormBuilder().group({
			id: [card.id],
			workspace_id: [card.workspace_id, Validators.required],
			heading: [card.heading],
			body: [card.body, Validators.required],
		});
	}
}

import { HttpErrorResponse } from "@angular/common/http";
import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { UntypedFormGroup, Validators } from "@angular/forms";
import { CardService } from "src/app/shared/services/card.service";
import { BaseComponent } from "../../../shared/base-component.component";
import { Card } from "../../../shared/models/card";
import { WorkspaceService } from "../../../shared/services/workspace.service";

@Component({
	selector: "app-task-cards",
	templateUrl: "./task-cards.component.html",
	styleUrls: ["./task-cards.component.scss"]
})
export class TaskCardsComponent extends BaseComponent implements OnInit, OnChanges {
	@Input() id: number;
	oldId:number;
	workspace: any;
	isEditmode = false;
	form: UntypedFormGroup;
	currentCardId:number;
	cards: any = [];

	constructor(injector: Injector, private service: WorkspaceService, private cardService: CardService) {
		super(injector);
	}

	ngOnInit(): void {
		this.getWorkspaceCards();
		this.form = Card.getForm(new Card({}));
		this.oldId = this.id;
	}

	addCard() {
		this.form.patchValue({workspace_id: this.id});
		if (this.form.valid) {
			this.cardService.addCard(this.form.value).subscribe(res => {
				console.log(res, "Added card");
				this.notify.Notify.success("Card added successfully!");
			}, (err: HttpErrorResponse) => {
				console.log(err);
			});
		}

	}

	ngOnChanges(changes: SimpleChanges) {
		if(this.oldId !== this.id) {

		}
	}

	getWorkspaceCards() {
		this.cardService.getWorkspaceCards(this.id).subscribe(res => {
			console.log(res);
			this.cards = res;
			console.log(this.cards);
		});
	}

	trackById(index: number, item: Card) {
		return item.id;
	}

	cancel() {
		this.form.reset();
	}

	edit(id: number) {
		this.isEditmode = true;
		this.currentCardId = id;

	}
}

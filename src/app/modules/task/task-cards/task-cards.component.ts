import { HttpErrorResponse } from "@angular/common/http";
import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
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
	isAddNewCard = false;
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
				this.cards.unshift(res);
				console.log(this.cards, "6776666666666666")
				this.notify.Notify.success("Card added successfully!");
				this.isAddNewCard = false;
				this.form.reset();
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
			this.cards.reverse()
			console.log(this.cards);
		});
	}

	trackById(index: number, item: Card) {
		return item.id;
	}

	cancel() {
		this.isEditmode = false;
		this.isAddNewCard = false;
	}

	edit(card: Card) {
		this.isEditmode = true;
		this.form = Card.getForm(card);
		this.currentCardId = card.id;
	}
	updateCard(id: number) {
		this.cardService.updateCard(this.form.value).subscribe(
			(result) => {
				const index = this.cards.findIndex((obj:Card) => obj.id === id)
				this.cards[index] = result.data;
				this.isEditmode = false;
				this.form.reset();
				this.notify.Notify.success("Card updated successfully");
			}
		)
	}
	deleteCard(id: number) {
		this.cardService.deleteCard(id).subscribe( response => {
			const index = this.cards.findIndex((obj: Card) => obj.id === id);
			this.cards.splice(index, 1);
			this.notify.Notify.success("Card deleted successfully");

			},
		(error: HttpErrorResponse) => {
			console.log(error);
			this.notify.Notify.failure(error.message);
		}
		)
		console.log("delete", id);
	}
	isVisibleNewForm(){
		this.isAddNewCard = true;
	}
}

import { HttpErrorResponse } from "@angular/common/http";
import { Component, Injector, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { CardService } from "src/app/shared/services/card.service";
import { GlobalSearchService } from "src/app/shared/services/global-search.service";
import { BaseComponent } from "../../../shared/base-component.component";
import { GlobalSearchSelectType } from "../../../shared/interfaces/globalSearchSelectType";
import { Card } from "../../../shared/models/card";
import { WorkspaceService } from "../../../shared/services/workspace.service";

@Component({
	selector: "app-task-cards",
	templateUrl: "./task-cards.component.html",
	styleUrls: ["./task-cards.component.scss"]
})
export class TaskCardsComponent extends BaseComponent implements OnInit, OnChanges, OnDestroy {
	@Input() id: number;
	oldId:number;
	workspace: any;
	isEditmode = false;
	isAddNewCard = false;
	form: UntypedFormGroup;
	currentCardId:number;
	searchTerm : string;
	cards: any = [];
	selectedCard: GlobalSearchSelectType | null ;

	constructor(injector: Injector, private service: WorkspaceService, private cardService: CardService, private globalSearchService: GlobalSearchService) {
		super(injector);
	}

	ngOnInit(): void {
		this.form = Card.getForm(new Card({}));
		this.oldId = this.id;

		this.highlightGlobalSearchResult();
	}

	highlightGlobalSearchResult(){
		this.globalSearchService.getSelectedCard().subscribe((card) => {
			this.selectedCard = card;
			console.log(this.selectedCard);
			console.log('**********^^^^^^^^^^	****************');
		});
	}
	searchCard(searchTerm: string): void {
			this.cardService.searchCards({searchTerm: searchTerm, workspace_id  : this.id}).subscribe( (data: { id: any; }) => {
				this.cards.length = 0;
				this.cards = data;
			})
	}

	isSelected(id:number): boolean {
		if(this.selectedCard){
		 if(id === this.selectedCard.id){
		 return  true;
		 }
		}
		return false;
	}

	addCard() {
		this.form.patchValue({workspace_id: this.id});
		if (this.form.valid) {
			this.cardService.addCard(this.form.value).subscribe(res => {
				this.cards.unshift(res);
				this.notify.Notify.success("Card added successfully!");
				this.isAddNewCard = false;
				this.form.reset();
			}, (err: HttpErrorResponse) => {
				console.log(err);
			});
		}

	}

	ngOnChanges(changes: SimpleChanges) {
		if(changes["id"].currentValue && changes["id"].previousValue) {
			this.getWorkspaceCards();
			console.log('************************');
		}else {
		this.getWorkspaceCards();

		}
	}

	getWorkspaceCards() {
		this.cardService.getWorkspaceCards(this.id).subscribe(res => {
			this.cards = res;
			this.cards.reverse()
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

	ngOnDestroy(){

	}
}

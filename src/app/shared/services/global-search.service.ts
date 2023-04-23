import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment";
import { GlobalSearchSelectType } from "../interfaces/globalSearchSelectType";
import { Card } from "../models/card";

@Injectable({
	providedIn: "root"
})
export class GlobalSearchService {

	baseUrl = environment.API_URL;
	private selectedCard = new BehaviorSubject<GlobalSearchSelectType | null >(null);

	constructor(private http: HttpClient) {
	}

	setSelectedCard(card: any | null) {
		this.selectedCard.next(card);
	}

	getSelectedCard() {
		return this.selectedCard.asObservable();
	}

	search(param: Object): any {
		return this.http.post(this.baseUrl + "/globalSearch", param);
	}
}

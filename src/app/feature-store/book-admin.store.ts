
import { Injectable } from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";

export interface BookAdminState {
  // Define the state properties here
  historySerach:  any;
}

export const initialState: BookAdminState = {
  // Initialize the state properties here
  historySerach: {}
}


@Injectable({  providedIn: 'root'
})
export class BookAdminStore extends ComponentStore<BookAdminState> {
    constructor() {
        super(initialState);
    }
    readonly historySerach$ = this.select(state => state.historySerach);

    readonly setHistorySearch = this.updater((state, _historySerach: any) => ({
        ...state,
       historySerach : _historySerach

    }));
}
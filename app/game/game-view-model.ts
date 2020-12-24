import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";

import { SelectedPageService } from "../shared/selected-page-service";

export class GameViewModel extends Observable {
    constructor() {
        super();

        SelectedPageService.getInstance().updateSelectedPage("Casual Game");

        this.set('selectedCell', -1);
        this.set('board', [
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''] ]);
        this.set('solution', new ObservableArray([
                new ObservableArray(['', '', '', '', '', '', '', '', '']),
                new ObservableArray(['', '', '', '', '', '', '', '', '']),
                new ObservableArray(['', '', '', '', '', '', '', '', '']),
                new ObservableArray(['', '', '', '', '', '', '', '', '']),
                new ObservableArray(['', '', '', '', '', '', '', '', '']),
                new ObservableArray(['', '', '', '', '', '', '', '', '']),
                new ObservableArray(['', '', '', '', '', '', '', '', '']),
                new ObservableArray(['', '', '', '', '', '', '', '', '']),
                new ObservableArray(['', '', '', '', '', '', '', '', '']) ]));
    }
}

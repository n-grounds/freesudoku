import { Observable, fromObject } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";

import { SelectedPageService } from "../shared/selected-page-service";

export class GameViewModel extends Observable {
    constructor() {
        super();

        SelectedPageService.getInstance().updateSelectedPage("Casual Game");

        this.set('selectedCell', -1);
        this.set('board', fromObject( {
                0: fromObject( { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' } ),
                1: fromObject( { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' } ),
                2: fromObject( { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' } ),
                3: fromObject( { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' } ),
                4: fromObject( { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' } ),
                5: fromObject( { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' } ),
                6: fromObject( { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' } ),
                7: fromObject( { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' } ),
                8: fromObject( { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' } ) } ) );
        this.set('fixed', [
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false] ]);
        this.set('solution', [
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''] ] );
        this.set('markers', ['1','2','3','4','5','6','7','8','9']);
        this.set('timerId', undefined);
        this.set('timerVal', undefined);
    }
}

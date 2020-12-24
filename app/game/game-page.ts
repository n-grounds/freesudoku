import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/data/observable";
import { NavigatedData, Page, ViewBase } from "tns-core-modules/ui/page";
import { Label } from "tns-core-modules/ui/label";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";

import { GameViewModel } from "./game-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = args.context;
    const game = context['game'];
    page.bindingContext = new GameViewModel();

    const gameMarkers = game.split(',');
    for( var i = 0; i < 9; i++ ) {
        for( var j = 0; j < 9; j++ ) {
            const c = <string>gameMarkers[i*9+j];
            if( c[0] == '+' ) {
                page.bindingContext.solution.getItem(i).setItem(j, c[1]);
                page.bindingContext.board[i][j] = c[1];
            }
            else {
                page.bindingContext.solution.getItem(i).setItem(j, c[0]);
            }
        }
    }

    const board = <GridLayout>page.getViewById('board');
    var i = 0;
    board.eachChild((cell:ViewBase) => {
        const cellNumber = i++;
        cell.on('tap', (data:EventData) => {
            // console.log(`Cell ${cellNumber} '${(<Label>cell).text}' tapped (selected cell is ${page.bindingContext.get('selectedCell')})`);
            page.bindingContext.set( 'selectedCell', cellNumber );
        });
        return true;
    });

    page.bindingContext.set( 'selectedCell', 40 );
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

export function onLoaded(args: EventData) {
    console.log(`Game page loaded`);
    console.log(args.object);
}

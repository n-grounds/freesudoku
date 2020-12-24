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
                page.bindingContext.solution[i][j] = c[1];
                page.bindingContext.board[i][j] = c[1];
                page.bindingContext.fixed[i][j] = true;
            }
            else {
                page.bindingContext.solution[i][j] = c[0];
            }
        }
    }

    const board = <GridLayout>page.getViewById('board');
    var i = 0;
    board.eachChild((cell:ViewBase) => {
        const cellNumber = i++;
        const row = Math.floor( cellNumber / 9 );
        const col = cellNumber % 9;
        (<Label>cell).bind(
                { sourceProperty: `${col}`,
                  targetProperty: 'text',
                  twoWay: false },
                page.bindingContext.board[row] );
        var nClass = 'body p-10 text-center';
        if( row == 2 || row == 5 ) {
            if( col == 2 || col == 5 ) {
                nClass += ' b-br-1';
            }
            else {
                nClass += ' b-b-1';
            }
        }
        else if( col == 2 || col == 5 ) {
            nClass += ' b-r-1';
        }
        const sel = `selectedCell == ${cellNumber}`,
            v = `board[${row}][${col}]`,
            exp = `solution[${row}][${col}]`,
            inc = `${v} != '' && ${v} != ${exp}`,
            sClass = `${nClass} selected`,
            iClass = `${nClass} incorrect`;
        (<Label>cell).bind(
                { sourceProperty: 'selectedCell',
                  expression: `(${sel}) ? '${sClass}' : (${inc}) ? '${iClass}' : '${nClass}'`,
                  targetProperty: 'class',
                  twoWay: false },
                page.bindingContext );
        cell.on('tap', (data:EventData) => {
            page.bindingContext.set( 'selectedCell', cellNumber );
        });
        return true;
    });

    const controls = <GridLayout>page.getViewById('controls');
    i = 0;
    controls.eachChild((cell:ViewBase) => {
        const controlNumber = i++;
        cell.on('tap', (data:EventData) => {
            const selected = page.bindingContext.get( 'selectedCell' );
            const row = Math.floor( selected / 9 );
            const col = selected % 9;
            if( selected != -1 && !page.bindingContext.fixed[row][col] ) {
                var val = page.bindingContext.markers[controlNumber];
                if( page.bindingContext.board[row][col] == val ) {
                    val = '';
                }
                page.bindingContext.board[row][col] = val;
                //TODO check win condition
            }
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

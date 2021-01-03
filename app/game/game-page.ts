import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/data/observable";
import { NavigatedData, Page, ViewBase } from "tns-core-modules/ui/page";
import { Label } from "tns-core-modules/ui/label";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { alert } from "tns-core-modules/ui/dialogs";
import { Frame } from "tns-core-modules/ui/frame";
import { setInterval, clearInterval } from "tns-core-modules/timer";
import { screen } from "tns-core-modules/platform";
import { PercentLength } from "tns-core-modules/ui/styling/style-properties";

import { GameViewModel } from "./game-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = args.context;
    const game = context.game;
    page.bindingContext = new GameViewModel(context.type);

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

    var idealFontSize = Math.floor(Math.min(
        screen.mainScreen.widthDIPs,
        screen.mainScreen.heightDIPs) / 18);

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
        var nClass = 'p-10 text-center';
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
        if( page.bindingContext.fixed[row][col] ) {
            nClass += ' fixed';
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
        cell.style.fontSize = idealFontSize;
        return true;
    });
    board.height = PercentLength.parse('' + Math.floor(Math.min(
            screen.mainScreen.widthDIPs,
            screen.mainScreen.heightDIPs)));

    const controls = <GridLayout>page.getViewById('controls');
    i = 0;
    controls.eachChild((cell:ViewBase) => {
        const controlNumber = i++;
        cell.style.fontSize = idealFontSize;
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
                if( isComplete( page.bindingContext ) ) {
                    if( page.bindingContext.timerId != undefined ) {
                        clearInterval( page.bindingContext.timerId );
                    }
                    var message = 'Congratulations, you won';
                    if( page.bindingContext.timerVal != undefined ) {
                        message += ' in ' + formatTime(page.bindingContext.timerVal);
                    }
                    message += '!'
                    alert( { title: 'You won',
                             message: message,
                             okButtonText: 'Return Home',
                             cancelable: false } ).then( () => {
                        Frame.topmost().navigate( 'home/home-page' );
                    } );
                }
            }
        });
        return true;
    });

    if( context.type == 'timed' ) {
        const timer = <Label>page.getViewById('timer');
        const start = Date.now();
        timer.text = formatTime((Date.now() - start) / 1000);
        const updateTimer = () => {
            const secs = (Date.now() - start) / 1000;
            page.bindingContext.timerVal = secs;
            timer.text = formatTime(secs);
        };
        page.bindingContext.timerId = setInterval( updateTimer, 1000 );
    }

    page.bindingContext.set( 'selectedCell', 40 );
}

function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    var result = '';;
    if( mins < 10 ) {
        result += '0';
    }
    result += mins + ':';
    if( secs < 10 ) {
        result += '0';
    }
    result += secs;
    return result;
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

export function onLoaded(args: EventData) {
    
}

function isComplete(model: any) {
    for( var r = 0; r < 9; r++ ) {
        for( var c = 0; c < 9; c++ ) {
            if( model.board[r][c] != model.solution[r][c] ) {
                return false;
            }
        }
    }
    return true;
}

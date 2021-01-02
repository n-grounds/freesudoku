import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData, fromObject } from "tns-core-modules/data/observable";
import { NavigatedData, Page } from "tns-core-modules/ui/page";
import { Frame } from "tns-core-modules/ui/frame";
import { knownFolders, path, File, Folder } from "tns-core-modules/file-system";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const c = args.context;
    const type = c == undefined ? 'casual' : c.type;
    page.bindingContext = fromObject( { 'type' : type } );
    page.getViewById('easy').on('tap', playEasy);
    page.getViewById('medium').on('tap', playMedium);
    page.getViewById('hard').on('tap', playHard);
    page.getViewById('expert').on('tap', playExpert);
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

export function playEasy(args: EventData) {
    play( 'easy' );
}

export function playMedium(args: EventData) {
    play( 'medium' );
}

export function playHard(args: EventData) {
    play( 'hard' );
}

export function playExpert(args: EventData) {
    play( 'expert' );
}

function play(difficulty: string) {
    const games = <Array<any>>require('../games.json');
    const options = games.filter( g => g.difficulty == difficulty );
    const idx = Math.floor( Math.random() * options.length );
    const selected = options[idx];
    const game = selected.puzzle.join( ',' );
    Frame.topmost().navigate({
        moduleName: 'game/game-page',
        context: { 'game' : game,
            'type' : Frame.topmost().currentPage.bindingContext.type }
    });
}

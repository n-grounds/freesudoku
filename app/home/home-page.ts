import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/data/observable";
import { NavigatedData, Page } from "tns-core-modules/ui/page";
import { Frame } from "tns-core-modules/ui/frame";

import { HomeViewModel } from "./home-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new HomeViewModel();
    page.getViewById('adventurePlay').set('isEnabled',false);
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

export function playCasual(args: EventData) {
    Frame.topmost().navigate({
        moduleName: 'game/game-page',
        context: { 'game' : '+5,+3,-,-,+7,-,-,-,-,'
                + '+6,-,-,+1,+9,+5,-,-,-,'
                + '-,+9,+8,-,-,-,-,+6,-,'
                + '+8,-,-,-,+6,-,-,-,+3,'
                + '+4,-,-,+8,-,+3,-,-,+1,'
                + '+7,-,-,-,+2,-,-,-,+6,'
                + '-,+6,-,-,-,-,+2,+8,-,'
                + '-,-,-,+4,+1,+9,-,-,+5,'
                + '-,-,-,-,+8,-,-,+7,+9' }
    });
}

export function playTimed(args: EventData) {
    console.log(`Playing timed game: ${args}`);
}

export function playAdventure(args: EventData) {
    //TODO
}
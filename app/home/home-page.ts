import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/data/observable";
import { NavigatedData, Page } from "tns-core-modules/ui/page";
import { Frame } from "tns-core-modules/ui/frame";

import { HomeViewModel } from "./home-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new HomeViewModel();
    page.getViewById('timedPlay').set('isEnabled',false);
    page.getViewById('adventurePlay').set('isEnabled',false);
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

export function playCasual(args: EventData) {
    Frame.topmost().navigate({
        moduleName: 'game/game-page',
        context: { 'game' :
                  '+5,+3,4,6,+7,8,9,1,2,'
                + '+6,7,2,+1,+9,+5,3,4,8,'
                + '1,+9,+8,3,4,2,5,+6,7,'
                + '+8,5,9,7,+6,1,4,2,+3,'
                + '+4,2,6,+8,5,+3,7,9,+1,'
                + '+7,1,3,9,+2,4,8,5,+6,'
                + '9,+6,1,5,3,7,+2,+8,4,'
                + '2,8,7,+4,+1,+9,6,3,+5,'
                + '3,4,5,2,+8,6,1,+7,+9' }
    });
}

export function playTimed(args: EventData) {
    console.log(`Playing timed game: ${args}`);
}

export function playAdventure(args: EventData) {
    //TODO
}
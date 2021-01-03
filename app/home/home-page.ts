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
        moduleName: 'difficulty/difficulty-page',
        context: { 'type' : 'casual' }
    });
}

export function playTimed(args: EventData) {
    Frame.topmost().navigate({
        moduleName: 'difficulty/difficulty-page',
        context: { 'type' : 'timed' }
    });
}

export function playAdventure(args: EventData) {
    //TODO
}
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
    console.log(`Playing casual game: ${args}`);
    console.log(`Will navigate away from ${Frame.topmost().currentPage}`);
    Frame.topmost().navigate('game/game-page');
}

export function playTimed(args: EventData) {
    console.log(`Playing timed game: ${args}`);
}

export function playAdventure(args: EventData) {
    //TODO
}
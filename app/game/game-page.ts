import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/data/observable";
import { NavigatedData, Page, ViewBase } from "tns-core-modules/ui/page";
import { Label } from "tns-core-modules/ui/label";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";

import { GameViewModel } from "./game-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new GameViewModel();

    const board = <GridLayout>page.getViewById('board');
    board.eachChild((cell:ViewBase) => {
        cell.on('tap', (data:EventData) => {
            const label = <Label>data.object;
            console.log(`Label ${label} tapped`);
            board.eachChild((cell2:ViewBase) => {
                cell2.className = cell2.className.replace(' selected','');
                return true;
            });
            label.className += " selected";
        });
        return true;
    });
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

export function onLoaded(args: EventData) {
    console.log(`Game page loaded`);
    console.log(args.object);
}

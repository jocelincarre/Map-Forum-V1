/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

class Popup {
    /**
     * Closes the popup
     */
    close() {};
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    // Open the popup when we enter a given zone
    let popup : Popup|null = null;
    WA.room.onEnterLayer("openPopUpRoom").subscribe(() => {
        popup = WA.ui.openPopup('popupRoomAccess' , 'Revenez plus tard' , []);
    });

    WA.room.onLeaveLayer("openPopUpRoom").subscribe(() => {
        if(!popup)return;
        popup.close();
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};

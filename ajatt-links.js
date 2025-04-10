/*
Called when the item has been created, or when creation failed due to an error.
Log failure.
*/
function onCreated() {
    if (browser.runtime.lastError) {
        console.error(`Error: ${browser.runtime.lastError}`);
    }
}

/*
Create all the context menu items.
*/


browser.menus.create({
    id: "kakimashou",
    title: "書きましょう",
    contexts: ["selection"]
}, onCreated);


browser.menus.create({
    id: "rtk",
    title: "RTK",
    contexts: ["selection"]
}, onCreated);


browser.menus.create({
    id: "kanji-alive",
    title: "Kanji Alive",
    contexts: ["selection"]
}, onCreated);

browser.menus.create({
    id: "jisho",
    title: "Jisho",
    contexts: ["selection"]
}, onCreated);

/*
On Right Click 
*/

browser.menus.onClicked.addListener((info, tab) => {

    var selectedText = info.selectionText;

    if (!!selectedText == false) {
        return;
    }

    var firstChar = selectedText.charAt(0);

    switch (info.menuItemId) {
        case "kakimashou":
            browser.tabs.create({ url: "https://www.kakimashou.com/dictionary/character/" + firstChar });
            break;
        case "rtk":
            browser.tabs.create({ url: "https://kanji.koohii.com/study/kanji/" + firstChar });
            break;
        case "kanji-alive":
            browser.tabs.create({ url: "https://app.kanjialive.com/" + firstChar });
            break;
        case "jisho":
            browser.tabs.create({ url: "https://jisho.org/search/" + selectedText });
            break;
        default:
            break;
    }
});
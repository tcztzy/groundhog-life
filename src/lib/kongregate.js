import { standardCallback } from './playFabCallback';
import PlayFab from 'playfab-sdk/Scripts/PlayFab/PlayFab';
import PlayFabClient from 'playfab-sdk/Scripts/PlayFab/PlayFabClient';
import { currentLife } from './life-loop';
import { saver } from './saver';
import { userInventory, tachyonCache, marketItems, kongItems } from './91';

const InfoRequestParameters = {
    GetUserAccountInfo: true,
    GetUserInventory: true,
    GetUserVirtualCurrency: true
};

export function makeid() {
    let result = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let a = 0; a < 12; a++)
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
}

function getPlayFabId() {
    let id = window.localStorage.getItem("pfid");
    if (!id) {
        id = makeid();
        window.localStorage.setItem("pfid", id);
    }
    return id;
}

function p(error, result) {
    let KongregateId = window.kongregate.services.getUserId();
    let authTicket = window.kongregate.services.getGameAuthToken();
    let r = {
        TitleId: PlayFab.settings.titleId,
        KongregateId,
        AuthTicket: authTicket,
        CreateAccount: true,
        InfoRequestParameters
    };
    PlayFabClient.LoginWithKongregate(r, m);
    standardCallback(error, result);
}

function m(e, t) {
    if (null !== t){
        consumeKongItems();
        if (!window.kongregate.services.isGuest())
            window.kongregate.stats.submit("Groundhogs", currentLife.getValue());
    }
    b(e, t);
}

function onLogin() {
    const KongregateId = window.kongregate.services.getUserId();
    const AuthTicket = window.kongregate.services.getGameAuthToken();
    const request = {
        KongregateId,
        AuthTicket,
        ForceLink: false
    };
    PlayFabClient.LinkKongregate(request, p);
}

function _(e) {
    userInventory.initialize(e.UserVirtualCurrency.TA, e.UserInventory);
    if (tachyonCache.getValue() > 0) {
        addTachyons(tachyonCache.getValue());
        tachyonCache.setValue(0);
        saver.requestSave();
    }
}

function b(error, result) {
    let a = result.data.InfoResultPayload;
    x();
    requestItemList();
    _(a);
    standardCallback(error, result);
}

function M(e, t) {
    if (!t) {
        window.alert("Login failed. Can not gain Tachyons while disconnected. Please reload.");
        console.log(e);
    }
    window.kongregate.services.addEventListener("login", onLogin);
    if (window.kongregate.services.isGuest())
        b(e, t);
    else
        onLogin();
}

export function startLogin() {
    PlayFab.settings.titleId = "EBE7";
    let pfid = getPlayFabId();
    let request = {
        TitleId: PlayFab.settings.titleId,
        CustomId: pfid,
        CreateAccount: true,
        InfoRequestParameters
    };
    try {
        PlayFabClient.LoginWithCustomID(request, M);
    } catch (e) {
        console.log(e);
    }
}

export function addTachyons(e, callback=P) {
    try {
        let a = {VirtualCurrency: "TA", Amount: e};
        tachyonCache.add(e);
        PlayFabClient.AddUserVirtualCurrency(a, callback);
    } catch (e) {
        console.log("tachyons", tachyonCache.getValue());
        startLogin();
    }
}

function P(error, result) {
    if (result !== null) {
        userInventory.tachyons = result.data.Balance;
        tachyonCache.add(-result.data.BalanceChange);
        if (tachyonCache.getValue() < 0)
            tachyonCache.setValue(0);
    }
    else {
        console.log("tachyons", tachyonCache.getValue());
        startLogin();
    }
    standardCallback(error, result);
}

export function logCustomEvent(e, t) {
    let a = {EventName: e, Body: {description: t}};
    try {
        PlayFabClient.WritePlayerEvent(a, standardCallback);
    } catch (e) {
        console.log(e.errorMessage);
    }
}
export function logPlayerProgression(e, t, a) {
    let n = {Statistics: [{StatisticName: "ProgressionAggr", Version: 0, Value: 1e4 * e + 100 * t + a}]};
    try {
        PlayFabClient.UpdatePlayerStatistics(n, standardCallback);
    } catch (e) {
        console.log(e.errorMessage);
    }
    let r = {EventName: "player_progressed", Body: {loop: e, life: t, year: a}};
    try {
        PlayFabClient.WritePlayerEvent(r, standardCallback);
    } catch (e) {
        console.log(e.errorMessage);
    }
}
function x() {
    try {
        PlayFabClient.GetCatalogItems("1", C);
    } catch (e) {
        console.log(e);
    }
}
function C(error, result) {
    if (null !== result) {
        marketItems.populate(result.data.Catalog);
        standardCallback(error, result);
    }
}
function requestItemList() {
    window.kongregate.mtx.requestItemList([], onItemList);
}
function onItemList(result) {
    if (result.success)
        kongItems.items = result.data;
    else
        setTimeout(requestItemList, 5e3);
}
function onUserItem(result) {
    if (result.success) {
        kongItems.userItems = result.data;
        for (let item of result.data) {
            for (let i = 0; i < item.remaining_uses; i++) {
                window.kongregate.mtx.useItemInstance(item.id, I);
            }
        }
    } else setTimeout(consumeKongItems, 5e3);
}
function I(e) {
    e.success && kongItems.consumed(e.id);
}
export function consumeKongItems() {
    window.kongregate.mtx.requestUserItemList(null, onUserItem);
}

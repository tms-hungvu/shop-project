import { IWeb } from "@/interface/web.interface";

export const webSet = (data : IWeb) => ({
    type: "WEB_SET",
    payload : data
});

export const webHiddenPopup = (data : boolean) => ({
    type: "WEB_HIDDEN_POPUP",
    payload : data
});
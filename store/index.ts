import { atom } from "recoil";

export const user = atom({
    key: 'userState',
    default: {},
});

export const collection = atom({
    key: 'collectionState',
    default: {
        recent: [],
        popular: [],
        trending: []
    }
})

export const auth = atom({
    key: 'authState',
    default: null
})

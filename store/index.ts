import { atom, RecoilState } from "recoil";

interface Auth {
    isAuthenticated: boolean;
    authUser: Object | null;
}

interface Collection {
    recent: [];
    popular: [];
    trending: [];
}


export const collection = atom<Collection>({
    key: 'collectionState',
    default: {
        recent: [],
        popular: [],
        trending: []
    }
})

export const authState = atom<Auth>({
    key: 'authState',
    default: {
        isAuthenticated: false,
        authUser: {},
    }
});

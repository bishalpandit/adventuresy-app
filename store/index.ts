import { atom, RecoilState } from "recoil";

export interface IAuth {
    isAuthenticated: boolean;
    authUser: Object | null;
}

export interface ICollection {
    recent: [];
    popular: [];
    trending: [];
}

export interface IActivites {
    data: [];
}

export interface IBooking {
    startDate: Date | null;
    duration: {
        value: number;
        name: string;
        key: number;
    };
    persons: number;
    partner: {};
    total: number;
    price: number;
    tax: number;
    hasDates: boolean;
}

export const error = atom({
    key: 'errorState',
    default: {
        err: '',
        message: '',
        code: 0
    }
})


export const collection = atom<ICollection>({
    key: 'collectionState',
    default: {
        recent: [],
        popular: [],
        trending: []
    }
})

export const activities = atom<IActivites>({
    key: 'activitiesState',
    default: {
        data: []
    }
})

export const authState = atom<IAuth>({
    key: 'authState',
    default: {
        isAuthenticated: false,
        authUser: {},
    }
});

export const bookingState = atom<IBooking>({
    key: 'bookingState',
    default: {
        startDate: null,
        duration: {
            value: 7,
            name: '1 Week',
            key: 0
        }, 
        persons: 1,
        partner: {},
        total: 0,
        price: 0,
        tax: 0,
        hasDates: false
    }
})
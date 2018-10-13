const initialState = {
    loggedIn: false,
    user: {},
    order:{car:'',time:'',recieveAddress:'',recievePos:{lat:21.77,long:21.88},recieveShortAddress:'',giveShortAddress:'',givePos:{lat:21.77,long:21.88},giveAddress:''}
};
export const currentUser= (state = initialState, action) => {
    switch (action.type){
        case "SET_USER":
            return { ...state, user: action.user, loggedIn: true };
        case "REMOVE_USER":
            return { ...state, user: {}, loggedIn: false };
        case "SET_ORDER":
            return { ...state, order:action.order };
        case "SET_ORDER_TIME":
            return { ...state, order:{...state.order,time:action.time} };
        case "SET_ORDER_CAR":
            return { ...state, order:{...state.order,car:action.car} };
        case "SET_ORDER_RECIEVE_ADDRESS":
            return { ...state, order:{...state.order,recieveAddress:action.recieveAddress} };
        case "SET_ORDER_GIVE_ADDRESS":
            return { ...state, order:{...state.order,giveAddress:action.giveAddress} };
        case "SET_ORDER_RECIEVE_POS":
            return { ...state, order:{...state.order,recievePos:action.recievePos} };
        case "SET_ORDER_RECIEVE_SHORT_ADDRESS":
          return { ...state, order:{...state.order,recieveShortAddress:action.recieveShortAddress} };
        case "SET_ORDER_GIVE_POS":
          return { ...state, order:{...state.order,givePos:action.givePos} };
        case "SET_ORDER_GIVE_SHORT_ADDRESS":
          return { ...state, order:{...state.order,giveShortAddress:action.giveShortAddress} };

        default:
            return state;
    }
};
export const setUser = (user) => ({
    type: 'SET_USER',
    user
});
export const removeUser = () => ({
    type: 'REMOVE_USER'
});
export const setOrder = (order) => ({
    type: 'SET_ORDER',
    order
});
export const setOrderTime = (time) => ({
    type: 'SET_ORDER_TIME',
    time
});
export const setOrderCar = (car) => ({
    type: 'SET_ORDER_CAR',
    car
});
export const setOrderRecieveAddress = (recieveAddress) => ({
    type: 'SET_ORDER_RECIEVE_ADDRESS',
    recieveAddress
});

export const setOrderRecievePos = (recievePos) => ({
    type: 'SET_ORDER_RECIEVE_POS',
    recievePos
});
export const setOrderRecieveShortAddress = (recieveShortAddress) => ({
    type: 'SET_ORDER_RECIEVE_SHORT_ADDRESS',
    recieveShortAddress
});
export const setOrderGiveAddress = (giveAddress) => ({
    type: 'SET_ORDER_GIVE_ADDRESS',
    giveAddress
});
export const setOrderGivePos = (givePos) => ({
    type: 'SET_ORDER_GIVE_POS',
    givePos
});
export const setOrderGiveShortAddress = (giveShortAddress) => ({
    type: 'SET_ORDER_GIVE_SHORT_ADDRESS',
    giveShortAddress
});

import React, { createContext, useReducer } from "react";

interface State {
    constTime: number;
    time: number;
    remainingTime: number;
    lastExecuted: string;
    isTimerStarted: boolean;
}

const reducer = (
    state: State,
    action: { type: string; payload: any }
): State => {
    switch (action.type) {
        case "SET_CONST_TIME":
            return { ...state, constTime: action.payload };
        case "SET_TIME":
            return { ...state, time: action.payload };
        case "SET_REMAINING_TIME":
            return { ...state, remainingTime: action.payload };
        case "SET_LAST_EXECUTED":
            return { ...state, lastExecuted: action.payload };
        case "SET_IS_TIMER_STARTED":
            return { ...state, isTimerStarted: action.payload };
        default:
            return state;
    }
};

const initialState: State = {
    constTime: 300,
    time: 0,
    remainingTime: 60,
    lastExecuted: "",
    isTimerStarted: false,
};

export const TimerContext = createContext<{
    state: State;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TimerContext.Provider value={{ state, dispatch }}>
            {children}
        </TimerContext.Provider>
    );
};

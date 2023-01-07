export const initialState = false;
export const reducer = (state: any, action:any) =>{
    if(action.type === "USER") return action.payload
        return state;

    }

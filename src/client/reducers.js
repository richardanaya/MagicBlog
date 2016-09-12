
export default function(state = {
    post : ""
}, action) {
    switch (action.type) {
        case "hey":
            return {
                ...state
            }
        default:
            return state
    }
}

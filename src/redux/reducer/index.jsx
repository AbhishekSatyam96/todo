import { ACTION_TYPES } from '../action/ActionTypes';

let initialState = {
    todoData: [
        {
            "id": 1,
            "description": "Dominoes",
            "title": "FoodNDining",
        },
        {
            "id": 2,
            "description": "Car wash",
            "title": "utility",
        },
        {
            "id": 3,
            "description": "Amazon",
            "title": "shopping",
        },
        {
            "id": 4,
            "description": "House rent",
            "title": "Food & Dining",
        },
        {
            "id": 5,
            "description": "Tuition",
            "title": "education",
        },
        {
            "id": 6,
            "description": "Laundry",
            "title": "Personal Care",
        },
        {
            "id": 7,
            "description": "Vacation",
            "title": "Travel",
        }
    ],
};

const TodoReducer = (state = initialState, action) => {
    console.log("action in reducer", action);
    const {
        payload
    } = action;
    switch (action.type) {
        case ACTION_TYPES.ADD_TODO:
            return {
                ...state,
                todoData: [...state.todoData, payload],
            };
        case ACTION_TYPES.EDIT_TODO:
            return {
                ...state,
                todoData: state.todoData.map((data) => {
                    return data.id === payload.id ? payload : data;
                }),
            };
        case ACTION_TYPES.DELETE_TODO:
            return {
                ...state,
                todoData: state.todoData.filter((data) => data.description !== payload)
            };
        default:
            return state;
    }
}

export default TodoReducer;
import ActionTypes from "../actionTypes";

const initialState = {
  simpsons: [],
  simpsonsDataLoad: false,
  isLoading: false,
  totalCount: 0,
};

export default function (state = initialState, action) {
  let response = action.response;

  switch (action.type) {
    case ActionTypes.simpsons.GET_SIMPSONS:
      return {
        ...state,
        simpsons: [],
        isLoading: true,
        simpsonsDataLoad: false,
      };
    case ActionTypes.simpsons.GET_SIMPSONS_SUCCESS:
      return {
        ...state,
        simpsons: response,
        totalCount: response.length,
        simpsonsDataLoad: true,
        isLoading: false,
      };
    case ActionTypes.simpsons.GET_SIMPSONS_ERROR:
      return {
        ...state,
        simpsons: [],
        isLoading: true,
        simpsonsDataLoad: false,
        error: true,
      };

    case ActionTypes.simpsons.REMOVE_SIMPSON:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.simpsons.REMOVE_SIMPSON_SUCCESS:
      return {
        ...state,
        simpsons: response,
        totalCount: response.length,
        isLoading: false,
      };
    case ActionTypes.simpsons.REMOVE_SIMPSON_ERROR:
      return {
        ...state,
        isLoading: true,
        error: true,
      };

    case ActionTypes.simpsons.MOVE_UP_SIMPSON:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.simpsons.MOVE_UP_SIMPSON_SUCCESS:
      return {
        ...state,
        simpsons: [...response],
        isLoading: false,
      };
    case ActionTypes.simpsons.MOVE_UP_SIMPSON_ERROR:
      return {
        ...state,
        isLoading: true,
        error: true,
      };

    case ActionTypes.simpsons.MOVE_DOWN_SIMPSON:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.simpsons.MOVE_DOWN_SIMPSON_SUCCESS:
      return {
        ...state,
        simpsons: [...response],
        isLoading: false,
      };
    case ActionTypes.simpsons.MOVE_DOWN_SIMPSON_ERROR:
      return {
        ...state,
        isLoading: true,
        error: true,
      };

    default:
      return state;
  }
}

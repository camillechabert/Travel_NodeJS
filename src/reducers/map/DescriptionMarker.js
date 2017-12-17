import { GET_DESCRIPTION, GET_DESCRIPTION_SUCCESS, GET_DESCRIPTION_ERROR } from '../../actions/map/descriptionActions';

function Marker(state = {}, action) {
  switch (action.type) {
  case GET_DESCRIPTION:
    return {
      ...state,
      isLoading: true
    };

  case GET_DESCRIPTION_SUCCESS:
    return {
      ...state,
      isLoading: false,
      data: action.payload.marker
    };

  case GET_DESCRIPTION_ERROR:
    return {
      ...state,
      error: action.payload.error,
      isLoading: false
    };

  default:
    return {
      ...state,
      isLoading: true,
      error: null,
      data: []
    };
  }
}

export { Marker };

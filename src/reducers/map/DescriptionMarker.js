import { GET_DESCRIPTION, GET_DESCRIPTION_SUCCESS, GET_DESCRIPTION_ERROR, CHANGE_GRADE } from '../../actions/map/descriptionActions';

let dummyMarker = {
  isLoading: true,
  error: null,
  data: {
    type: null,
    name: null,
    description: null
  }
};

function Marker(state = dummyMarker, action) {
  const marker = Object.assign({}, state);

  switch (action.type) {
  case GET_DESCRIPTION:
    marker.isLoading = true;
    marker.data = {
      name: action.payload.name,
      type: action.payload.type
    };

    return marker;

  case GET_DESCRIPTION_SUCCESS:
    marker.isLoading = false;
    marker.data = {
      ...marker.data,
      ...action.payload.marker
    };

    return marker;

  case GET_DESCRIPTION_ERROR:
    marker.isLoading = false;
    marker.error = action.payload.error;

    return marker;

  case CHANGE_GRADE:
    marker.data = {
      ...marker.data,
      stars: action.payload.stars
    };

    return marker;

  default:
    return marker;
  }
}

export { Marker };

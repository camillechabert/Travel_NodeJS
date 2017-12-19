import { GET_GRADE, RECEIVE_GRADE_USER, GET_GRADE_BY_USER, ADD_GRADE, GRADE_ERROR} from '../../actions/map/gradeActions';

let dummyGrade = {
  isLoading: true,
  error: null,
  data: {
    note: null,
    user_id: null,
    note_id: null,
    type: null,
    created_at: null,
    updated_at: null
  }
};

function Grade(state = dummyGrade, action) {
  const grade = Object.assign({}, state);

  switch (action.type) {
  case GET_GRADE:
    grade.isLoading = true;

    return grade;

  case GET_GRADE_BY_USER:
    grade.isLoading = true;

    return grade;

  case RECEIVE_GRADE_USER:
    grade.isLoading = false;
    grade.data = action.payload;

    return grade;

  case ADD_GRADE:
    grade.isLoading = false;
    grade.data = action.payload;

    return grade;

  case GRADE_ERROR:
    grade.isLoading = false;
    grade.error = action.payload.error;

    return grade;

  default:
    return state;
  }
}

export { Grade };

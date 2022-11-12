import { put, call, takeLatest, delay, select } from "redux-saga/effects";
import { GetSimpsons } from "../../services/apiService";
import NavigationService from "../../services/NavigationService";
import AppRoutes from "../../utils/app-routes";
import ActionTypes from "../actionTypes";

const selectState = (state) => state.simpsonsReducer.simpsons;

function dataSorting(initialArr) {
  return initialArr.map((item, index) =>
    Object.assign(item, { sortingId: index + 1 })
  );
}

function* getSimpsons(payload) {
  try {
    console.log("payload", payload);
    const response = yield call(GetSimpsons);
    console.log("getSimpsons-response", response.success);
    if (response.success) {
      const data = dataSorting(response.data);
      yield put({
        type: ActionTypes.simpsons.GET_SIMPSONS_SUCCESS,
        response: data,
      });
    } else {
      yield put({ type: ActionTypes.simpsons.GET_SIMPSONS_ERROR });
    }
  } catch (error) {
    console.log("err", error);
  }
}

function* addSimpson(payload) {
  try {
    const { roomId } = payload.payload;
    const response = yield call(GetRoomMessages, roomId);
    let respData = response.data[0];
    let tempObj = {};
    tempObj["room_" + roomId] = respData.data;
    respData.status
      ? yield put({
          type: ActionTypes.messages.GET_ROOM_MESSAGES_SUCCESS,
          response: tempObj,
        })
      : yield put({ type: ActionTypes.messages.GET_ROOM_MESSAGES_ERROR });
    //
  } catch (error) {
    console.log("err", error);
  }
}

function* removeSimpson(payload) {
  try {
    const { simpsonId } = payload.payload;
    const tmp = yield select(selectState);
    const returnState = tmp.filter((item) => item.id != simpsonId);

    if (simpsonId) {
      yield put({
        type: ActionTypes.simpsons.REMOVE_SIMPSON_SUCCESS,
        response: returnState,
      });
    } else {
      yield put({ type: ActionTypes.simpsons.REMOVE_SIMPSON_ERROR });
    }

    //
  } catch (error) {
    console.log("err", error);
  }
}

function* moveUpSimpson(payload) {
  try {
    const { simpsonId } = payload.payload;
    const tmp = yield select(selectState);
  
    let index = tmp.findIndex((e) => e.id == simpsonId);
    if (index > 0) {
      let el = tmp[index];
      let el2 = tmp[index - 1];
      let tempEl2SortingId = el2.sortingId;
      el2.sortingId = el.sortingId;
      el.sortingId = tempEl2SortingId;

      tmp[index] = tmp[index - 1];
      tmp[index - 1] = el;
    }
    console.log("1>", tmp);

    if (simpsonId) {
      console.log("sa");
      yield put({
        type: ActionTypes.simpsons.MOVE_UP_SIMPSON_SUCCESS,
        response: tmp,
      });
    } else {
      yield put({ type: ActionTypes.simpsons.MOVE_UP_SIMPSON_ERROR });
    }
  } catch (error) {
    console.log("err", error);
  }
}

function* moveDownSimpson(payload) {
  try {
    const { simpsonId } = payload.payload;
    const tmp = yield select(selectState);
  
    let index = tmp.findIndex((e) => e.id == simpsonId);
    if (index > 0) {
      let el = tmp[index];
      let el2 = tmp[index + 1];
      let tempEl2SortingId = el2.sortingId;
      el2.sortingId = el.sortingId;
      el.sortingId = tempEl2SortingId;

      tmp[index] = tmp[index + 1];
      tmp[index + 1] = el;
    } 

    if (simpsonId) { 
      yield put({
        type: ActionTypes.simpsons.MOVE_DOWN_SIMPSON_SUCCESS,
        response: tmp,
      });
    } else {
      yield put({ type: ActionTypes.simpsons.MOVE_DOWN_SIMPSON_ERROR });
    }
  } catch (error) {
    console.log("err", error);
  }
}

const simpsonsSaga = [
  takeLatest(ActionTypes.simpsons.GET_SIMPSONS, getSimpsons),
  takeLatest(ActionTypes.simpsons.ADD_SIMPSON, addSimpson),
  takeLatest(ActionTypes.simpsons.REMOVE_SIMPSON, removeSimpson),
  takeLatest(ActionTypes.simpsons.MOVE_UP_SIMPSON, moveUpSimpson),
  takeLatest(ActionTypes.simpsons.MOVE_DOWN_SIMPSON, moveDownSimpson),
];

export default simpsonsSaga;

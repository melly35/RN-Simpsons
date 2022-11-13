import { put, call, takeLatest, delay, select } from "redux-saga/effects";
import { GetSimpsons } from "../../services/apiService";
import NavigationService from "../../services/NavigationService";
import AppRoutes from "../../utils/app-routes";
import ActionTypes from "../actionTypes";

export const selectState = (state) => state.simpsonsReducer.simpsons;

export function* getSimpsons(payload) {
  try {
    const response = yield call(GetSimpsons);
    if (response.success) {
      yield put({
        type: ActionTypes.simpsons.GET_SIMPSONS_SUCCESS,
        response: response.data,
      });
    } else {
      yield put({ type: ActionTypes.simpsons.GET_SIMPSONS_ERROR });
    }
  } catch (error) {
    console.log("err", error);
  }
}

export function* addSimpson(payload) {
  try {
    const { name_surname, job_title, about, image_url } = payload.payload;
    const temp = yield select(selectState);
    const lastCount = Object.keys(temp).length;

    let addData = {
      id: new Date().valueOf(),
      name: name_surname,
      job: job_title,
      description: about,
      avatar: image_url,
    };

    const newArr = [...temp, addData];
    
    if (name_surname) {
      yield put({
        type: ActionTypes.simpsons.ADD_SIMPSON_SUCCESS,
        response: { data: newArr, totalCount: lastCount + 1 },
      });
      NavigationService.navigate(AppRoutes.Main.childs.Home.name);
    } else {
      yield put({ type: ActionTypes.simpsons.ADD_SIMPSON_ERROR });
    }
  } catch (error) {
    console.log("err", error);
  }
}

export function* removeSimpson(payload) {
  try {
    const { simpsonId } = payload.payload;
    const tmp = yield select(selectState);
    const returnState = tmp.filter((item) => item.id != simpsonId);

    if (simpsonId) {
      yield put({
        type: ActionTypes.simpsons.REMOVE_SIMPSON_SUCCESS,
        response: { data: returnState, totalCount: Object.keys(returnState).length },
      });
    } else {
      yield put({ type: ActionTypes.simpsons.REMOVE_SIMPSON_ERROR });
    }

    //
  } catch (error) {
    console.log("err", error);
  }
}

export function* moveUpSimpson(payload) {
  try {
    const { simpsonId } = payload.payload;
    const tmp = yield select(selectState);

    let index = tmp.findIndex((e) => e.id == simpsonId);
    if (index >= 0) {
      let currentItem = tmp[index];

      tmp[index] = tmp[index - 1];
      tmp[index - 1] = currentItem;
    }


    if (simpsonId) {
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

export function* moveDownSimpson(payload) {
  try {
    const { simpsonId } = payload.payload;
    const tmp = yield select(selectState);

    let index = tmp.findIndex((e) => e.id == simpsonId);
    if (index >= 0) {
      let currentItem = tmp[index];

      tmp[index] = tmp[index + 1];
      tmp[index + 1] = currentItem;
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

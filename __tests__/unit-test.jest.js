import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react-native";
import "@testing-library/jest-dom/extend-expect";
// import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "@jest/globals";
import Actions from "../src/redux/actions";
import ActionTypes from "../src/redux/actionTypes";
import {
  addSimpson,
  getSimpsons,
  moveDownSimpson,
  moveUpSimpson,
  removeSimpson,
} from "../src/redux/sagas/simpsonsSaga";
import { runSaga } from "redux-saga";

jest.mock("axios");

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("redux-persist", () => {
  const real = jest.requireActual("redux-persist");
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

describe("Action Tests", () => {
  test("should test Get Simpsons action", () => {
    const actionReturnValue = Actions.simpsonAction.getSimpsons();

    expect(actionReturnValue.type).toEqual(ActionTypes.simpsons.GET_SIMPSONS);
  });

  test("should test RemoveSimpsons action", () => {
    const id = Math.floor(Math.random() * 100);
    const actionReturnValue = Actions.simpsonAction.removeSimpson({ id: id });

    expect(actionReturnValue.type).toEqual(ActionTypes.simpsons.REMOVE_SIMPSON);
    expect(actionReturnValue.payload.id).toEqual(id);
  });

  test("should test moveUpSimpsons action", () => {
    const id = Math.floor(Math.random() * 100);
    const actionReturnValue = Actions.simpsonAction.moveUpSimpson({ id: id });

    expect(actionReturnValue.type).toEqual(
      ActionTypes.simpsons.MOVE_UP_SIMPSON
    );
    expect(actionReturnValue.payload.id).toEqual(id);
  });

  test("should test moveDownSimpsons action", () => {
    const id = Math.floor(Math.random() * 100);
    const actionReturnValue = Actions.simpsonAction.moveDownSimpson({ id: id });

    expect(actionReturnValue.type).toEqual(
      ActionTypes.simpsons.MOVE_DOWN_SIMPSON
    );
    expect(actionReturnValue.payload.id).toEqual(id);
  });

  test("should test addSimpson action", () => {
    const payload = {
      name_surname: "Test Name",
      job_title: "Test Job title",
      about: "Test About",
      image_url: "Test IMG Url",
    };
    const actionReturnValue = Actions.simpsonAction.addSimpson(payload);

    expect(actionReturnValue.type).toEqual(ActionTypes.simpsons.ADD_SIMPSON);
    expect(actionReturnValue.payload).toEqual(payload);
  });
});

describe("Saga Tests", () => {
  afterEach(cleanup);
  test("should test Remove Simpsons", async () => {
    const state = {
      simpsons: [{ id: 1 }, { id: 2 }],
      totalCount: 2,
    };
    const dispatched = [];
    await runSaga(
      {
        getState: () => ({ simpsonsReducer: state }),
        dispatch: (action) => dispatched.push(action),
      },
      removeSimpson,
      { payload: { simpsonId: 1 } }
    ).toPromise();

    expect(dispatched[0].type).toEqual(
      ActionTypes.simpsons.REMOVE_SIMPSON_SUCCESS
    );
    expect(dispatched[0].response.totalCount).toEqual(state.totalCount - 1);
  });

  test("should test Add Simpsons", async () => {
    const state = {
      simpsons: [],
      totalCount: 0,
    };
    const payload = {
      name_surname: "testNameSurname" + new Date().valueOf,
      job_title: "testJobTitle",
      about: "testAbout",
      image_url: "testImg",
    };
    const dispatched = [];
    await runSaga(
      {
        getState: () => ({ simpsonsReducer: state }),
        dispatch: (action) => dispatched.push(action),
      },
      addSimpson,
      { payload: payload }
    ).toPromise();

    expect(dispatched[0].type).toEqual(
      ActionTypes.simpsons.ADD_SIMPSON_SUCCESS
    );
    expect(dispatched[0].response.data[0].name).toEqual(payload.name_surname);
    expect(dispatched[0].response.totalCount).toEqual(state.totalCount + 1);
  });

  test("should test moveUpSimpson", async () => {
    const state = {
      simpsons: [{ id: 1 }, { id: 2 }, { id: 3 }],
      totalCount: 3,
    };
    const payload = { simpsonId: 2 };
    const dispatched = [];
    await runSaga(
      {
        getState: () => ({ simpsonsReducer: state }),
        dispatch: (action) => dispatched.push(action),
      },
      moveUpSimpson,
      { payload: payload }
    ).toPromise();

    expect(dispatched[0].type).toEqual(
      ActionTypes.simpsons.MOVE_UP_SIMPSON_SUCCESS
    );
    expect(dispatched[0].response).toEqual(state.simpsons);
  });

  test("should test moveDownSimpson", async () => {
    const state = {
      simpsons: [{ id: 1 }, { id: 2 }, { id: 3 }],
      totalCount: 3,
    };
    const payload = { simpsonId: 3 };
    const dispatched = [];
    await runSaga(
      {
        getState: () => ({ simpsonsReducer: state }),
        dispatch: (action) => dispatched.push(action),
      },
      moveDownSimpson,
      { payload: payload }
    ).toPromise();

    expect(dispatched[0].type).toEqual(
      ActionTypes.simpsons.MOVE_DOWN_SIMPSON_SUCCESS
    );
    expect(dispatched[0].response).toEqual(state.simpsons);
  });
});

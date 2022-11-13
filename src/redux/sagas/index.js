import { all } from 'redux-saga/effects';

import simpsonsSaga from './simpsonsSaga';

export default function* rootSaga() {
    yield all([...simpsonsSaga]);
}
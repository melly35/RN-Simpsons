import { CommonActions, StackActions } from "@react-navigation/native";

let _navigator = null;
let nextNavigationTime = Date.now();
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (_navigator != null)
    _navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params: params,
      })
    );
}
function push(routeName, params = {}) {
  if (Date.now() >= nextNavigationTime && _navigator != null) {
    nextNavigationTime = Date.now() + 500;
    _navigator.dispatch(StackActions.push(routeName, params));
  }
}
function goBack() {
  if (_navigator != null) _navigator.dispatch(StackActions.pop());
}
function openDrawer() {
  if (_navigator != null) _navigator.dispatch(DrawerActions.openDrawer());
}
function closeDrawer() {
  if (_navigator != null) _navigator.dispatch(DrawerActions.closeDrawer());
}
function resetStack(initialRoute) {
  if (_navigator != null)
    _navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: initialRoute }],
      })
    );
}
export default {
  navigate,
  push,
  goBack,
  openDrawer,
  closeDrawer,
  setTopLevelNavigator,
  resetStack,
};

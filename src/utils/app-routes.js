const Main = {
  name: "Home",
  initialRoute: "Home",
  childs: {
    Home: { name: "Home", headerTitle: "Simpsons" },
    AddSimpson: { name: "AddSimpson", headerTitle: "Add New Character" },
    DetailSimpson: { name: "DetailSimpson", headerTitle: "Details" },
  },
};

const SplashScreen = {
  name: "SplashScreen",
  initialRoute: "SplashScreen",
};

const AppRoutes = {
  Main: Main,
  SplashScreen: SplashScreen,
};

export default AppRoutes;

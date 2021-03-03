import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducer";

import api from "./middleware/api";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

// used to make redux store persistent
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = configureStore({
    // used to make redux store persistent
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware({ serializableCheck: false }), api],
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

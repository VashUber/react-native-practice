import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Animated, Text } from "react-native";

import { UserList } from "./src/components/UserList";
import { UserListSearch } from "./src/components/UserListSearch";
import { Context } from "./src/state";
import { reducer } from "./src/state/reducer";

const AnimatedText = Animated.createAnimatedComponent(Text);

export default function App() {
  const [state, dispatch] = useReducer(reducer, { users: [] });
  const [search, setSearch] = useState("");
  const scaleAnimate = useRef(new Animated.Value(16)).current;

  const userListRender = useMemo(() => {
    if (!state.users.length) return [];

    return state.users
      .map((e) => ({
        id: e.id,
        name: e.name,
      }))
      .filter((e) => e.name.startsWith(search));
  }, [state.users, search]);

  const runSearch = useCallback(setSearch, []);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await (
        await fetch("https://jsonplaceholder.typicode.com/users")
      ).json();

      dispatch({ type: "set-users", payload: data });
    };

    fetchUser();
  }, []);

  useLayoutEffect(() => {
    const scaleAnimation = Animated.timing(scaleAnimate, {
      toValue: search ? 25 : 16,
      useNativeDriver: false,
    });
    scaleAnimation.start();
  }, [search]);

  return (
    <SafeAreaView>
      <AnimatedText
        style={{
          fontSize: scaleAnimate,
        }}
      >
        Найдено - {userListRender.length}
      </AnimatedText>

      <Context.Provider value={userListRender}>
        <UserListSearch runSearch={runSearch} />
        <UserList />
      </Context.Provider>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

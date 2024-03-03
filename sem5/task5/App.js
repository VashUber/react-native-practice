import { StyleSheet, View, SafeAreaView } from "react-native";
import { CardsContainer } from "./components/common/cards-container/CardsContainer";
import { StatusBar } from "expo-status-bar";

const data = [
  {
    id: 1,
    image:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/ddadb2bd7f2d40459acddbe2f51a2389_1875x1875.webp",
    title: "Двойной цыпленок",
    startPrice: "409",
  },
  {
    id: 2,
    image:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/02ca2561953b488993878d1f70e359de_1875x1875.png",
    title: "Чоризо фреш",
    startPrice: "299",
  },
  {
    id: 3,
    image:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/bebaa13644304e75b438e45be9eb5076_1875x1875.png",
    title: "Аррива!",
    startPrice: "539",
  },
  {
    id: 4,
    image:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/2cac8238ae9e42cd95dd00c17146e1fd_1875x1875.png",
    title: "Карбонара",
    startPrice: "589",
  },
  {
    id: 5,
    image:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/18dbb12240b041a191c9dc73c9c1f4ef_1875x1875.png",
    title: "Мясная",
    startPrice: "539",
  },
  {
    id: 6,
    image:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/cea570842b754c52b786c231c65bd2e2_1875x1875.png",
    title: "Ветчина и сыр",
    startPrice: "409",
  },
];

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <SafeAreaView style={{ flex: 1 }}>
        <CardsContainer data={data} />
      </SafeAreaView>
    </>
  );
}

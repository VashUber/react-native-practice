import { FlatList, useWindowDimensions } from "react-native";
import { Card } from "../card/Card";
import { useMemo } from "react";

export const CardsContainer = ({ data }) => {
  const { width } = useWindowDimensions();

  const numColumns = useMemo(() => {
    return width > 720 ? 2 : 1;
  }, [width]);

  // такой вот хак для numColumns
  return numColumns === 1 ? (
    <FlatList
      key={1}
      style={{
        flex: 1, // шорткат для flex-grow, flex-shrink, flex-basis, так как указано одно значение, устанавливает значение flex-grow: 1, растягивает элемент на всю ширину и высоту родителя
      }}
      data={data}
      renderItem={({ item }) => <Card style={{ width: "100%" }} info={item} />}
      keyExtractor={(e) => e.id}
      numColumns={1}
      contentContainerStyle={{
        paddingHorizontal: 10, // внутренний горизонтальный отступ
        gap: 20, // расстояние между элементами,
        alignItems: "center", //управляет расположением по второстепенной оси, в этом случае по центру
      }}
    />
  ) : (
    <FlatList
      key={2}
      style={{
        flex: 1, // шорткат для flex-grow, flex-shrink, flex-basis, так как указано одно значение, устанавливает значение flex-grow: 1, растягивает элемент на всю ширину и высоту родителя
      }}
      data={data}
      renderItem={({ item }) => <Card style={{ width: "50%" }} info={item} />}
      keyExtractor={(e) => e.id}
      numColumns={2}
      contentContainerStyle={{
        paddingHorizontal: 10, // внутренний горизонтальный отступ
        gap: 20, // расстояние между элементами,
        alignItems: "center", //управляет расположением по второстепенной оси, в этом случае по центру
      }}
    />
  );
};

import { FlatList, useWindowDimensions } from "react-native";
import { Card } from "../card/Card";
import { useMemo } from "react";

export const CardsContainer = ({ data }) => {
  const { width } = useWindowDimensions();

  const numColumns = useMemo(() => {
    return width > 720 ? 2 : 1;
  }, [width]);

  return (
    <FlatList
      // такой вот хак для numColumns
      key={numColumns}
      style={{
        flex: 1, // шорткат для flex-grow, flex-shrink, flex-basis, так как указано одно значение, устанавливает значение flex-grow: 1, растягивает элемент на всю ширину и высоту родителя
      }}
      data={data}
      renderItem={({ item }) => (
        <Card
          style={{ width: numColumns === 1 ? "100%" : "50%" }}
          info={item}
        />
      )}
      keyExtractor={(e) => e.id}
      numColumns={numColumns}
      contentContainerStyle={{
        paddingHorizontal: 10, // внутренний горизонтальный отступ
        gap: 20, // расстояние между элементами,
        alignItems: "center", //управляет расположением по второстепенной оси, в этом случае по центру
      }}
    />
  );
};

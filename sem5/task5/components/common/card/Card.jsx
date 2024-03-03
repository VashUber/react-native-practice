import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

export const Card = ({ style, info }) => {
  return (
    <View style={{ ...style, ...styles.card }}>
      <Image
        style={styles.image}
        source={{
          uri: info.image,
        }}
      />
      <View style={styles.bottom}>
        <Text style={styles.price}>Цена: {info.startPrice} &#8381;</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles["button-text"]}>Купить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center", //управляет расположением по второстепенной оси, в этом случае по центру
  },
  image: {
    width: "100%", // устанавливает ширину элемента, 100% от родителя
    aspectRatio: 1, // соотношение сторон, в данном случае 1 к 1, квадрат
  },
  bottom: {
    paddingHorizontal: 20, // внутренний горизонтальный отступ
    width: "100%", // устанавливает ширину элемента, 100% от родителя
    flexDirection: "row", // управляет, тем как будут располагаться элементы в flex-контейнере
    gap: 10, // расстояние между элементами
    justifyContent: "space-between", // управляет расположением по главной оси, в этом случае между элементами будет равное расстояние
    alignItems: "center", //управляет расположением по второстепенной оси, в этом случае по центру,
    flexWrap: "wrap", // перенос элементов, если они не помещаются
  },
  price: {
    fontSize: 20, // размер текста
  },
  button: {
    backgroundColor: "#3f85fc", // цвет заднего фона,
    alignItems: "center", //управляет расположением по второстепенной оси, в этом случае по центру
    justifyContent: "center", // управляет расположением по главной оси, в этом случае по центру
    padding: 10, // внутренний отступ
    borderRadius: 10, // закругление границы
  },
  "button-text": {
    color: "#fff", // цвет текста
  },
});

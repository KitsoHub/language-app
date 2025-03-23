import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { PropsWithChildren, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import BlinkingCursor from "./blinking-cursor";

interface Props {
    letters: string[];
    answer: string;
    setAnswer: (answer: string) => void;
}
const TypeLetters = ({ letters, answer, setAnswer }: Props) => {
    const [word, setWord] = React.useState<string[]>([]);
    const [availableLetters, setAvailableLetters] =
        React.useState<string[]>(letters);
    const handlePress = (letter: string, index: number) => {
        setAvailableLetters(
            (prev) => prev.filter((el, i) => i !== index) // Remove the letter at the specified index
        );
        // Add the pressed letter to the word
        setWord((prev) => [...prev, letter]);
        if (letter.length == 0) {
            setAnswer(answer + " "); // Update the answer
        } else {
            setAnswer(answer + letter); // Update the answer
        }
        // Update the answer
    };

    const handleRedo = (letter: string) => {
        if (word.length > 0) {
            const newAvailableLetters = [...availableLetters, letter];
            setAvailableLetters(newAvailableLetters);
            setWord((prev) => prev.slice(0, prev.length - 1));
            let newAnswer = "";
            word.slice(0, word.length - 1).map((el) => {
                if (el.length == 0) {
                    newAnswer = newAnswer + " ";
                } else {
                    newAnswer = newAnswer + el;
                }
            });

            setAnswer(newAnswer);
        }
    };
    // useEffect(() => {
    //   console.log(answer, answer.length);
    // }, [answer]);

    return (
        <View style={styles.container}>
            <View style={{ height: 60 }}></View>
            <View style={{ flexDirection: "row", gap: 2, width: "100%" }}>
                {true && <View style={{ height: 50 }} />}
                {word.map((el, i) => (
                    <Text key={el + i} style={styles.answerCardText}>
                        {el}
                    </Text>
                ))}
                <BlinkingCursor />
            </View>
            <View style={{ height: 0 }}></View>
            <View style={{ borderBottomColor: "gray", borderBottomWidth: 1 }}></View>

            <View style={styles.square}>
                <View style={styles.bubble}>
                    {availableLetters.map((el, i) => {
                        return (
                            <Card onPress={() => handlePress(el, i)} key={el + `${i}`}>
                                <Text style={styles.cardText}>{el}</Text>
                            </Card>
                        );
                    })}
                </View>
                <TouchableOpacity
                    onPress={() => {
                        handleRedo(word[word.length - 1]);
                    }}
                    style={{ position: "relative", backgroundColor: "red" }}
                >
                    <View
                        style={{
                            width: 40,
                            position: "absolute",
                            bottom: 5,
                            right: 5,
                        }}
                    >
                        <Feather name="delete" size={30} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TypeLetters;

const Card = ({
    children,
    onPress,
}: { onPress?: () => void } & PropsWithChildren) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 400,
    },
    square: {
        backgroundColor: "#BBFFD7",
        height: "60%",
        borderRadius: 15,
        padding: 10,
        position: "absolute",
        bottom: 0,
        width: "100%",
    },

    text: {},
    bubble: {
        flexDirection: "row",
        flex: 1,
        gap: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap",
    },
    card: {
        backgroundColor: "#fff",
        elevation: 3,
        alignItems: "center",
        justifyContent: "center",
    borderRadius: 10,
    width: 60,
    height: 40,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
  },
  answerCard: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,

    borderColor: "gray",
  },
  answerCardText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
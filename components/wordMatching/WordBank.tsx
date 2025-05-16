import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/utils/constants/colors'
import WordTile from './WordTile'


type WordBankProps= {
    words: string[]
    usedWords: string[]
    onSelectWord:(word: string) => void;
}
export default function WordBank({words, usedWords, onSelectWord}: WordBankProps) {

  //is word used with word count
  const isWordUsed = (word: string) => {
    const wordCount = words.filter(w => w === word).length;
    const usedWordCount = usedWords?.filter(w => w=== word).length
    return usedWordCount >= wordCount;
}
    return (

        <View style={styles.container}>
            <Text style={styles.label}> Words: </Text>

            <View style={styles.wordsContainer}>
                {words.map((word, index)=>{
                    const isUsed = isWordUsed(word);
                   return <WordTile
                    key={`${word}-${index}`}
                    word={word}
                    onPress={()=> onSelectWord(word)}
                    disabled={isUsed}
                    />
                })}
            </View>
        </View>

  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 5,
      },
      label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: colors.text,
      },
      wordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
})

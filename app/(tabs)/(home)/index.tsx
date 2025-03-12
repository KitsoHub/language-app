import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import EmptyState from '../../../components/shared/EmptyState';

export default function App() {
  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <EmptyState
        title={"No Data..."}
        description={"App State has not been set try again later."}
        icon="home"

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

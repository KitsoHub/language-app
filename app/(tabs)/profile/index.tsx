import EmptyState from '@/components/shared/EmptyState'
import { ScrollView, StyleSheet, Text, View } from 'react-native'



export default function ProfilePage() {
  return (
  <ScrollView>
      <View style={styles.container}>
        {/* Fetch data from store and add image */}
<Text>Test User</Text>
<Text>user@example.com</Text>
        {/* TODO: log out, profile details, profile setting, */}
              <EmptyState
                title={"No Data..."}
                description={"App State has not been set try again later."}
                icon="home"

              />



      </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 480,
    width: "100%",
    paddingTop: 61,
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
    fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
  },
})

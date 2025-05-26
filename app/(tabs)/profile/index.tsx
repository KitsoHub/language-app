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
<<<<<<< Updated upstream
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
=======
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollView: {
    flex: 1,
    padding: 16,
    marginBottom: 4,
  },
  modalView: {
    flex: 1,
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    position: 'absolute',
    bottom: 0,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSpacer: {
    height: 10, // Adjust the height as needed
  },

  statsContainer: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  skillsContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  sectionTitle: {
    fontSize: 18,
    color: colors.text,
    fontWeight: 600,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 15,
    color: colors.textLight,
    fontWeight: 500,
    marginBottom: 16,
  },


});
>>>>>>> Stashed changes

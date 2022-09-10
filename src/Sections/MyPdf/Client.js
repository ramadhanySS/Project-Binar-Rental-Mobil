import { StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  container: {
    marginTop: 20,
  }
})

function Client({ address, phone, to }) {
  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Submitted To:</Text>
      <Text>{to}</Text>
      <Text>{phone}</Text>
    </View>
  )
}

export default Client

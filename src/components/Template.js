import { StyleSheet, Text, View } from 'react-native';

const Template = () => {
    return (
        <View style={styles.container}>
            <Text>Template</Text>
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

export default Template;
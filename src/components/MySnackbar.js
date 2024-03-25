
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

const MySnackbar = (props) => {

    const [message, setMessage] = useState(props.message);
    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => {
        setMessage("");
    };

    useEffect(() => {
        console.log("loading snackbar with message ", message);
        if (message)
            setTimeout(() => {
                if (message) {
                    setMessage("");
                    props.setMessage("");
                }
            }, 2000);
    }, [])


    return (

        <Snackbar
            style={{ position: "absolute", bottom: 20, left: "10%", width:"80%" }}
            visible={message && message.length ? true : false}
            onDismiss={onDismissSnackBar}
            action={{
                label: 'OK',
                onPress: () => {
                    setMessage("")
                    props.setMessage("")
                },
            }}>{
                message
            }
        </Snackbar>
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

export default MySnackbar;
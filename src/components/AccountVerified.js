import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-paper';

const AccountVerified = (props) => {

    const signin = () => {
        props.navigation.navigate("signin");
    }


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.29)']}
                style={{
                    position: 'absolute',
                    left: -100,
                    bottom: 0,
                    borderRadius: 615,
                    width: 615,
                    height: 615
                }}
            />
            <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.29)']}
                style={{
                    position: 'absolute',
                    left: 20,
                    bottom: 0,
                    borderRadius: 715,
                    width: 715,
                    height: 715
                }}
            />
            <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.09)']}
                style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    borderRadius: 515,
                    width: 515,
                    height: 515
                }}
            />
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                    flex: 1
                }}
            >
                <Avatar.Icon icon={'check'} style={{ backgroundColor: '#5d8df7', width: 100, height: 100, borderRadius: 100 }} color='#FFF' />
                <Text style={{
                    color: "#1D1E25",
                    fontSize: 24,
                    fontWeight: 700,
                    lineHeight: 30,
                    marginTop: 20
                }}>Account Verified</Text>
                <Text style={{
                    color: "#1D1E25",
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: 24,
                    marginTop: 10,
                    textAlign: "center"

                }}>Your account has been verified succesfully, you will receive your login credentials in your email.</Text>
            </View>
            <View style={{
                justifyContent: "flex-end",
                marginBottom: 30,

                width: "100%",
                alignItems: "center"
            }}>
                <View style={{
                    backgroundColor: "#5D8DF7",
                    padding: 10,
                    width: "90%"
                }}
                    onTouchEnd={signin}
                >
                    <Text style={{
                        color: "#FFF",
                        textAlign: "center",
                        fontSize: 17, fontWeight: 900
                    }}>Sign In</Text>
                </View>
            </View>
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

export default AccountVerified;
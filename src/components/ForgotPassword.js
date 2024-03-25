import { Image, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import css from '../common/css';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import MySnackbar from './MySnackbar';
import { useDispatch } from 'react-redux';
import { signinUser } from '../store/User';
import api from '../services/API';
import TopHeader from './TopHeader';

const ForgotPassword = (props) => {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");



    const reset = async () => {
        //setIsFirstTime(false);

        if (username == "") {
            useDispatch(setMessage("Enter username"));
            return;
        }

        setIsLoading(true);

        const result = await api.resetPassword({
            username,
            "resetPasswordURL": "https://ascend.ascendehr.com/web/reset-password"
        });

        console.log("\n\n\ resut", result);

        if (result);
        setMessage(result.message || "Something went wrong")


        setIsLoading(false);
    }


    return (
        <View style={[css.container, { justifyContent: "flex-start", alignItems: "center" }]}>
            <TopHeader showBackButton={true} />
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.1)']}
                style={{
                    position: 'absolute',
                    right: 10,
                    top: 0,
                    borderRadius: 415,
                    width: 415,
                    height: 415
                }}
            />
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.09)']}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 0,
                    borderRadius: 615,
                    width: 615,
                    height: 615
                }}
            />
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.09)']}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    borderRadius: 815,
                    width: 815,
                    height: 815
                }}
            />

            <ScrollView contentContainerStyle={{ width: "100%" }} style={{
                width: "100%",
            }}>

                <View style={{ justifyContent: "flex-end", alignItems: "center", paddingTop: 15, paddingBottom: 10 }}>
                    <Image source={require("./../assets/aceso.png")} />

                    <Text style={{ fontSize: 24, fontWeight: 700, marginTop: 30 }} >Forgot Password</Text>
                    {/* <Text style={{ fontSize: 16, fontWeight: 400, color: "#808D9E" }} >Receive credentials on email</Text> */}
                </View>

                <View style={{ width: "100%", alignItems: "center", justifyContent: "center", paddingTop: 0 }}>

                    <TextInput
                        placeholder='Username'
                        mode='outlined'
                        onChangeText={setUsername}
                        value={username}
                        style={{ width: "90%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    />

                </View>
                <View style={{
                    height: 60
                }}></View>
                <View style={{ flex: 1, paddingBottom: 20, justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
                    {
                        isLoading ? <ActivityIndicator size={20} color='#5D8DF7' style={{ margin: 10 }} />
                            : <></>
                    }
                    <Button onPress={reset} type="elevated" buttonColor='#5D8DF7' textColor='#FFF' style={{ width: "90%", borderRadius: 0, height: 40 }} labelStyle={{ fontWeight: 900, fontSize: 16 }}>Reset</Button>
                </View>
            </ScrollView>

            {
                message && message.length ? <MySnackbar message={message} setMessage={setMessage} />
                    : <></>
            }

        </View>
    );
}

export default ForgotPassword;
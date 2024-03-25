import { Image, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import css from '../common/css';
import { Button, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import MySnackbar from './MySnackbar';
import { OtpInput } from "react-native-otp-entry";
import { store } from '../store/Store';
import api from '../services/API';
import { useDispatch } from 'react-redux';
import { signinUser } from '../store/User';
import TopHeader from './TopHeader';

const Verify = (props) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [timerTimex, setTimerTimex] = useState("0:00");
    const [seconds, setSeconds] = useState(60);
    const [code, setCode] = useState("");
    const [userData, setUserData] = useState({});
    const dispatch = useDispatch();

    const verify = async () => {
        console.log("Verify ", { email, code });
        setMessage("Verifying code");
        //console.log("new message is ", message)
        const verifyCode = await api.verifyCode({ patientId: userData.patientId, code });
        console.log(verifyCode);
        if (verifyCode && verifyCode.statusCode == 200) {
            if (verifyCode.appError)
                setMessage(verifyCode.appError);
            else {
                setMessage(verifyCode.message);
                // dispatch(signinUser({
                //     username: userData.username,
                //     profile: {
                //         photoPath: "",
                //         photoThumbnailPath: "",
                //         DOB: null,
                //         locationID: null,
                //         id: userData.patientId,
                //     },
                //     patientId: userData.patientId
                // }))
                props.navigation.navigate("account-verified");
            }
        } else {
            setMessage(verifyCode?.message || "Something went wrong");
        }
    }

    const startTimer = () => {
        setSeconds(60);
    };

    useEffect(() => {

        console.log("code ", code, " len : ", code.length);
        if (code.length == 4) {
            console.log(" call verify otp ", code);
            verify();
        }

    }, [code])


    // useEffect to handle the timer countdown
    useEffect(() => {
        let interval;

        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    useEffect(() => {
        const data = store.getState().user;
        setUserData(data);
        console.log("userData", userData);
        setEmail(data.email);
    }, [])


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
            <View style={{ flex: 2, justifyContent: "flex-end", alignItems: "center", width: "100%", zIndex: 10 }}>
                <Image source={require("./../assets/aceso.png")} />
                <View style={{ width: "90%", marginTop: 30 }}>
                    <Text style={{ fontSize: 24, fontWeight: 700, textAlign: "left" }} >Verify Code</Text>
                    <Text style={{ fontSize: 16, fontWeight: 400, color: "#808D9E" }} >Please enter the code we just sent to email {email}</Text>
                </View>
            </View>

            <View style={{ flex: 2, width: "100%", alignItems: "center", justifyContent: "flex-start", paddingTop: 10 }}>
                <View style={{ width: "90%", alignItems: "center", backgroundColor: "transparent" }}>
                    <OtpInput numberOfDigits={4} onTextChange={(text) => setCode(text)} theme={{
                        pinCodeContainerStyle: {
                            borderColor: "#FFF",
                            borderWidth: 3
                        }
                    }}
                    />
                    {
                        // seconds ?
                        //     <Text style={{ marginTop: 10, color: "lightgray" }}>Resend code in <Text style={{ color: "#333" }}>00:{seconds > 9 ? seconds : '0' + seconds}</Text></Text>
                        //     : <Text style={{ marginTop: 10 }} onPress={startTimer}>Resend code</Text>

                    }
                </View>
            </View>

            <View style={{ flex: 1, paddingBottom: 50, justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
                <Button onPress={verify} type="elevated" buttonColor='#5D8DF7' textColor='#FFF' style={{ width: "90%", borderRadius: 0, height: 40 }} labelStyle={{ fontWeight: 900, fontSize: 16 }}>Verify</Button>
            </View>
            {
                message && message.length ? <MySnackbar message={message} setMessage={setMessage} />
                    : <></>
            }
        </View>
    );
}

export default Verify;
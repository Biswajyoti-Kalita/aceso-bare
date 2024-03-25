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

const Signin = (props) => {
    const [text, onChangeText] = useState('Useless Text');
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [secondTime, setSecondTime] = useState(false);
    const [questions, setQuestions] = useState({});
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const checkSecurityQuestion = async () => {
        setIsLoading(true);

        const securityListQuestions = [];


        Object.keys(questions)?.map((key) => {
            if (questions[key].answere)
                securityListQuestions.push({
                    "Id": 0,
                    "QuestionID": `${questions[key].id}`,
                    "Answer": questions[key].answere
                });
        });


        console.log(" sec list ", securityListQuestions);

        if (securityListQuestions.length == 0) {
            setMessage("Please answere one question ");
            return;
        }



        const payload = {
            "userName": username,
            "password": password,
            "QuestionID": securityListQuestions[0]["QuestionID"],
            "Answer": securityListQuestions[0]["Answer"],
            "macaddress": "ec:aa:a0:2d:dc:67"
        };

        const result = await api.checkSecurityQuestions(payload);
        console.log("\n\n checkSecurityQuestions resut", result);

        if (result && result.statusCode == 0) {
            setSecondTime((prevDate) => false);
            signin({ force: true });
        }


        setIsLoading(false);

    }
    const saveSecurityAnswere = async () => {

        setIsLoading(true);

        console.log("save security ");
        const securityListQuestions = [];

        Object.keys(questions)?.map((key) => {
            if (questions[key].answere == '') {
                setMessage("Please answere the question " + questions[key].question);
                return;
            }

            securityListQuestions.push({
                "Id": 0,
                "QuestionID": `${questions[key].id}`,
                "Answer": questions[key].answere
            });

        })

        console.log(" sec list ", securityListQuestions);

        if (securityListQuestions.length < Object.keys(questions).length) {
            setMessage("Please answere all the question ");
            return;
        }

        const payload = {
            "userName": username,
            "password": password,
            "SecurityQuestionList": securityListQuestions,
            "ipaddress": "2405:201:ac02:805a:458b:d1ba:695a:cd13",
            "macaddress": "ec:aa:a0:2d:dc:67"
        };

        const result = await api.saveSecurityQuestions(payload);
        console.log("\n\n saveSecurityQuestions resut", result);

        if (result && result.statusCode == 0) {
            setIsFirstTime((prevData) => false);
            signin({ force: true });
        }
        setIsLoading(false);
    }

    const signin = async ({ force = false }) => {
        //setIsFirstTime(false);
        console.log("signin ", { username, password, isFirstTime, force }, !force && isFirstTime);

        if (!force && isFirstTime) {
            saveSecurityAnswere();
            return;
        }


        if (!force && secondTime) {
            checkSecurityQuestion();
            return;
        }
        setIsLoading(true);

        const result = await api.loginPatient({
            username,
            password,
            "macaddress": "ec:aa:a0:2d:dc:67"
        });
        console.log("\n\n\ resut", result);

        if (result && result.statusCode == 0) {
            dispatch(signinUser({
                username: username,
                token: result.access_token,
                profile: {
                    photoPath: result.data?.photoPath,
                    photoThumbnailPath: result.data?.photoThumbnailPath,
                    DOB: result.data?.toDOB,
                    locationID: result.data?.locationID,
                    id: result.data?.id,
                    gender: result.data?.gender,
                },
                patientId: result.data?.id
            }));

            setIsLoading(false);
        } else if (result && result.statusCode == 200) {
            console.log("unable to login  firstTimeLogin?", result['firstTimeLogin']);

            if (result['firstTimeLogin']) {

                if (result.message)
                    setMessage(result.message);

                setIsFirstTime(true);
                let temp = {};
                result?.data?.map((item) => {
                    temp[item.id] =
                    {
                        question: item.question,
                        answere: "",
                        id: item.id
                    };

                })
                setQuestions({ ...temp });
                console.log('temp', temp);

                setIsLoading(false);
            } else {
                console.log("second time login");

                if (Object.keys(questions).length > 0) {
                    checkSecurityQuestion();
                    return;
                }
                setSecondTime(true);
                let temp = {};
                result?.data?.map((item) => {
                    temp[item.id] =
                    {
                        question: item.question,
                        answere: "",
                        id: item.id
                    };

                })
                setQuestions({ ...temp });
                console.log('temp', temp);

                //                checkSecurityQuestion();
                setMessage(result.message || "Unable to login")

                setIsLoading(false);
            }
        } else {
            setMessage(result.message || "Unable to login")

        }


        setIsLoading(false);
    }

    useEffect(() => {

        console.log("questions updated ", questions);
        Object.keys(questions).forEach((key) => console.log(key));
    }, [questions])


    const addAnswere = (txt, id) => {
        let temp = questions;
        temp[id].answere = txt;
        setQuestions({ ...temp });
    }

    const moveToForgotPassword = () => {
        props.navigation.navigate("forgot-password");
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

                    <Text style={{ fontSize: 24, fontWeight: 700, marginTop: 30 }} >Welcome Back</Text>
                    <Text style={{ fontSize: 16, fontWeight: 400, color: "#808D9E" }} >Signin to your account</Text>
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
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={showPassword ? false : true}
                        mode='outlined'
                        onChangeText={setPassword}
                        value={password}
                        style={{ width: "90%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                        right={showPassword ? <TextInput.Icon icon="eye" onPress={() => setShowPassword(false)} color={"lightgray"} /> : <TextInput.Icon icon="eye-off" onPress={() => setShowPassword(true)} color={"lightgray"} />}
                    />
                    <View onTouchEnd={moveToForgotPassword} style={{ alignItems: "flex-end", width: "90%", }}>
                        <Text style={{ fontSize: 14, color: "blue", textAlign: "right" }}>Forgot Password?</Text>
                    </View>


                    {
                        Object.keys(questions).length > 0 && <View style={{ justifyContent: "flex-start", width: "100%", marginLeft: "10%", marginBottom: 10 }}><Text style={{
                            textAlign: "left",
                            fontWeight: 500,
                            fontSize: 14
                        }}>Enter Security Questions</Text></View>
                    }
                    {
                        Object.keys(questions).map((key) => (
                            <TextInput
                                key={key}
                                placeholder={questions[key].question}
                                mode='outlined'
                                onChangeText={(txt) => addAnswere(txt, key)}
                                value={questions[key].answere}
                                style={{ width: "90%", backgroundColor: "#FFF", marginBottom: 20 }}
                                contentStyle={{ fontSize: 16, color: "black" }}
                                outlineStyle={{ borderColor: "#fff" }}
                            />
                        ))
                    }
                </View>
                <View style={{
                    height: 60
                }}></View>
                <View style={{ flex: 1, paddingBottom: 20, justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
                    {
                        isLoading ? <ActivityIndicator size={20} color='#5D8DF7' style={{ margin: 10 }} />
                            : <></>
                    }
                    <Button onPress={signin} type="elevated" buttonColor='#5D8DF7' textColor='#FFF' style={{ width: "90%", borderRadius: 0, height: 40 }} labelStyle={{ fontWeight: 900, fontSize: 16 }}> Sign In</Button>
                    <Text style={{ marginTop: 20, fontSize: 16, color: "#808D9E", fontWeight: 400 }}>Don't have an account? <Text style={{ fontSize: 16, color: "#5D8DF7", fontWeight: 400 }} onPress={() => props.navigation.navigate("signup")}>Sign Up</Text> </Text>
                </View>
            </ScrollView>

            {
                message && message.length ? <MySnackbar message={message} setMessage={setMessage} />
                    : <></>
            }

        </View>
    );
}

export default Signin;
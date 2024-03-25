import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View, Platform } from 'react-native';
import { Avatar, Badge, Button, Drawer, Icon, Menu } from 'react-native-paper';
import { store } from '../store/Store';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { signoutUser, updateUserFields } from '../store/User';
import api from '../services/API';
import MySnackbar from './MySnackbar';
import { LineChart } from "react-native-gifted-charts";
import MyDrawer from './MyDrawer';
import CustomMenu from './CustomMenu';
import AppointmentCard from './AppointmentCard';
import { useFocusEffect } from '@react-navigation/native';
import storage from '../services/StorageService';
const TopBox = ({ text, icon, count }) => {
    return <View style={{
        maxWidth: 140,
        padding: 20,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        borderRadius: 10,
        borderColor: "#aaa",
        alignItems: "stretch",
        borderWidth: 1
    }}>
        <Text
            style={{
                color: "#1D1E25",
                fontSize: 12,
                fontWeight: 400,
                textTransform: "uppercase"
            }}
        >{text}</Text>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", alignItems: "flex-end" }}>
            <Text style={{
                color: "#1D1E25",
                fontSize: 20,
                fontWeight: 400
            }}>{count}</Text><Image source={require("./../assets/card-icon.png")} width={23} />
        </View>
    </View>
}

const Home = (props) => {
    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [patientDetails, setPatientDetails] = useState({});
    const vitals = [
        {
            text: "Heart Rate",
            color: "#D9D9D9"
        },
        {
            text: "BMI",
            color: "#FF6384"
        },
        {
            text: "Diastolic BP",
            color: "#36A2EB"
        },
        {
            text: "Systolic BP",
            color: "#FFCE56"
        },
        {
            text: "Height(ln)",
            color: "#4BC0C0"
        },
        {
            text: "Pulse",
            color: "#97BBCD"
        },
        {
            text: "Respiration",
            color: "#F7464A"
        },
        {
            text: "Temperature(c)",
            color: "#46BFBD"
        },
        {
            text: "Weight(Lb)",
            color: "#D9D9D9"
        }
    ];

    const dispatch = useDispatch();

    const navigateToAppointment = () => {
        props.navigation.navigate("Appointment");
    }


    const getVitalChartData = (patientVitals) => {

        let heartRate = [], bmi = [], dbp = [], sbp = [], height = [], pulse = [], respiration = [], temp = [], weight = [];

        //test data

        // patientVitals = [
        //     {
        //         "id": 34,
        //         "patientID": 56,
        //         "patientAppointmentID": 0,
        //         "bpDiastolic": 70,
        //         "bpSystolic": 130,
        //         "heightIn": 175.0,
        //         "weightLbs": 65.0,
        //         "heartRate": 72,
        //         "pulse": 85,
        //         "respiration": 5,
        //         "bmi": 1.71,
        //         "temperature": 28.0,
        //         "vitalDate": "2022-01-11T00:00:00",
        //         "totalRecords": 0.0
        //     },
        //     {
        //         "id": 34,
        //         "patientID": 56,
        //         "patientAppointmentID": 0,
        //         "bpDiastolic": 75,
        //         "bpSystolic": 135,
        //         "heightIn": 185.0,
        //         "weightLbs": 75.0,
        //         "heartRate": 82,
        //         "pulse": 95,
        //         "respiration": 15,
        //         "bmi": 1.51,
        //         "temperature": 38.0,
        //         "vitalDate": "2022-01-11T00:00:00",
        //         "totalRecords": 0.0
        //     },
        //     {
        //         "id": 34,
        //         "patientID": 56,
        //         "patientAppointmentID": 0,
        //         "bpDiastolic": 85,
        //         "bpSystolic": 145,
        //         "heightIn": 175.0,
        //         "weightLbs": 85.0,
        //         "heartRate": 92,
        //         "pulse": 105,
        //         "respiration": 25,
        //         "bmi": 1.61,
        //         "temperature": 48.0,
        //         "vitalDate": "2022-01-12T00:00:00",
        //         "totalRecords": 0.0
        //     },
        //     {
        //         "id": 34,
        //         "patientID": 56,
        //         "patientAppointmentID": 0,
        //         "bpDiastolic": 95,
        //         "bpSystolic": 155,
        //         "heightIn": 185.0,
        //         "weightLbs": 95.0,
        //         "heartRate": 102,
        //         "pulse": 115,
        //         "respiration": 35,
        //         "bmi": 1.71,
        //         "temperature": 58.0,
        //         "vitalDate": "2022-01-12T00:00:00",
        //         "totalRecords": 0.0
        //     },
        //     {
        //         "id": 34,
        //         "patientID": 56,
        //         "patientAppointmentID": 0,
        //         "bpDiastolic": 85,
        //         "bpSystolic": 145,
        //         "heightIn": 175.0,
        //         "weightLbs": 85.0,
        //         "heartRate": 92,
        //         "pulse": 105,
        //         "respiration": 25,
        //         "bmi": 1.61,
        //         "temperature": 48.0,
        //         "vitalDate": "2022-01-13T00:00:00",
        //         "totalRecords": 0.0
        //     },
        //     {
        //         "id": 34,
        //         "patientID": 56,
        //         "patientAppointmentID": 0,
        //         "bpDiastolic": 95,
        //         "bpSystolic": 155,
        //         "heightIn": 185.0,
        //         "weightLbs": 95.0,
        //         "heartRate": 102,
        //         "pulse": 115,
        //         "respiration": 35,
        //         "bmi": 1.71,
        //         "temperature": 58.0,
        //         "vitalDate": "2022-01-14T00:00:00",
        //         "totalRecords": 0.0
        //     }

        // ];


        patientVitals?.map((vital) => {
            let vdate = new Date(vital.vitalDate);
            let dateLabel = vdate.getDate() + "/" + (vdate.getMonth() + 1) + "/" + vdate.getFullYear();
            heartRate.push({
                value: vital.heartRate,
                label: dateLabel
            });
            bmi.push({
                value: vital.bmi,
                label: dateLabel
            });
            dbp.push({
                value: vital.bpDiastolic,
                label: dateLabel
            });
            sbp.push({
                value: vital.bpSystolic,
                label: dateLabel
            });
            height.push({
                value: vital.heightIn,
                label: dateLabel
            });
            weight.push({
                value: vital.weightLbs,
                label: dateLabel
            });
            pulse.push({
                value: vital.pulse,
                label: dateLabel
            });
            respiration.push({
                value: vital.respiration,
                label: dateLabel
            });
            temp.push({
                value: vital.temperature,
                label: dateLabel
            });

        })
        console.log({
            heartRate, bmi, dbp, sbp, height, pulse, respiration, temp, weight
        })
        if (!patientVitals || patientVitals.length == 0)
            return [{
                data: [{ value: 0 }],
                color: "red",
                dataPointsColor: "red"
            }, {
                data: [{ value: 0 }],
                color: "blue",
                dataPointsColor: "blue"
            }];


        return [
            {
                data: heartRate,
                color: "#D9D9D9",
                dataPointsColor: "#D9D9D9"
            },
            {
                data: bmi,
                color: "#FF6384",
                dataPointsColor: "#FF6384"
            },
            {
                data: dbp,
                color: "#36A2EB",
                dataPointsColor: "#36A2EB"
            },
            {
                data: sbp,
                color: "#FFCE56",
                dataPointsColor: "#FFCE56"
            },
            {
                data: height,
                color: "#4BC0C0",
                dataPointsColor: "#4BC0C0"
            },
            {
                data: pulse,
                color: "#97BBCD",
                dataPointsColor: "#97BBCD"
            },
            {
                data: respiration,
                color: "#F7464A",
                dataPointsColor: "#F7464A"
            },
            {
                data: temp,
                color: "#46BFBD",
                dataPointsColor: "#46BFBD"
            },
            {
                data: weight,
                color: "#D9D9D9",
                dataPointsColor: "#D9D9D9"
            }
        ]
    }

    const loadDefault = async () => {
        const currentuser = store.getState().user;
        console.log({ currentuser });
        if (currentuser && currentuser.token) {

            const userDashboardResult = await api.getPatientDashboard({
                token: currentuser.token
            });
            if (userDashboardResult && userDashboardResult.data) {
                console.log({ upcomingAppointments: userDashboardResult.data.upcomingAppointments });
                dispatch(updateUserFields({ token: userDashboardResult.access_token }))
                setUser(userDashboardResult.data);
                const currentDate = new Date();
                const _upcomingAppointments = await api.getPatientAppointments({
                    fromDate: currentDate.toISOString().substring(0, 10),
                    patientIds: currentuser.profile?.id,
                    locationIds: currentuser.profile?.locationID,
                    token: userDashboardResult.access_token
                });

                if (_upcomingAppointments && _upcomingAppointments.data) {
                    let data = _upcomingAppointments.data;

                    data = data.filter(d => new Date(d.startDateTime).getTime() > currentDate.getTime())
                    setUpcomingAppointments(data);
                }


                const _patientDetails = await api.getPatientDetails({
                    id: currentuser.profile?.id,
                    token: userDashboardResult.access_token
                });

                if (_patientDetails && _patientDetails.data) {
                    setPatientDetails(_patientDetails.data);
                }

            } else {
                setMessage("Session expired");
                setTimeout(() => dispatch(signoutUser()), 1500);
            }
        } else {
            setMessage("Session expired")
            setTimeout(() => dispatch(signoutUser()), 1500);
        }
    }


    const checkAppointmentRequest = async () => {

        const checkAppointmentRequestExist = await storage.getKeyData("appointmentRequest");
        if (checkAppointmentRequestExist) {

            console.log({ checkAppointmentRequestExist });
            await storage.removeItem("appointmentRequest");
            props.navigation.navigate("confirm-appointment-auth", checkAppointmentRequestExist);

        }
    }

    useFocusEffect(
        useCallback(() => {
            loadDefault();
        }, [])
    )


    useEffect(() => {
        checkAppointmentRequest();
        // loadDefault();
    }, [])

    return (
        <>
            <ScrollView style={{ paddingTop: 10, backgroundColor: "#FFF" }} contentContainerStyle={{ backgroundColor: "#FFF" }}>
                <View>
                    <LinearGradient
                        colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.29)']}
                        style={{
                            position: 'absolute',
                            left: -100,
                            top: 0,
                            borderRadius: 315,
                            width: 315,
                            height: 315
                        }}
                    />
                    <LinearGradient
                        colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.29)']}
                        style={{
                            position: 'absolute',
                            right: 20,
                            top: 0,
                            borderRadius: 315,
                            width: 315,
                            height: 315
                        }}
                    />
                    <LinearGradient
                        colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.09)']}
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            borderRadius: 415,
                            width: 415,
                            height: 415
                        }}
                    />
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 20, paddingTop: 30 }}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <View style={{ borderRightWidth: 1, paddingRight: 10, marginRight: 10, borderColor: "#9CBAFF" }}>
                                <Text style={{ color: "#1B387A", fontSize: 10, fontWeight: 400, lineHeight: 50 }}>Ascend Health System</Text>
                            </View>
                            <Image source={require("./../assets/aceso.png")} style={{ width: 50, height: 50 }} />
                        </View>
                        <View style={{ justifyContent: "space-between", width: 60, display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <View>
                                <Badge size={10} style={{ position: "absolute" }} />
                                <Icon source="bell" color='#5e8df7' size={24} />
                            </View>
                            <CustomMenu />

                        </View>
                    </View>
                    <View style={{ padding: 20, paddingTop: 5, display: "flex", flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center", marginRight: 10 }}>
                            {
                                user && user.profile && user.profile.photoPath ?
                                    <Image source={{ uri: user.profile.photoPath }} style={{ width: 50, height: 50 }} />
                                    :
                                    <Avatar.Icon size={60} icon={"account"} />
                            }
                        </View>
                        <View>
                            {/* <Text style={{
                                color: "#747474",
                                fontSize: 14,
                                fontWeight: 400,
                            }}>Welcome</Text> */}
                            <Text style={{
                                color: "#747474",
                                fontSize: 14,
                                fontWeight: 600,
                            }}>
                                {
                                    user && user.firstName ? user.firstName : ""
                                }
                                {' '}
                                {
                                    user && user.lastName ? user.lastName : ""
                                }
                            </Text>

                            <Text style={{
                                color: "#747474",
                                fontSize: 12,
                                fontWeight: 400,
                            }}>
                                <Icon source={'email'} color='#747474' /> {' '}
                                {
                                    user && user.email ? user.email : ""
                                }
                            </Text>
                            <Text style={{
                                color: "#747474",
                                fontSize: 12,
                                fontWeight: 400,
                            }}>
                                <Icon source={'phone'} color='#747474' /> {' '}
                                {
                                    user && user.phoneNumber ? user.phoneNumber : ""
                                }
                            </Text>
                            <Text style={{
                                color: "#747474",
                                fontSize: 12,
                                fontWeight: 400,
                            }}>
                                <Icon source={'calendar-blank'} color='#747474' /> {' '}
                                {
                                    user && user.dob ? user.dob.substring(0, 10) : ""
                                }
                            </Text>
                            <Text style={{
                                color: "#747474",
                                fontSize: 12,
                                fontWeight: 400,
                            }}>
                                <Icon source={'map'} color='#747474' /> {' '}
                                {
                                    user && user.address ? user.address : ""
                                }
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: "#FFF", borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 10, minHeight: "100vh" }}>
                    <View >
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
                            <TopBox text={'Total Medications'} icon={'file-document'} count={user.medicationCount ? user.medicationCount : 0} />
                            <TopBox text={'Total Allergies'} icon={'file-document'} count={user.allergiesCount ? user.allergiesCount : 0} />
                            <TopBox text={'Total Lab Order'} icon={'file-document'} count={user.labCount ? user.labCount : 0} />
                        </View>
                    </View>
                    <View style={{ marginTop: 30, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: "95%", display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                            <Text style={{
                                color: "#1D1E25",
                                textAlign: "center",
                                fontSize: 14,
                                fontWeight: 500
                            }}>My Appointments</Text>
                            <Text style={{
                                color: "#5E8DF7",
                                textAlign: "center",
                                fontSize: 14,
                                fontWeight: 500
                            }}
                                onPress={navigateToAppointment}
                            >See all</Text>
                        </View>
                        <View style={{ marginTop: 20, alignItems: "flex-start", display: "flex", width: "95%", marginBottom: 20 }}>
                            {
                                user && upcomingAppointments && (upcomingAppointments.length === 0) && <Text>No upcoming appointments</Text>
                            }
                            {
                                upcomingAppointments?.map((appointment, index) => (
                                    <AppointmentCard appointment={appointment} key={index} />
                                ))
                            }
                        </View>
                        <View style={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            width: "100%"
                        }}>
                            <Text style={{
                                color: "#1D1E25",
                                fontSize: 16,
                                fontWeight: 500,
                                lineHeight: 28,
                                paddingLeft: 15
                            }}>
                                Vital Graph
                            </Text>

                        </View>

                        <View style={{ marginTop: 20, display: "flex", width: "95%", flexDirection: "row" }}>
                            <View style={{ flex: 4, paddingRight: 10, justifyContent: "flex-start", alignItems: "flex-start" }}>
                                {/* <ScrollView horizontal={true}> */}
                                <LineChart
                                    // disableScroll={true}
                                    overflowTop={20}
                                    overflowBottom={20}
                                    spacing={patientDetails?.patientVitals ? 45 : 50}
                                    dataSet={getVitalChartData(patientDetails?.patientVitals)}
                                    xAxisLabelTextStyle={{
                                        fontSize: 7
                                    }}
                                    maxValue={200}
                                    adjustToWidth={true}
                                    endSpacing={10}

                                />
                                {/* </ScrollView> */}
                            </View>
                            <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                                {
                                    vitals?.map((vital, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }} ><View style={{
                                                marginVertical: 5,
                                                backgroundColor: vital.color,
                                                borderRadius: 10,
                                                width: 10,
                                                height: 10,
                                                marginRight: 5
                                            }}></View><Text style={{ color: "#979CA7", fontSize: 8, fontWeight: 500 }}>{vital.text}</Text></View>

                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {
                message && message.length ? <MySnackbar message={message} setMessage={setMessage} />
                    : <></>
            }
        </>
    );
}

export default Home;
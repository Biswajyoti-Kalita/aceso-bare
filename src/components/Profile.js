import { useFocusEffect } from '@react-navigation/native';
import { Linking, ScrollView, Text, View } from 'react-native';
import { store } from '../store/Store';
import api from '../services/API';
import { useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import TopHeader from './TopHeader';
import TopHeaderV2 from './TopHeaderV2';
import { Avatar } from 'react-native-paper';
import { Image } from 'react-native';

const Profile = (props) => {

    const [patient, setPatient] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [selectedTab, setSelectedTab] = useState(1);
    const [selectedSubTab, setSelectedSubTab] = useState(1);



    const loadDefault = async () => {
        const currentuser = store.getState().user;
        console.log({ currentuser });
        setUserDetails({ ...currentuser.profile });
        if (currentuser && currentuser.profile && currentuser.token && currentuser.profile.id) {
            const patientDetails = await api.getPatientDetails({
                id: currentuser.profile.id,
                token: currentuser.token
            });
            console.log("patientDetails ");
            console.log({ patientDetails: patientDetails.data })
            if (patientDetails && patientDetails.data) {
                if (patientDetails.data["patientDiagnosisDetails"] && patientDetails.data["patientDiagnosisDetails"].length)
                    patientDetails.data["patientDiagnosisDetails"] = patientDetails.data["patientDiagnosisDetails"].reverse();

                const patientLabOrders = await api.getPatientLabOrders({
                    token: currentuser.token
                });

                if (patientLabOrders && patientLabOrders.data)
                    patientDetails.data["labOrders"] = patientLabOrders.data;



                const patientAllergies = await api.getPatientAllergies({
                    token: currentuser.token
                });

                if (patientAllergies && patientAllergies.data)
                    patientDetails.data["allergies"] = patientAllergies.data;



                const patientHistory = await api.getPatientMedicalHistory({
                    id: currentuser.profile.id,
                    token: currentuser.token
                });

                if (patientHistory && patientHistory.data)
                    patientDetails.data["history"] = patientHistory.data;

                setPatient({ ...patientDetails.data });
            }




        }

    }

    const getTimeString = (datetime) => {
        if (!datetime)
            return "";

        let cdate = new Date(datetime);
        return cdate.toTimeString().substring(0, 5);
    }

    const navigateToAppointment = () => {
        props.navigation.navigate("Appointment");
    }
    const openFile = (file) => {
        if (file) {
            if (Linking.canOpenURL(file)) {
                Linking.openURL(file);
            }

        }
    }


    useFocusEffect(
        useCallback(() => {
            loadDefault();
        }, [])
    )

    return (
        <>
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.29)']}
                    style={{
                        position: 'absolute',
                        left: 20,
                        top: 0,
                        borderRadius: 615,
                        width: 615,
                        height: 615,
                    }}
                />
                <LinearGradient
                    colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.29)']}
                    style={{
                        position: 'absolute',
                        left: -200,
                        top: 0,
                        borderRadius: 815,
                        width: 815,
                        height: 815
                    }}
                />
                <LinearGradient
                    colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.09)']}
                    style={{
                        position: 'absolute',
                        left: -100,
                        top: 0,
                        borderRadius: 415,
                        width: 415,
                        height: 415
                    }}
                />
                <TopHeaderV2 />
                <Text style={{
                    textAlign: "center",
                    color: "#242B42",
                    lineHeight: 28,
                    fontWeight: 700,
                    marginTop: 20
                }}>Profile</Text>
                <ScrollView contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                    {/* PROFILE */}
                    <View
                        style={{
                            width: "90%",
                            backgroundColor: "#F1F5FF",
                            borderRadius: 14,
                            display: "flex",
                            flexDirection: "row",
                            padding: 20,
                            minHeight: 180,
                        }}
                    >
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Avatar.Icon icon={'account'} size={80} />
                        </View>
                        <View style={{
                            marginLeft: 10,
                            flex: 1
                        }}>
                            <View>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text
                                        style={{
                                            color: "#1D1E25",
                                            fontSize: 14,
                                            fontWeight: 400
                                        }}
                                    >{patient["patientInfo"] && patient["patientInfo"].length && patient["patientInfo"][0]["name"] ? patient["patientInfo"][0]["name"] : ""}</Text>
                                    <Text style={{
                                        color: "#97CBB8",
                                        fontSize: 14,
                                        fontWeight: 400
                                    }}>{patient["patientInfo"] && patient["patientInfo"].length && (patient["patientInfo"][0]["isActive"] != null) ? (patient["patientInfo"][0]["isActive"] ? 'Active' : 'Inactive') : ""}</Text>

                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginVertical: 1
                                }}>
                                    <Avatar.Icon icon={'gender-male-female'} color='#7B7B7B' size={18} style={{ backgroundColor: "transparent" }} />
                                    <Text style={{
                                        color: "#7B7B7B",
                                        fontSize: 12,
                                        fontWeight: 400
                                    }}>
                                        {patient["patientInfo"] && patient["patientInfo"].length && patient["patientInfo"][0]["gender"] ? patient["patientInfo"][0]["gender"] : ""} | {patient["patientInfo"] && patient["patientInfo"].length && patient["patientInfo"][0]["age"] ? patient["patientInfo"][0]["age"] : ""} </Text>
                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginVertical: 1,
                                    alignItems: "center"
                                }}>
                                    <Avatar.Icon icon={'email'} color='#7B7B7B' size={18} style={{ backgroundColor: "transparent" }} />
                                    <Text style={{
                                        color: "#7B7B7B",
                                        fontSize: 12,
                                        fontWeight: 400
                                    }}>{patient["patientInfo"] && patient["patientInfo"].length && patient["patientInfo"][0]["email"] ? patient["patientInfo"][0]["email"] : ""}</Text>
                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginVertical: 1,
                                    alignItems: "center"
                                }}>
                                    <Avatar.Icon icon={'phone'} color='#7B7B7B' size={18} style={{ backgroundColor: "transparent" }} />
                                    <Text style={{
                                        color: "#7B7B7B",
                                        fontSize: 12,
                                        fontWeight: 400
                                    }}>{patient["patientInfo"] && patient["patientInfo"].length && patient["patientInfo"][0]["phone"] ? patient["patientInfo"][0]["phone"] : ""}</Text>
                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginVertical: 1,
                                    alignItems: "center"
                                }}>
                                    <Avatar.Icon icon={'map'} color='#7B7B7B' size={18} style={{ backgroundColor: "transparent" }} />
                                    <Text style={{
                                        color: "#7B7B7B",
                                        fontSize: 12,
                                        fontWeight: 400
                                    }}>{patient["patientInfo"] && patient["patientInfo"].length && patient["patientInfo"][0]["address"] ? patient["patientInfo"][0]["address"] : ""}</Text>
                                </View>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginVertical: 1,
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        color: "#7B7B7B",
                                        fontSize: 12,
                                        fontWeight: 400
                                    }}>MRN: {patient["patientInfo"] && patient["patientInfo"].length && patient["patientInfo"][0]["mrn"] ? patient["patientInfo"][0]["mrn"] : ""} | SSN:</Text>
                                </View>
                            </View>


                        </View>
                    </View>

                    {/* LAST DIAGNOSIS */}
                    {
                        patient["patientDiagnosisDetails"] && patient["patientDiagnosisDetails"].length ?
                            <View style={{
                                // backgroundColor: "#F1F5FF",
                                backgroundColor: "#FFF",
                                borderRadius: 10,
                                width: "90%",
                                marginTop: 20,
                                padding: 10
                            }}>
                                <View
                                    style={{
                                        width: "1",
                                        borderWidth: 1,
                                        borderColor: "#2F80ED",
                                        position: "absolute",
                                        left: 0,
                                        top: 5,
                                        bottom: 5
                                    }}
                                >
                                </View>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    maxWidth: "90%"
                                }}>
                                    <View>
                                        <Avatar.Icon icon={'information'} size={30} color='#2F80ED' style={{ backgroundColor: "transparent" }} />
                                    </View>
                                    <View>
                                        <Text style={{
                                            color: "#7B7B7B",
                                            fontSize: 10,
                                            fontWeight: 500,
                                            lineHeight: 16

                                        }}>
                                            Diagnosis Last Updated Diagnosis : {patient["patientDiagnosisDetails"][0]["diagnosisDate"] ? patient["patientDiagnosisDetails"][0]["diagnosisDate"].substring(0, 10) : ""}
                                        </Text>
                                        <Text style={{
                                            color: "#7B7B7B",
                                            fontSize: 10,
                                            fontWeight: 500,
                                            lineHeight: 16
                                        }}>
                                            {/* Code : A155 */}
                                        </Text>
                                        <Text style={{
                                            color: "#7B7B7B",
                                            fontSize: 10,
                                            fontWeight: 500,
                                            lineHeight: 16

                                        }}>
                                            Description : {patient["patientDiagnosisDetails"][0]["description"] ? patient["patientDiagnosisDetails"][0]["description"] : ""}
                                        </Text>

                                    </View>

                                </View>
                            </View>
                            : <></>
                    }


                    {/* APPOINTMENTS */}
                    {
                        patient["upcomingAppointmentDetails"] && patient["upcomingAppointmentDetails"].length ?
                            <View>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "90%",
                                    marginTop: 20
                                }}>

                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        flex: 1,
                                    }}>
                                        <View>
                                            <Image source={require("./../assets/appointment-icon.png")} width={30} />
                                        </View>
                                        <View style={{
                                            padding: 5
                                        }}>
                                            <Text style={{
                                                color: "#1D1E25",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                lineHeight: 18
                                            }}>Appointment </Text>

                                            <Text style={{
                                                color: "#5B5A5A",
                                                fontSize: 12,
                                                fontWeight: 400,
                                                lineHeight: 22
                                            }}>{patient["upcomingAppointmentDetails"][0]["upcomingAppointment"] ? patient["upcomingAppointmentDetails"][0]["upcomingAppointment"].substring(0, 10) : ''}</Text>
                                            <Text style={{
                                                color: "#5B5A5A",
                                                fontSize: 12,
                                                fontWeight: 400,
                                                lineHeight: 22
                                            }}> {getTimeString(patient["upcomingAppointmentDetails"][0]["upcomingAppointment"])} </Text>
                                        </View>


                                    </View>
                                    <View>
                                        <Text style={{
                                            color: "#5E8DF7",
                                            fontSize: 13,
                                            fontWeight: 400
                                        }}
                                            onPress={navigateToAppointment}
                                        >see all</Text>
                                    </View>
                                </View>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: 40
                                }}>
                                    <View>
                                        {/* <Avatar.Icon icon={'account'} size={40} /> */}
                                        <Avatar.Image source={{ uri: patient["upcomingAppointmentDetails"][0]["staffImageUrl"] }} size={40} />
                                    </View>
                                    <View style={{
                                        marginHorizontal: 5
                                    }}>
                                        <Text style={{
                                            color: "#1D1E25",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            lineHeight: 20
                                        }}>{patient["upcomingAppointmentDetails"][0]["upcomingAppointmentStaff"]}</Text>
                                        <Text style={{
                                            color: "#5B5A5A", fontSize: 14,
                                            fontWeight: 400,
                                            lineHeight: 22
                                        }}>{patient["upcomingAppointmentDetails"][0]["speciality"] ? patient["upcomingAppointmentDetails"][0]["speciality"] : ""}</Text>
                                    </View>
                                </View>
                            </View> : patient["lastAppointmentDetails"] && patient["lastAppointmentDetails"].length ?
                                <View>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "90%",
                                        marginTop: 20
                                    }}>

                                        <View style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                        }}>
                                            <View>
                                                <Image source={require("./../assets/appointment-icon.png")} width={30} />
                                            </View>
                                            <View style={{
                                                padding: 5
                                            }}>
                                                <Text style={{
                                                    color: "#1D1E25",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    lineHeight: 18
                                                }}>Appointment </Text>

                                                <Text style={{
                                                    color: "#5B5A5A",
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                    lineHeight: 22
                                                }}>{patient["lastAppointmentDetails"][0]["upcomingAppointment"] ? patient["lastAppointmentDetails"][0]["lastAppointment"].substring(0, 10) : ''}</Text>
                                                <Text style={{
                                                    color: "#5B5A5A",
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                    lineHeight: 22
                                                }}> {getTimeString(patient["lastAppointmentDetails"][0]["lastAppointment"])} </Text>
                                            </View>


                                        </View>
                                        <View>
                                            <Text style={{
                                                color: "#5E8DF7",
                                                fontSize: 13,
                                                fontWeight: 400
                                            }}
                                                onPress={navigateToAppointment}
                                            >see all</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginLeft: 40
                                    }}>
                                        <View>
                                            {/* <Avatar.Icon icon={'account'} size={40} /> */}
                                            <Image source={{ uri: patient["lastAppointmentDetails"][0]["staffImageUrl"] }} width={40} />
                                        </View>
                                        <View style={{
                                            marginHorizontal: 5
                                        }}>
                                            <Text style={{
                                                color: "#1D1E25",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                lineHeight: 20
                                            }}>{patient["lastAppointmentDetails"][0]["lastAppointmentStaff"]}</Text>
                                            <Text style={{
                                                color: "#5B5A5A", fontSize: 14,
                                                fontWeight: 400,
                                                lineHeight: 22
                                            }}>{patient["lastAppointmentDetails"][0]["speciality"] ? patient["lastAppointmentDetails"][0]["speciality"] : ""}</Text>
                                        </View>
                                    </View>
                                </View> : <></>

                    }


                    {/* VITALS */}
                    <View style={{
                        width: "90%"
                    }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 30
                        }}>
                            <Text style={{
                                color: "#1D1E25",
                                fontSize: 14,
                                fontWeight: 700,
                                lineHeight: 18
                            }}>VITAL</Text>
                            <Text style={{
                                color: "#7B7B7B",
                                fontSize: 10,
                                fontWeight: 500,
                                lineHeight: 16
                            }}>Last Updated Diagnosis : {patient["patientVitals"] ? patient["patientVitals"][0] ? patient["patientVitals"][0]["vitalDate"] ? patient["patientVitals"][0]["vitalDate"].substring(0, 10) : "" : "" : ""}</Text>
                        </View>
                    </View>

                    <ScrollView horizontal={true} contentContainerStyle={{
                        marginTop: 20
                    }}>

                        {/* <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            padding: 5,
                            marginVertical: 15
                        }}> */}
                        <View style={{
                            width: 80,
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1
                        }}>
                            <View style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                backgroundColor: "#f0f1fe",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>

                                <Image source={require("./../assets/heartbeat.png")} width={40} />
                            </View>
                            <Text
                                numberOfLines={2}
                                style={{
                                    color: "#7B7B7B",
                                    fontSize: 10,
                                    fontWeight: 500,
                                    lineHeight: 12,
                                    marginTop: 10
                                }}>Heart Beat</Text>
                            <Text style={{
                                color: "#7B7B7B",
                                fontSize: 10,
                                fontWeight: 600,
                                lineHeight: 12
                            }}>
                                {patient["patientVitals"] ? patient["patientVitals"][0] ? patient["patientVitals"][0]["heartRate"] ? patient["patientVitals"][0]["heartRate"] + "bpm" : "" : "" : ""}
                            </Text>

                        </View>
                        <View style={{
                            width: 120,
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1
                        }}>
                            <View style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                backgroundColor: "#f0f1fe",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Image source={require("./../assets/bp.png")} width={40} />
                            </View>
                            <Text
                                numberOfLines={2}
                                style={{
                                    color: "#7B7B7B",
                                    fontSize: 10,
                                    fontWeight: 500,
                                    lineHeight: 12,
                                    marginTop: 10,
                                }}>Blood Pressure (S/D)</Text>
                            <Text style={{
                                color: "#7B7B7B",
                                fontSize: 10,
                                fontWeight: 600,
                                lineHeight: 12
                            }}>
                                {patient["patientVitals"] ? patient["patientVitals"][0] ? patient["patientVitals"][0]["bpSystolic"] ? patient["patientVitals"][0]["bpSystolic"] : "" : "" : ""}/
                                {patient["patientVitals"] ? patient["patientVitals"][0] ? patient["patientVitals"][0]["bpDiastolic"] ? patient["patientVitals"][0]["bpDiastolic"] : "" : "" : ""}
                            </Text>

                        </View>
                        <View style={{
                            width: 80,
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1
                        }}>
                            <View style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                backgroundColor: "#f0f1fe",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Image source={require("./../assets/bmi.png")} width={40} />
                            </View>
                            <Text
                                numberOfLines={2}
                                style={{
                                    color: "#7B7B7B",
                                    fontSize: 10,
                                    fontWeight: 500,
                                    lineHeight: 12,
                                    marginTop: 10
                                }}>BMI</Text>
                            <Text style={{
                                color: "#7B7B7B",
                                fontSize: 10,
                                fontWeight: 600,
                                lineHeight: 12
                            }}>
                                {patient["patientVitals"] ? patient["patientVitals"][0] ? patient["patientVitals"][0]["bmi"] ? patient["patientVitals"][0]["bmi"] : "" : "" : ""}/
                            </Text>
                        </View>
                        <View style={{
                            width: 80,
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1
                        }}>
                            <View style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                backgroundColor: "#f0f1fe",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>

                                <Image source={require("./../assets/thermo.png")} width={40} />
                            </View>


                            <Text
                                numberOfLines={2}
                                style={{
                                    color: "#7B7B7B",
                                    fontSize: 10,
                                    fontWeight: 500,
                                    lineHeight: 12,
                                    marginTop: 10
                                }}>TEMPERATURE</Text>
                            <Text style={{
                                color: "#7B7B7B",
                                fontSize: 10,
                                fontWeight: 600,
                                lineHeight: 12
                            }}>
                                {patient["patientVitals"] ? patient["patientVitals"][0] ? patient["patientVitals"][0]["temperature"] ? patient["patientVitals"][0]["temperature"] : "" : "" : ""}
                            </Text>

                        </View>

                        {/* </View> */}

                    </ScrollView>

                    {/* CURRENT OVERVIEW */}
                    <View style={{
                        width: "90%",
                        justifyContent: "flex-start",
                        marginTop: 30
                    }}>
                        <Text style={{
                            color: "#1D1E25",
                            fontSize: 14,
                            fontWeight: 700,
                            lineHeight: 18
                        }}>Current Overview</Text>


                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={{
                                padding: 10
                            }}
                        >
                            <View style={{
                                flex: 1,
                                width: 80
                            }}
                                onTouchEnd={() => setSelectedTab(1)}
                            >
                                <Text style={{
                                    color: selectedTab == 1 ? "#5E8DF7" : "#7B7B7B",
                                    fontSize: selectedTab == 1 ? 12 : 10,
                                    fontWeight: 500,
                                    lineHeight: 16
                                }}>Immunizstion</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                width: 80
                            }}
                                onTouchEnd={() => setSelectedTab(2)}
                            >
                                <Text style={{
                                    color: selectedTab == 2 ? "#5E8DF7" : "#7B7B7B",
                                    fontSize: selectedTab == 2 ? 12 : 10,
                                    fontWeight: 500,
                                    lineHeight: 16
                                }}>Medication</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                width: 80
                            }}
                                onTouchEnd={() => setSelectedTab(3)}
                            >
                                <Text style={{
                                    color: selectedTab == 3 ? "#5E8DF7" : "#7B7B7B",
                                    fontSize: selectedTab == 4 ? 12 : 10,
                                    fontWeight: 500,
                                    lineHeight: 16
                                }}>Lab Order</Text>
                            </View>


                        </ScrollView>

                        {/* IMMUNIZATION */}
                        {
                            selectedTab == 1 && <View>
                                {
                                    patient["patientImmunization"] &&
                                    patient["patientImmunization"].map((item, ind) => (
                                        <View key={ind} style={{
                                            borderRadius: 14,
                                            backgroundColor: "#F1F5FF",
                                            marginVertical: 10,
                                            padding: 10
                                        }}>
                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Administered Date : {item["administeredDate"] ? item["administeredDate"].substring(0, 10) : ""}
                                            </Text>
                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Immunization : {item["immunization"] ? item["immunization"] : ""}
                                            </Text>

                                        </View>
                                    ))
                                }
                            </View>
                        }

                        {/* MEDICATION */}
                        {
                            selectedTab == 2 && <View>
                                {
                                    patient["patientMedicationModel"] &&
                                    patient["patientMedicationModel"].map((item, ind) => (
                                        <View key={ind} style={{
                                            borderRadius: 14,
                                            backgroundColor: "#F1F5FF",
                                            marginVertical: 10,
                                            padding: 10
                                        }}>
                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Medicine : {item["medicine"] ? item["medicine"] : ""}
                                            </Text>
                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Strength : {item["strength"] ? item["strength"] : ""}
                                            </Text>
                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Quantity : {item["quantity"] ? item["quantity"] : ""}
                                            </Text>
                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Refill Count : {item["refillCount"] ? item["refillCount"] : ""}
                                            </Text>

                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Prescription Date : {item["prescriptionDate"] ? item["prescriptionDate"].substring(0, 10) : ""}
                                            </Text>
                                        </View>
                                    ))
                                }
                            </View>
                        }

                        {/* LAB ORDER */}
                        {
                            selectedTab == 2 && <View>
                                {
                                    patient["labOrder"] && patient["labOrder"].length &&
                                    patient["labOrder"].map((item, ind) => (
                                        <View key={ind} style={{
                                            borderRadius: 14,
                                            backgroundColor: "#F1F5FF",
                                            marginVertical: 10,
                                            padding: 10
                                        }}>
                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Order Type : {item["orderType"] ? item["orderType"] : ""}
                                            </Text>
                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Is Completed : {item["isCompleted"] ? item["isCompleted"] : ""}
                                            </Text>
                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Lab Name : {item["labName"] ? item["labName"] : ""}
                                            </Text>
                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Document :
                                                <Text
                                                    onPress={() => openFile(item["documentUrl"])}
                                                >
                                                    {item["documentName"] ? item["documentName"] : ""}
                                                </Text>
                                            </Text>

                                            <Text style={{
                                                color: "#7B7B7B",
                                                fontSize: 10,
                                                fontWeight: 700,
                                                lineHeight: 16
                                            }}>
                                                Order Date : {item["orderDate"] ? item["orderDate"].substring(0, 10) : ""}
                                            </Text>
                                        </View>
                                    ))
                                }
                            </View>
                        }

                    </View>


                    {/* PATIENT HISTORY */}
                    <View style={{
                        width: "90%",
                        justifyContent: "flex-start",
                        marginTop: 30
                    }}>
                        <Text style={{
                            color: "#1D1E25",
                            fontSize: 14,
                            fontWeight: 700,
                            lineHeight: 18
                        }}>Patient History</Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                padding: 10
                            }}
                        >
                            <View style={{
                                marginRight: 30
                            }}>
                                <Text style={{
                                    color: selectedSubTab == 1 ? "#5E8DF7" : "#7B7B7B",
                                    fontSize: selectedSubTab == 1 ? 12 : 10,
                                    fontWeight: 700,
                                    lineHeight: 16,
                                }}
                                    onTouchEnd={() => setSelectedSubTab(1)}
                                >
                                    Allergies
                                </Text>
                            </View>

                            <View>
                                <Text style={{
                                    color: selectedSubTab == 2 ? "#5E8DF7" : "#7B7B7B",
                                    fontSize: selectedSubTab == 1 ? 12 : 10,
                                    fontWeight: 700,
                                    lineHeight: 16
                                }}
                                    onTouchEnd={() => setSelectedSubTab(2)}
                                >
                                    History
                                </Text>
                            </View>
                        </View>
                        <View>

                            {/* ALLERGIES */}
                            {
                                selectedSubTab == 1 ? <View>
                                    {
                                        patient["allergies"] && patient["allergies"].length ?
                                            patient["allergies"].map((item, ind) => (
                                                <View key={ind} style={{
                                                    borderRadius: 14,
                                                    backgroundColor: "#F1F5FF",
                                                    marginVertical: 10,
                                                    padding: 10
                                                }}>

                                                    <Text style={{
                                                        color: "#7B7B7B",
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        lineHeight: 16
                                                    }}>
                                                        Allergy Type : {item["allergyType"] ? item["allergyType"] : ""}
                                                    </Text>                                            <Text style={{
                                                        color: "#7B7B7B",
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        lineHeight: 16
                                                    }}>
                                                        Allergen : {item["allergen"] ? item["allergen"] : ""}
                                                    </Text>
                                                    <Text style={{
                                                        color: "#7B7B7B",
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        lineHeight: 16
                                                    }}>
                                                        note : {item["note"] ? item["note"] : ""}
                                                    </Text>
                                                    <Text style={{
                                                        color: "#7B7B7B",
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        lineHeight: 16
                                                    }}>
                                                        reaction : {item["reaction"] ? item["reaction"] : ""}
                                                    </Text>


                                                </View>
                                            )) : <></>
                                    }
                                </View> : <></>
                            }

                            {/* HISTORY */}

                            {
                                selectedSubTab == 2 ? <View>
                                    {
                                        patient["history"] && patient["history"].length ?
                                            patient["history"].map((item, ind) => (
                                                <View key={ind} style={{
                                                    borderRadius: 14,
                                                    backgroundColor: "#F1F5FF",
                                                    marginVertical: 10,
                                                    padding: 10
                                                }}>

                                                    <Text style={{
                                                        color: "#7B7B7B",
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        lineHeight: 16
                                                    }}>
                                                        Name : {item["firstName"] ? item["firstName"] : ""}  {item["lastName"] ? item["lastName"] : ""}
                                                    </Text>
                                                    <Text style={{
                                                        color: "#7B7B7B",
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        lineHeight: 16
                                                    }}>
                                                        Gender : {item["gender"] ? item["gender"] : ""}
                                                    </Text>
                                                    <Text style={{
                                                        color: "#7B7B7B",
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        lineHeight: 16
                                                    }}>
                                                        DOB : {item["dob"] ? item["dob"].substring(0, 10) : ""}
                                                    </Text>
                                                    <Text style={{
                                                        color: "#7B7B7B",
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        lineHeight: 16
                                                    }}>
                                                        Relationship Name : {item["relationShipName"] ? item["relationShipName"] : ""}
                                                    </Text>


                                                </View>
                                            )) : <></>
                                    }
                                </View>
                                    : <></>
                            }

                        </View>

                    </View>


                    <View style={{
                        width: "100%",
                        height: 100
                    }}>
                    </View>
                </ScrollView>
            </View >
        </>
    );
}

export default Profile;
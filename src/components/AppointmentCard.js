import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Modal, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import api from '../services/API';


const AppointmentCard = ({ appointment }) => {

    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', paddingTop: 10, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, minHeight: 100, maxHeight: 400, margin: 20, borderRadius: 10 };
    console.log("appointment card ", { appointment })
    const appointmentStartDate = new Date(appointment.startDateTime);
    const appointmentEndDate = new Date(appointment.endDateTime);

    const startVideoCall = async () => {

        const result = await api.getSessionToken({
            patientId: appointment.patientID,
            staffId: appointment.appointmentStaffs[0] ? appointment.appointmentStaffs[0].staffId : '',
            startTime: appointment.startDateTime,
            endTime: appointment.endDateTime
        });
        console.log("start video call result ", result.data);
        if (result) {
            navigation.navigate("video-call", result.data);
        }

    }

    return <>
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={{
                    color: "#242B42",
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: 16
                }}>Appointment Details</Text>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20
                }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#4F81FF", fontWeight: 500, fontSize: 14 }}>Speciality:</Text>
                        <Text style={{ color: "#9D9D9D", fontSize: 12, fontWeight: 500 }}>{appointment["departmentName"]}</Text>
                    </View>
                    <View style={{ flex: 1 }}>

                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#4F81FF", fontWeight: 500, fontSize: 14 }}>Provider:</Text>
                        <Text style={{ color: "#9D9D9D", fontSize: 12, fontWeight: 500 }}>{appointment["provider"]}</Text>
                    </View>

                </View>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20
                }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#4F81FF", fontWeight: 500, fontSize: 14 }}>Date:</Text>
                        <Text style={{ color: "#9D9D9D", fontSize: 12, fontWeight: 500 }}>{appointment["startDateTime"].substring(0, 10)}</Text>
                    </View>
                    <View style={{ flex: 1 }}>

                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#4F81FF", fontWeight: 500, fontSize: 14 }}>Time:</Text>
                        <Text style={{ color: "#9D9D9D", fontSize: 12, fontWeight: 500 }}>{appointmentStartDate.toTimeString().substring(0, 5)}</Text>
                    </View>
                </View>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20
                }}>
                    <View style={{ flex: 2 }}>
                        <Text style={{ color: "#4F81FF", fontWeight: 500, fontSize: 14 }}>Appointment Type:</Text>
                        <Text style={{ color: "#9D9D9D", fontSize: 12, fontWeight: 500 }}>{appointment["appointmentTypeName"]}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                    </View>
                </View>

            </Modal>

        </Portal>
        <View style={{ width: "100%", marginBottom: 10 }}>
            <View style={{ justifyContent: "flex-start", alignItems: "center", display: "flex", flexDirection: "row" }}>
                <Avatar.Icon icon={"clock-outline"} size={25} color={'#979CA7'} style={{ backgroundColor: "transparent" }} />
                <Text>
                    {appointmentStartDate.toDateString()}, {appointmentStartDate.toTimeString().substring(0, 5)} - {appointmentEndDate.toTimeString().substring(0, 5)}
                </Text>
            </View>
            <View style={{ backgroundColor: "#F1F5FF", borderRadius: 14, width: "100%", padding: 20, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{}} onTouchEnd={showModal}>
                    <Text style={{
                        fontSize: 13,
                        color: "#1D1E25",
                        fontWeight: 500
                    }}>{appointment.provider ? appointment.provider : ""}</Text>
                    <Text style={{
                        fontSize: 13,
                        color: "#A4A8B2",
                        fontWeight: 400
                    }}>{appointment.departmentName ? appointment.departmentName : ""}</Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Avatar.Icon onTouchEnd={startVideoCall} icon={'video'} color={'#FFF'} size={26} style={{ backgroundColor: "#48bd69" }} />
                </View>
            </View>
        </View></>;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AppointmentCard;
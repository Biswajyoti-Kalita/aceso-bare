import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../services/API';


const AppointmentCardV2 = ({ appointment, isPrevious = false }) => {

    const navigation = useNavigation();

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

    return <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <View style={{ width: 10, backgroundColor: "#5E8DF7", marginTop: 10, marginBottom: 2, borderTopStartRadius: 5, borderTopEndRadius: 5, borderBottomLeftRadius: 5, borderBottomEndRadius: 5 }}></View>
        <View style={{ backgroundColor: "#F1F5FF", borderRadius: 14, width: "90%", marginBottom: 5, marginTop: 10, }}>
            <View style={{ justifyContent: "flex-start", alignItems: "center", display: "flex", flexDirection: "row", padding: 10 }}>
                <Avatar.Icon icon={"clock-outline"} size={25} color={'#979CA7'} style={{ backgroundColor: "transparent" }} />
                <Text>
                    {appointmentStartDate.toDateString()}, {appointmentStartDate.toTimeString().substring(0, 5)} - {appointmentEndDate.toTimeString().substring(0, 5)}
                </Text>
            </View>
            <View style={{ width: "100%", paddingLeft: 10, paddingRight: 10, paddingBottom: 10, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ display: "flex", flexDirection: "row", paddingLeft: 10, alignItems: "center" }}>
                    <Avatar.Icon icon={'account'} size={55} color='#666' style={{ backgroundColor: "lightgray" }} />
                    <View style={{ marginLeft: 10 }}>
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
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <Avatar.Icon icon={'star'} size={20} color='#E9AF19' style={{ backgroundColor: "transparent" }} />
                            <Text style={{ lineHeight: 20, color: '#A4A8B2' }}>
                                {'4.5'}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    {
                        !isPrevious && <Avatar.Icon onTouchEnd={startVideoCall} icon={'video'} color={'#FFF'} size={26} style={{ backgroundColor: "#48bd69" }} />

                    }
                </View>
            </View>
        </View>
    </View>
        ;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AppointmentCardV2;
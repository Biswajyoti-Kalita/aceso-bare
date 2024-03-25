import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import css from '../common/css';
import TopHeader from './TopHeader';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomMenu from './CustomMenu';
import { Modal, Portal } from 'react-native-paper';
import StripePayment from './StripePayment';
import api from '../services/API';

const Items = ({ primaryText, secondaryText }) => {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 5
            }}>
            <View style={{ width: "50%" }}>
                <Text style={{
                    color: "#242B42",
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 28,
                    textAlign: "left"
                }}>
                    {primaryText}
                </Text>

            </View>
            <View style={{ width: "50%" }}>
                <Text style={{
                    color: "#606060",
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 28
                }}>{secondaryText}</Text>
            </View>
        </View>)
}

const ConfirmAppointment = (props) => {
    const [details, setDetails] = useState({});
    const [visible, setVisible] = useState(false);
    const [publishableKey, setPublishableKey] = useState("pk_test_51JXO8sSAgQwqbqdwlECMBapaO6czUbAJQcIvbiXcH448A3D4WYNmRbXXxkujr1wFjQEASl5Kg Gp8RlrI9PxbB4fX00GUEjsMu2");
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const hideModalSuccess = () => {
        setVisible(true);
        props.navigation.navigate("DrawerNav");
    }
    const useStripePayment = () => {
        console.log("use stripe payment");
        //props.navigation.navigate("stripe-payment");
        showModal();
    }

    getAppointmentFee = async () => {

        api.getPrepaidFee().then((res) => {

            if (res && res.data && res.data.length) {
                setDetails((d) => { return { ...d, fee: res.data[0]['ratePerUnit'] } })
            }

        })

    }
    useEffect(() => {
        console.log(props.route.params)
        let temp = {};
        if (props.route.params) {
            if (props.route.params.doctorDetails) {
                if (props.route.params.doctorDetails.department)
                    temp["department"] = props.route.params.doctorDetails.department;


                temp["name"] = props.route.params.doctorDetails.firstName + " " + (props.route.params.doctorDetails.middleName ? props.route.params.doctorDetails.middleName : '') + " " + (props.route.params.doctorDetails.lastName ? props.route.params.doctorDetails.lastName : '')


                if (props.route.params.visitType)
                    temp["visitType"] = props.route.params.visitType

                if (props.route.params.selectedAppointmentDateTime) {
                    let selectedAppointmentDateTime = props.route.params.selectedAppointmentDateTime
                    let startDateNew = null, endDateNew = null;
                    if (selectedAppointmentDateTime.length == 2) {
                        selectedAppointmentDateTime = selectedAppointmentDateTime.sort();
                        startDateNew = new Date(selectedAppointmentDateTime[0]);
                        endDateNew = new Date(selectedAppointmentDateTime[1]);
                    } else if (selectedAppointmentDateTime.length == 1) {
                        startDateNew = new Date(selectedAppointmentDateTime[0]);
                        endDateNew = new Date(selectedAppointmentDateTime[0]);
                    }
                    temp["appointmentDate"] = startDateNew.toDateString();
                    let startTime = startDateNew.toTimeString().split(" ")[0].split(":");

                    temp["startTime"] = startTime[0] + ":" + startTime[1];

                    endDateNew.setMinutes(endDateNew.getMinutes() + 30);
                    let endTime = endDateNew.toTimeString().split(" ")[0].split(":");

                    temp["endTime"] = endTime[0] + ":" + endTime[1];

                    temp["time"] = temp["startTime"] + " to " + temp["endTime"];


                }


            }
        }
        setDetails({ ...temp });

        getAppointmentFee();

        //publishableKey

    }, [])

    return (
        <View style={[css.container, { justifyContent: "flex-start", alignItems: "center", }]}>
            <TopHeader showBackButton={true} />
            <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.2)']}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 100,
                    borderRadius: 615,
                    width: 615,
                    height: 615
                }}
            />
            <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.1)']}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    borderRadius: 415,
                    width: 415,
                    height: 415
                }}
            />
            <LinearGradient
                colors={['rgba(94, 141, 247, 0.3)', 'rgba(255,255,255,1)']}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: -200,
                    borderRadius: 615,
                    width: 515,
                    height: 515,
                }}
            />
            <ScrollView style={{ width: "100%" }}>
                <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    </View>
                    <View style={{ flex: 2, flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                        <Text style={{
                            color: '#242B42',
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 700,
                            lineHeight: 28
                        }}
                        >Appointment Details</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row", alignItems: "center", padding: 10 }}>
                        {
                            props.route.name == "confirm-appointment-auth" && <CustomMenu />
                        }
                    </View>
                </View>
                <View style={{
                    padding: 20,
                    paddingLeft: 30
                }}>
                    <Items primaryText={'Speciality :'} secondaryText={details["department"] ? details["department"] : ""} />
                    <Items primaryText={'Provider :'} secondaryText={details["name"] ? details["name"] : ""} />
                    <Items primaryText={'Appointment type :'} secondaryText={details["visitType"] ? details["visitType"] : ""} />
                    <Items primaryText={'Date'} secondaryText={details["appointmentDate"] ? details["appointmentDate"] : ""} />
                    <Items primaryText={'Time'} secondaryText={details["time"] ? details["time"] : ""} />
                    <Items primaryText={'Fees'} secondaryText={details["fee"] ? details["fee"] + '$' : ""} />
                </View>

                <View>
                    <Text style={{
                        color: "#242B42",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: 28
                    }}>
                        Payment
                    </Text>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 30,
                        marginBottom: 30,
                    }}>
                        <View style={{
                            backgroundColor: "#FFF",
                            marginBottom: 100
                        }}>
                            <Image onTouchEnd={useStripePayment} source={require("./../assets/paypal.png")} style={{ width: 150, height: 150 }} />
                        </View>

                        <Text style={{
                            marginTop: 50,
                            color: "#BBB",
                            fontSize: 15,
                            fontWeight: 400,
                            lineHeight: 28
                        }}>
                            <Image source={require("./../assets/scheild.png")} style={{ width: 15, height: 15 }} />
                            {'  '}
                            100% Secure Payment
                        </Text>

                        <View style={{
                            backgroundColor: "#4F81FF",
                            width: "90%",
                            padding: 15,
                            borderRadius: 25,
                            marginTop: 20
                        }}
                            onTouchEnd={useStripePayment}
                        >
                            <Text style={{
                                textAlign: "center",
                                color: "#FFF"
                            }}>Confirm</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{
                    padding: 0,
                    height: 200,
                    margin: 20,
                    backgroundColor: "F8F8FB"
                }}>
                    <StripePayment hideModalSuccess={hideModalSuccess} key={publishableKey} publishableKey={publishableKey} appointmentTypeId={props.route.params.visitTypeId} appointmentDateTime={props.route.params.selectedAppointmentDateTime} staffId={props.route.params.staffID} fee={details['fee']} />
                </Modal>
            </Portal>
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

export default ConfirmAppointment;
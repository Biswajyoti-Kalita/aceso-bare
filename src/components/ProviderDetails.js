import { ScrollView, StyleSheet, Text, View } from 'react-native';
import css from '../common/css';
import TopHeader from './TopHeader';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Avatar, Button, Menu } from 'react-native-paper';
import CustomMenu from './CustomMenu';
import { useEffect, useState } from 'react';
import CustomCalendar from './CustomCalendar';
import DoctorAvailabilityTimeSlots from './DoctorAvailabilityTimeSlots';
import stripe from '@stripe/stripe-react-native';
import api from '../services/API';
import storage from '../services/StorageService';

const DoctorInfoSmallCard = ({ icon, primaryText, secondaryText }) => {
    return <View style={{
        alignItems: "center",
        marginHorizontal: 10
    }}>
        <Avatar.Icon icon={icon} style={{ backgroundColor: "#5E8DF7" }} color='#FFF' size={60} />
        <Text>{primaryText}</Text>
        <Text>{secondaryText}</Text>
    </View>

}




const ProviderDetails = (props) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [doctorDetails, setDoctorDetails] = useState({});
    const [selectedAppointmentDateTime, setSelectedAppointmentDateTime] = useState([]);
    const [showLoaderAppointmentRequest, setShowLoaderAppointmentRequest] = useState(false);


    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const appointmentDateTimeSelected = (datetime) => {
        let temp = selectedAppointmentDateTime;


        console.log("current temp ", temp);

        if (temp && temp.length) {

            if (temp.length == 2) {

                // if selected datetime matches with any one
                let tempDate1 = new Date(temp[0]);
                let tempDate2 = new Date(temp[1]);

                console.log("checking if matches with temp 0 or 1 ", { tempDate1, tempDate2, datetime })

                if (tempDate1.toISOString() == datetime.toISOString() || tempDate2.toISOString() == datetime.toISOString()) {

                    if (tempDate1.toISOString() == datetime.toISOString()) {
                        console.log("matched with temp 0");
                        temp = [temp[1]];
                    }

                    if (tempDate2.toISOString() == datetime.toISOString()) {
                        console.log("matched with temp 1");
                        temp = [temp[0]];
                    }

                    setSelectedAppointmentDateTime([...temp]);
                    return;
                }

                temp = [datetime];
            } else if (temp.length == 1) {


                // if existing one item is selected
                let tempDate1 = new Date(temp[0]);

                if (tempDate1.toISOString() == datetime.toISOString()) {
                    setSelectedAppointmentDateTime([...[]]);
                    return;
                }



                let checkdateNext = new Date(datetime);
                let checkdatePrev = new Date(datetime);

                checkdateNext.setMinutes(checkdateNext.getMinutes() + 30);
                checkdatePrev.setMinutes(checkdatePrev.getMinutes() - 30);

                console.log({ checkdateNext, checkdatePrev });
                if (new Date(temp[0]).toISOString() == checkdateNext.toISOString() || new Date(temp[0]).toISOString() == checkdatePrev.toISOString()) {
                    console.log("matched")
                    temp.push(datetime);
                } else {
                    temp = [datetime];
                }
                console.log("new temp ", temp);
            }
        } else {
            temp = [datetime];
        }
        // setSelectedAppointmentDateTime(datetime);

        console.log("new temp ", temp);
        setSelectedAppointmentDateTime([...temp]);
    }

    const dateSelected = (date) => {
        setSelectedDate(date);
        setSelectedAppointmentDateTime([]);
    }

    const makePaymentAndBook = async () => {
        console.log("selectedAppointmentDateTime", selectedAppointmentDateTime);
        if (selectedAppointmentDateTime && selectedAppointmentDateTime.length) {

            setShowLoaderAppointmentRequest(true);
            if (props.route.name == "provider-details") {

                const hasSaveAppointmentRequest = await storage.getKeyData("appointmentRequest");
                if (hasSaveAppointmentRequest) {
                    await storage.removeItem("appointmentRequest");
                }
                await storage.save("appointmentRequest", {
                    staffID: props.route.params.selectedDoctor,
                    visitTypeId: props.route.params.id,
                    visitType: props.route.params.value,
                    doctorDetails,
                    selectedAppointmentDateTime
                }, 1000 * 60 * 60 * 24);
                setShowLoaderAppointmentRequest(false);

                props.navigation.navigate("signup");

            } else {
                setShowLoaderAppointmentRequest(false);
                props.navigation.navigate("confirm-appointment-auth", {
                    staffID: props.route.params.selectedDoctor,
                    visitTypeId: props.route.params.id,
                    visitType: props.route.params.value,
                    doctorDetails,
                    selectedAppointmentDateTime
                });
            }
        }
    }

    const makePayment = () => {
        console.log("make payment");

        props.navigation.navigate("appointment-payment");
        // stripe.initStripe({
        //     publishableKey: 'pk_test_51JXO8sSAgQwqbqdwlECMBapaO6czUbAJQcIvbiXcH448A3D4WYNmRbXXxkujr1wFjQEASl5Kg Gp8RlrI9PxbB4fX00GUEjsMu2',
        // });
        // stripe.confirmPaymentSheetPayment()
        // stripe.init({
        //     publishableKey: 'pk_test_51JXO8sSAgQwqbqdwlECMBapaO6czUbAJQcIvbiXcH448A3D4WYNmRbXXxkujr1wFjQEASl5Kg Gp8RlrI9PxbB4fX00GUEjsMu2',
        // });
    }

    const loadDefault = async () => {
        console.log("\n\nloaddefault ", props.route.params.selectedDoctor);
        const doctorDetailsData = await api.getDoctorDetails({
            id: props.route.params.selectedDoctor
        });
        let details = {};

        if (doctorDetailsData && doctorDetailsData.data) {
            details = { ...doctorDetailsData.data };
        }

        const departmentsData = await api.getDepartment();
        if (departmentsData && departmentsData.data) {
            for (let i = 0; i < departmentsData.data.length; i++) {
                if (doctorDetailsData.data.departmentID == departmentsData.data[i].id) {
                    details = {
                        ...details,
                        department: departmentsData.data[i].departmentName
                    }
                }
            }
        }

        setDoctorDetails({ ...details })
        dateSelected(new Date());
    }

    useEffect(() => {

        loadDefault();

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
                            fontSize: 20,
                            fontWeight: 700,
                            lineHeight: 28
                        }}
                        >Find Provider</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row", alignItems: "center", padding: 10 }}>
                        {
                            props.route.name == "provider-details-auth" && <CustomMenu />
                        }
                    </View>
                </View>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15
                }}>
                    <Avatar.Icon icon={'account'} size={90} />
                </View>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingVertical: 15
                }}>
                    <DoctorInfoSmallCard icon={'heart'} primaryText={'15+'} secondaryText={'Patients'} />
                    <DoctorInfoSmallCard icon={'crown'} primaryText={'15+'} secondaryText={'Experience'} />
                    <DoctorInfoSmallCard icon={'star'} primaryText={'4.5'} secondaryText={'Rating'} />
                </View>
                <View style={{
                    backgroundColor: "#FFF",
                    minHeight: 300,
                    borderRadius: 30,
                    padding: 10
                }}>
                    <Text style={{
                        color: "#242B42",
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: 28,
                        textAlign: "center"
                    }}>Dr. {doctorDetails && doctorDetails.firstName ? doctorDetails.firstName : ''} {doctorDetails && doctorDetails.middleName ? doctorDetails.middleName : ''} {doctorDetails && doctorDetails.lastName ? doctorDetails.lastName : ''}</Text>
                    <Text style={{
                        color: "#A4A8B2",
                        textAlign: "center",
                        fontSize: 12,
                        fontWeight: 400
                    }}>
                        {doctorDetails && doctorDetails.department ? doctorDetails.department : ''}
                    </Text>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginVertical: 5
                    }}>
                        <MaterialCommunityIcon name='star' color={'gold'} size={30} />
                        <MaterialCommunityIcon name='star' color={'gold'} size={30} />
                        <MaterialCommunityIcon name='star' color={'gold'} size={30} />
                        <MaterialCommunityIcon name='star' color={'gold'} size={30} />
                        <MaterialCommunityIcon name='star-half' color={'gold'} size={30} />

                    </View>
                    <View style={{
                        padding: 10
                    }}>
                        <Text
                            style={{
                                color: "#1D1E25",
                                fontSize: 15,
                                fontWeight: 500
                            }}
                        >
                            About Doctor
                        </Text>
                        <Text style={{
                            color: "#7B7B7B",
                            textAlign: "justify",
                            fontSize: 12,
                            fontWeight: 400,
                            lineHeight: 20
                        }}>
                            {doctorDetails && doctorDetails.abouta ? doctorDetails.about : ''}
                        </Text>
                    </View>
                    {
                        doctorDetails && selectedDate && <CustomCalendar startDate={new Date()} endDate={endDate} selectedDate={selectedDate} dateSelected={dateSelected} />
                    }
                    {
                        doctorDetails && selectedDate && <DoctorAvailabilityTimeSlots key={selectedDate.toString()} staffID={doctorDetails['id']} selectedDate={selectedDate} selectedAppointmentDateTime={selectedAppointmentDateTime} appointmentDateTimeSelected={appointmentDateTimeSelected} />

                    }
                    {
                        showLoaderAppointmentRequest ?
                            <ActivityIndicator />
                            :
                            <View style={{
                                backgroundColor: "#4F81FF",
                                padding: 10,
                                borderRadius: 20
                            }}
                                onTouchEnd={makePaymentAndBook}
                            >
                                <Text style={{
                                    textAlign: "center",
                                    color: "#F8F8FB",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    lineHeight: 14
                                }}>
                                    Request Appointment
                                </Text>
                            </View>

                    }
                </View>
            </ScrollView>
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

export default ProviderDetails;
import { Image, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import css from '../common/css';
import { ActivityIndicator, Avatar, Button, Divider, Menu, Modal, PaperProvider, Portal, TextInput, TouchableRipple } from 'react-native-paper';
import { useEffect, useState } from 'react';
import MySnackbar from './MySnackbar';
import { useDispatch } from 'react-redux';
import { signinUser } from '../store/User';
import api from '../services/API';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import DoctorSearchCard from './DoctorSearchCard';
import DoctorFilterCard from './DoctorFilterCard ';
import TopHeader from './TopHeader';
import DoctorSpecialityCard from './DoctorSpecialityCard';
import DoctorAvailableCard from './DoctorAvailableCard';
import AppointmentModalItem from './AppointmentModalItem';
import { useNavigation } from '@react-navigation/native';



const FindDoctor = (props) => {

    const [doctors, setDoctors] = useState([]);
    const [message, setMessage] = useState("");
    const [showFilters, setshowFilters] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showBackButton, setShowBackButton] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(-1);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedGender, setSelectedGender] = useState(-1);
    const [availableDoctors, setAvailableDoctors] = useState([]);
    const [specialistDoctors, setSpecialistDoctors] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const navigation = useNavigation();

    // const appointmentTypes = [
    //     {
    //         image: require("./../assets/hospital.png"),
    //         primaryText: "Office Visit",
    //         secondaryText: "A general visit with your healthcare provider",
    //         value: "office_visit"
    //     }
    // ];


    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const dispatch = useDispatch();


    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);


    const selectDoctor = async (id) => {
        setSelectedDoctor(id);
        showModal();
    }

    const showProviderDetails = (id, value) => {
        console.log("showProviderDetails ", value, selectedDoctor);
        hideModal();
        if (props.route.name == "find-doctor-auth")
            navigation.navigate("provider-details-auth", {
                id,
                value,
                selectedDoctor
            });
        else
            navigation.navigate("provider-details", {
                id,
                value,
                selectedDoctor
            });
    }


    const find = async () => {
    }

    const moveToSignup = () => {
        props.navigation.navigate("signup");
        closeMenu();
    }

    const moveToSignin = () => {
        props.navigation.navigate("signin");
        closeMenu();
    }

    const getAvailableDoctors = async (obj) => {
        const result = await api.availableDoctors();
        if (result && result.data) {
            setAvailableDoctors([...result.data]);
        }
    }

    const getSpecialistDoctors = async (obj) => {
        const result = await api.findDoctor({});
        if (result && result.data) {
            setSpecialistDoctors([...result.data]);
        }
    }
    const findProvider = async (obj, firstTime = false) => {
        console.log("obj find provider ", obj);
        setLoading(true);
        setDoctors([...[]]);
        if (obj && Object.keys(obj).length)
            setshowFilters(false);
        let tempQuery = '';
        if (obj["locationID"]) {
            tempQuery += "&locationID=" + obj["locationID"];
            setSelectedLocation(obj["locationID"]);
        } else setSelectedLocation(-1);


        if (obj["departmentID"]) {
            tempQuery += "&departmentID=" + obj["departmentID"];
            setSelectedDepartment(obj["departmentID"]);
        } else setSelectedDepartment(-1);


        if (obj["gender"]) {
            tempQuery += "&gender=" + obj["gender"];
            setSelectedGender(obj["gender"]);
        } else setSelectedGender(-1);

        obj["query"] = tempQuery;

        const result = await api.findDoctor(obj);
        if (result && result.statusCode == 200) {
            if (result.appError)
                setMessage(result.appError);
            else {
                if (result.data)
                    setDoctors([...result.data])

            }
        } else {
            setMessage(result.message || "Something went wrong")
        }
        setLoading(false);

    }
    const loadDefault = async (firstTime = false) => {
        let obj = {};
        getAvailableDoctors();
        getSpecialistDoctors();

        const result = await api.getDepartment();
        if (result && result.statusCode == 200) {
            if (result.data) {
                setAllDepartments([...result.data])
            }
        }


        if (props.route && props.route.params && props.route.params.department) {
            setshowFilters(false);
            setShowBackButton(true);
            obj["departmentID"] = props.route.params.department.id;
            setSelectedDepartment(props.route.params.department.id);
        }

        findProvider(obj, firstTime);


        const appointmentTypesData = await api.getAppointmentTypes();
        if (appointmentTypesData && appointmentTypesData.data && appointmentTypesData.data.PatientPayerActivities) {

            let temp = [];

            appointmentTypesData.data.PatientPayerActivities?.map((item) => {

                temp.push({
                    image: '',
                    primaryText: item["value"],
                    secondaryText: "",
                    value: item["id"]
                })
            })

            setAppointmentTypes(temp);

        }
    }


    useEffect(() => {
        console.log("\n\n\nshowFilters ", showFilters, "\n\n\n");
    }, [showFilters])

    useEffect(() => {
        loadDefault(true);
    }, [])

    return (
        <View style={[css.container, { justifyContent: "flex-start", alignItems: "center", }]}>
            <TopHeader showBackButton={showBackButton} />
            <LinearGradient
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
            <LinearGradient
                colors={['rgba(94, 141, 247, 0.3)', 'rgba(255,255,255,1)']}
                style={{
                    position: 'absolute',
                    left: -200,
                    top: -120,
                    borderRadius: 615,
                    width: 615,
                    height: 615,
                }}
            />
            <View style={{ width: "100%", zIndex: 5, }}>
                <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Button onPress={openMenu}>
                                <MaterialCommunityIcon name={'dots-vertical'} size={25} color={'#858AAB'} />
                            </Button>}
                        >
                            <Menu.Item onPress={moveToSignin} title="Signin" />
                            {/* <Menu.Item onPress={moveToSignup} title="Signup" /> */}
                        </Menu>
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
                        <TouchableRipple onPress={() => setshowFilters(!showFilters)}>
                            {
                                showFilters ?
                                    <Avatar.Icon size={30} icon="close" color='#5E8DF7' style={{ backgroundColor: "#FFF" }} />
                                    :
                                    <Avatar.Icon size={30} icon="magnify" color='#5E8DF7' style={{ backgroundColor: "#FFF" }} />
                            }
                        </TouchableRipple>
                    </View>
                </View>
            </View>

            <ScrollView style={{ width: "100%", marginTop: 10 }}>
                {
                    showFilters && <DoctorFilterCard key={allDepartments.length} allDepartments={allDepartments} department={selectedDepartment} gender={selectedGender} location={selectedLocation} findProvider={findProvider} closeFilter={() => setshowFilters(false)} />
                }

                {
                    loading && <ActivityIndicator />
                }
                <View style={{ height: 10 }}></View>

                {
                    showFilters ?
                        <>
                            <View style={{
                                paddingLeft: 20
                            }}>
                                <Text style={{
                                    color: "#1D1E25",
                                    fontSize: 18,
                                    fontWeight: 500,
                                    paddingLeft: 15
                                }}>Speciality</Text>
                                {
                                    !specialistDoctors || specialistDoctors.length === 0 ?
                                        <Text style={{
                                            color: "#1D1E25",
                                            fontSize: 12,
                                            fontWeight: 400,
                                            paddingLeft: 15
                                        }}>No result found</Text> : <></>
                                }
                                <ScrollView horizontal={true}>
                                    {
                                        specialistDoctors?.map((doctor, ind) => (
                                            <View
                                                key={ind}
                                                onTouchEnd={() => selectDoctor(doctor.staffID)}
                                            >
                                                <DoctorSpecialityCard
                                                    name={doctor.firstName + " " + (doctor.middleName ? doctor.middleName : '') + " " + doctor.lastName}
                                                    specialty={doctor.departmentName}
                                                    phone_number={doctor.phoneNumber}
                                                    pic={doctor.photoThumbnailPath}
                                                    rating={'4.5'}
                                                    doc_id={doctor.staffID}
                                                />

                                            </View>
                                        ))
                                    }

                                </ScrollView>

                            </View>
                            <View style={{
                                paddingLeft: 20,
                                marginTop: 20
                            }}>
                                <Text style={{
                                    color: "#1D1E25",
                                    fontSize: 18,
                                    fontWeight: 500,
                                    paddingLeft: 15
                                }}>Available Doctor</Text>
                                {
                                    !availableDoctors || availableDoctors.length === 0 ?
                                        <Text style={{
                                            color: "#1D1E25",
                                            fontSize: 12,
                                            fontWeight: 400,
                                            paddingLeft: 15
                                        }}>No result found</Text> : <></>
                                }

                                <ScrollView horizontal={true}>
                                    {
                                        availableDoctors?.map((doctor, ind) => (
                                            <View
                                                key={ind}
                                                onTouchEnd={() => selectDoctor(doctor.staffID)}
                                            >
                                                <DoctorAvailableCard
                                                    name={doctor.firstName + " " + (doctor.middleName ? doctor.middleName : '') + " " + doctor.lastName}
                                                    specialty={doctor.departmentName}
                                                    phone_number={doctor.phoneNumber}
                                                    pic={doctor.photoThumbnailPath}
                                                    rating={'4.5'}
                                                    doc_id={doctor.staffID}
                                                />

                                            </View>
                                        ))
                                    }

                                </ScrollView>

                            </View>
                        </> :
                        <>
                            <View>
                                {
                                    doctors?.map((doctor, ind) => (
                                        <View
                                            key={ind}
                                        >
                                            <DoctorSearchCard
                                                name={doctor.firstName + " " + doctor.middleName + " " + doctor.lastName}
                                                specialty={doctor.departmentName}
                                                phone_number={doctor.phoneNumber}
                                                pic={doctor.profileImage}
                                                rating={'4.5'}
                                                doc_id={doctor.staffID}
                                                selectDoctor={selectDoctor}
                                            />

                                        </View>
                                    ))
                                }
                                {
                                    !loading && doctors.length == 0 && <Text style={{ textAlign: "center" }}>No doctor available</Text>
                                }

                            </View>
                        </>
                }

                <View style={{ height: 150 }}></View>
            </ScrollView>
            {
                message && message.length ? <MySnackbar message={message} setMessage={setMessage} />
                    : <></>
            }
            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={{ padding: 20, backgroundColor: "#FFF", width: "90%", left: "5%" }}>
                    <View
                        style={{
                            maxHeight: 400
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "right"
                            }}
                            onPress={() => hideModal()}
                        >
                            <Avatar.Icon icon={'close'} size={30} color='#48BD69' style={{ backgroundColor: "transparent" }} />
                        </Text>
                        <Text style={{
                            color: "#242B42",
                            textAlign: "center",
                            fontSize: 15,
                            fontWeight: 500,
                            lineHeight: 25
                        }}>What type of Appointment do you need today?</Text>
                        <ScrollView>

                            {
                                appointmentTypes?.map((type, ind) => (
                                    <AppointmentModalItem key={ind} id={type.id} image={type.image} primaryText={type.primaryText} secondaryText={type.secondaryText} value={type.value} showProviderDetails={showProviderDetails} />
                                ))
                            }
                        </ScrollView>

                    </View>

                </Modal>
            </Portal>
        </View>
    );
}

export default FindDoctor;
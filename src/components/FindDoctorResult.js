import { Image, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import css from '../common/css';
import { ActivityIndicator, Avatar, Button, Divider, Menu, PaperProvider, TextInput, TouchableRipple } from 'react-native-paper';
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




const FindDoctorResult = (props) => {

    const [doctors, setDoctors] = useState([]);
    const [message, setMessage] = useState("");
    const [showFilters, setshowFilters] = useState(true);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

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

    const findProvider = async (obj) => {
        console.log("obj find provider ", obj);
        setLoading(true);
        setDoctors([...[]]);
        let tempQuery = '';
        if (obj["locationID"])
            tempQuery += "&locationID=" + obj["locationID"];

        if (obj["department"])
            tempQuery += "&department=" + obj["department"];

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
    const loadDefault = async () => {
        findProvider({});
    }


    useEffect(() => {
        console.log("showFilters ", showFilters);
    }, [showFilters])

    useEffect(() => {
        loadDefault();
    }, [])

    return (
        <View style={[css.container, { justifyContent: "flex-start", alignItems: "center", }]}>
            <TopHeader />
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
                        }} onPress={() => console.log("asdasdasd")}>Find Provider</Text>
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
                {
                    showFilters && <DoctorFilterCard findProvider={findProvider} closeFilter={() => setshowFilters(false)} />
                }
            </View>

            <ScrollView style={{ width: "100%", marginTop: 20 }}>
                {
                    loading && <ActivityIndicator />
                }
                {
                    doctors?.map((doctor, ind) => (
                        <View
                            key={ind}
                        >
                            <DoctorSearchCard
                                name={doctor.name}
                                specialty={doctor.locationName}
                                phone_number={doctor.phoneNumber}
                                pic={doctor.profileImage}
                                rating={'4.5'}
                                doc_id={doctor.staffID}
                            />

                        </View>
                    ))
                }
                <View style={{ height: 150 }}></View>
            </ScrollView>
            {
                message && message.length ? <MySnackbar message={message} setMessage={setMessage} />
                    : <></>
            }
        </View>
    );
}

export default FindDoctorResult;
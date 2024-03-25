import { Image, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import css from '../common/css';
import { Button, HelperText, Icon, Switch, TextInput, ToggleButton } from 'react-native-paper';
import { useEffect, useState } from 'react';
import MySnackbar from './MySnackbar';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import storage from '../services/StorageService';
import api from '../services/API';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/User';
import util from '../services/Util';
import TopHeader from './TopHeader';
import BSelect from './BSelect';

const Signup = (props) => {

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [date, setDate] = useState(new Date());
    const [masterdata, setMasterdata] = useState({
        masterGender: [],
        masterCountry: [],
        masterLocation: [],
        masterEthnicity: [],
        masterRace: [],
        masterRenderingProvider: [],
        masterPhoneType: [],
        staffs: [],
        masterPhonePreferences: [],
        masterPhoneType: []

    });
    const [obj, setObj] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        gender: 1,
        dob: null,
        email: "",
        ssn: null,
        proofId: null,
        proofValue: null,
        mrn: -1,
        race: null,
        secondaryRaceID: null,
        ethnicity: null,
        nationality: null,
        primaryProvider: null,
        renderingProviderID: 4,
        location: 7,
        locationID: 2,
        userName: "",
        isPortalRequired: true,
        emergencyContactRelationship: null,
        emergencyContactFirstName: null,
        emergencyContactLastName: null,
        emergencyContactPhone: null,
        photoThumbnailPath: null,
        photoPath: null,
        purposeOfVisit: null,
        note: null,
        tag: null,
        clientImg: null,
        icdid: null,
        phoneNumbers: [
            {
                id: null,
                phoneNumberTypeId: 173,
                phoneNumber: "",
                preferenceID: 251,
                otherPhoneNumberType: null,
                isDeleted: null,
                patientID: null,
            },
        ],
        password: "",
        isResetPassword: false,
        isPatientExternalAgency: false,
        id: null,
        PhotoBase64: null,
        fromMode: "mobile"
    }
    );
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState('checkbox-blank');

    const onButtonToggle = value => {
        setStatus(status === 'check' ? 'checkbox-blank' : 'check');
    };
    const signup = async () => {

        if (status != 'check') {
            setMessage("Please accept terms and conditions");
            return;
        }

        if (!obj["firstName"]) {
            setMessage("First name is required");
            return;
        }

        if (!obj["lastName"]) {
            setMessage("Last name is required");
            return;
        }

        if (!obj["gender"]) {
            setMessage("Gender is required");
            return;
        }

        if (!obj["dob"]) {
            setMessage("DOB is required");
            return;
        }

        if (!obj["phoneNumbers"]) {
            setMessage("Phone number is required");
            return;
        }
        if (!obj["email"]) {
            setMessage("Email is required");
            return;
        }

        if (!obj["locationID"]) {
            setMessage("location is required");
            return;
        }


        if (!obj["userName"]) {
            setMessage("User name is required");
            return;
        }



        if (!obj["nationality"]) {
            setMessage("Country is required");
            return;
        }



        // if (!obj["password"]) {
        //     setMessage("Password is required");
        //     return;
        // }

        setMessage("Signing up, please wait...");

        const result = await api.registerPatient(obj);

        console.log("\n\n\n", { obj });

        console.log(JSON.stringify(obj));
        if (result && result.data && result.data.id) {
            dispatch(registerUser({ patientId: result.data.id, email: obj.email }));
            props.navigation.navigate("verify");
        } else if (result.message) {
            setMessage(result.message);
        } else {
            setMessage("Something went wrong.")
        }


    }
    // useEffect(() => {
    //     console.log(obj);
    // }, [obj]);

    const loadDefault = async () => {
        const saveMasterData = await storage.getKeyData("masterData");
        if (saveMasterData) {

            let temp = {
                masterGender: [],
                masterCountry: [],
                masterLocation: [],
                masterEthnicity: [],
                masterRace: [],
                masterRenderingProvider: [],
                masterPhoneType: [],
                staffs: [],
                masterPhonePreferences: []
            };
            if (saveMasterData.masterGender)
                temp.masterGender = saveMasterData.masterGender;
            if (saveMasterData.masterCountry)
                temp.masterCountry = saveMasterData.masterCountry;
            if (saveMasterData.masterLocation)
                temp.masterLocation = saveMasterData.masterLocation;

            if (saveMasterData.masterEthnicity)
                temp.masterEthnicity = saveMasterData.masterEthnicity;

            if (saveMasterData.masterRace)
                temp.masterRace = saveMasterData.masterRace;

            if (saveMasterData.masterRenderingProvider)
                temp.masterRenderingProvider = saveMasterData.masterRenderingProvider;

            if (saveMasterData.masterPhoneType)
                temp.masterPhoneType = saveMasterData.masterPhoneType;

            if (saveMasterData.staffs)
                temp.staffs = saveMasterData.staffs.filter(s => s["isRenderingProvider"]);

            if (saveMasterData.masterPhonePreferences)
                temp.masterPhonePreferences = saveMasterData.masterPhonePreferences;



            setMasterdata({ ...temp });

        }

        const mrn = await api.getMRN();
        if (mrn.statusCode == 200 && mrn.data && mrn.data.uniqueId)
            setObj({ ...obj, mrn: mrn.data.uniqueId })
        else
            setMessage("Something went wrong, please try later")

    }
    useEffect(() => {
        loadDefault();
    }, [])

    return (

        <View style={[css.container, { justifyContent: "flex-start", alignItems: "center" }]}>
            <TopHeader showBackButton={true} />

            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.1)']}
                style={{
                    position: 'absolute',
                    right: -100,
                    top: 0,
                    borderRadius: 715,
                    width: 715,
                    height: 715
                }}
            />
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.09)']}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 100,
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
                    right: -100,
                    top: 100,
                    borderRadius: 1115,
                    width: 1115,
                    height: 1115,
                    zIndex: 0
                }}
            />
            <View style={{ flex: 1.5, justifyContent: "flex-end", alignItems: "center", width: "100%", paddingTop: 20 }}>
                <Image source={require("./../assets/aceso.png")} />
                <View style={{ width: "90%", marginTop: 30, marginBottom: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: 700, textAlign: "left" }} >Sign Up</Text>
                    <Text style={{ fontSize: 16, fontWeight: 400, color: "#808D9E" }} >Create account and enjoy all services</Text>
                </View>
            </View>

            <View style={{ flex: 2, width: "100%", alignItems: "center", justifyContent: "center", paddingTop: 10 }}>
                <ScrollView style={{ width: "100%", textAlign: "center" }}>
                    <TextInput
                        placeholder='*First name'
                        helperText=''
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, firstName: txt })}
                        value={obj['firstName']}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    />
                    <TextInput
                        placeholder='Middle name'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, middleName: txt })}
                        value={obj['middleName']}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    />
                    <TextInput
                        placeholder='Last name'
                        autoCapitalize='none'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, lastName: txt })}
                        value={obj['lastName']}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    />

                    <View style={{ backgroundColor: "#FFF", width: "90%", marginLeft: "5%", marginBottom: 20, height: 50, justifyContent: "center", paddingLeft: 20 }}>
                        <BSelect
                            placeholder={{
                                label: "Gender",
                                value: ""
                            }}
                            value={obj["gender"]}
                            items={masterdata.masterGender.map((i) => { return { label: i.gender, value: i.id } })}
                            key={masterdata.masterGender.length}
                            onselect={(value) => setObj({ ...obj, gender: value })}
                        />
                        {/* <RNPickerSelect
                            placeholder={{
                                label: "Gender",
                                value: "",
                            }}
                            items={
                                masterdata.masterGender.map((i) => { return { label: i.gender, value: i.id } })
                            }
                            onValueChange={(value) => setObj({ ...obj, gender: value })}
                            labelStyle={{ color: "#111111" }}
                            style={{ color: "#444", placeholder: { color: "#444" } }}
                            contentStyle={{ backgroundColor: "#FFF", color: "#111" }}
                        /> */}
                    </View>

                    <View style={{ backgroundColor: "#FFF", width: "90%", marginLeft: "5%", marginBottom: 20, padding: 18 }}>
                        <Text onPress={() => setShow(true)} style={{ color: "#444" }}>{obj["dob"] && !show ? obj["dob"] : "DOB"}</Text>
                        {
                            show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={(ev) => {
                                        setShow(false);
                                        //console.log(ev.nativeEvent.timestamp);
                                        let d = new Date(ev.nativeEvent.timestamp);
                                        setDate(d);
                                        setObj({
                                            ...obj,
                                            dob: d.toISOString().substring(0, 10)
                                        });
                                    }}
                                />

                            )
                        }
                    </View>

                    <TextInput
                        placeholder='*Email'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, email: txt })}
                        value={obj["email"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    />
                    <TextInput
                        placeholder='*Password'
                        secureTextEntry={showPassword ? false : true}
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, password: txt })}
                        value={obj["password"]}
                        style={{ width: "90%", display: "none", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                        right={showPassword ? <TextInput.Icon icon="eye" onPress={() => setShowPassword(false)} color={"lightgray"} /> : <TextInput.Icon icon="eye-off" onPress={() => setShowPassword(true)} color={"lightgray"} />}
                    />
                    <View style={{ backgroundColor: "#FFF", width: "90%", marginLeft: "5%", marginBottom: 20, height: 50, justifyContent: "center", paddingLeft: 20 }}>
                        <BSelect
                            placeholder={{
                                label: "Race",
                                value: ""
                            }}
                            value={obj["race"]}
                            items={masterdata.masterRace.map((i) => { return { label: i.raceName, value: i.id } })}
                            key={masterdata.masterRace.length}
                            onselect={(value) => setObj({ ...obj, race: value })}
                        />
                    </View>

                    <View style={{ backgroundColor: "#FFF", width: "90%", marginLeft: "5%", marginBottom: 20, height: 50, justifyContent: "center", paddingLeft: 20 }}>
                        <BSelect
                            placeholder={{
                                label: "Secondary Race",
                                value: ""
                            }}
                            value={obj["secondaryRaceID"]}
                            items={masterdata.masterRace.map((i) => { return { label: i.raceName, value: i.id } })}
                            key={masterdata.masterRace.length}
                            onselect={(value) => setObj({ ...obj, secondaryRaceID: value })}
                        />
                    </View>


                    {/* <TextInput
                        placeholder='Secondary Race'
                        // secureTextEntry={showPassword ? false : true}
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, secondaryRace: txt })}
                        value={obj["secondaryRace"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    // right={showPassword ? <TextInput.Icon icon="eye" onPress={() => setShowPassword(false)} color={"lightgray"} /> : <TextInput.Icon icon="eye-off" onPress={() => setShowPassword(true)} color={"lightgray"} />}
                    /> */}

                    <View style={{ backgroundColor: "#FFF", width: "90%", marginLeft: "5%", marginBottom: 20, height: 50, justifyContent: "center", paddingLeft: 20 }}>
                        <BSelect
                            placeholder={{
                                label: "Ethnicity",
                                value: ""
                            }}
                            value={obj["ethnicity"]}
                            items={masterdata.masterEthnicity.map((i) => { return { label: i.ethnicityName, value: i.id } })}
                            key={masterdata.masterEthnicity.length}
                            onselect={(value) => setObj({ ...obj, ethnicity: value })}
                        />
                    </View>


                    {/* <TextInput
                        placeholder='Ethnicity'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, ethnicity: txt })}
                        value={obj["ethnicity"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    /> */}
                    <TextInput
                        placeholder='Primary Provider'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, primaryProvider: txt })}
                        value={obj["primaryProvider"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    />

                    <View style={{ backgroundColor: "#FFF", width: "90%", marginLeft: "5%", marginBottom: 20, height: 50, justifyContent: "center", paddingLeft: 20 }}>

                        <BSelect
                            placeholder={{
                                label: "Rendering Provider",
                                value: ""
                            }}
                            value={obj["renderingProviderID"]}
                            items={masterdata.staffs.map((i) => { return { label: (i.firstName + ' ' + i.lastName), value: i.id } })}
                            key={masterdata.staffs.length}
                            onselect={(value) => setObj({ ...obj, renderingProviderID: value })}
                        />
                    </View>
                    {/* <TextInput
                        placeholder='Rendering Provider'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, renderingProvider: txt })}
                        value={obj["renderingProvider"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    /> */}
                    <TextInput
                        placeholder='Primary Diagnosis'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, primary_diagnosis: txt })}
                        value={obj["primary_diagnosis"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20, display: "none" }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    />

                    <View style={{ backgroundColor: "#FFF", width: "90%", marginLeft: "5%", marginBottom: 20, height: 50, justifyContent: "center", paddingLeft: 20 }}>
                        <BSelect
                            placeholder={{
                                label: "*Location",
                                value: ""
                            }}
                            value={obj["locationID"]}
                            items={masterdata.masterLocation.map((i) => { return { label: i.locationName, value: i.id } })}
                            key={masterdata.masterLocation.length}
                            onselect={(value) => setObj({ ...obj, locationID: value })}
                        />

                        {/* <RNPickerSelect
                            placeholder={{
                                label: "*Location",
                                value: "",
                            }}
                            items={
                                masterdata.masterLocation.map((i) => { return { label: i.locationName, value: i.id } })
                            }
                            onValueChange={(value) => setObj({ ...obj, locationID: value })}
                            labelStyle={{ color: "#444" }}
                            style={{ color: "#444", placeholder: { color: "#444" } }}
                            contentStyle={{ backgroundColor: "#FFF", color: "#111" }}
                        /> */}
                    </View>
                    <View style={{ backgroundColor: "#FFF", width: "90%", marginLeft: "5%", marginBottom: 20, height: 50, justifyContent: "center", paddingLeft: 20 }}>

                        <BSelect
                            placeholder={{
                                label: "*Country",
                                value: ""
                            }}
                            value={obj["nationality"]}
                            items={masterdata.masterCountry.map((i) => { return { label: i.countryName, value: i.id } })}
                            key={masterdata.masterCountry.length}
                            onselect={(value) => setObj({ ...obj, nationality: value })}
                        />

                        {/* <RNPickerSelect
                            placeholder={{
                                label: "Country",
                                value: "",
                            }}
                            items={
                                masterdata.masterCountry.map((i) => { return { label: i.countryName, value: i.id } })
                            }
                            onValueChange={(value) => { setObj({ ...obj, nationality: value }); }}
                            labelStyle={{ color: "#444" }}
                            style={{ color: "#444", placeholder: { color: "#444" } }}
                            contentStyle={{ backgroundColor: "#FFF" }}
                        /> */}
                    </View>
                    <TextInput
                        placeholder='*User Name'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, userName: txt })}
                        value={obj["userName"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    />
                    <TextInput
                        placeholder='Govt ID Type'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, gov_id_type: txt })}
                        value={obj["gov_id_type"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20, display: "none" }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    />
                    <TextInput
                        placeholder='Govt ID #'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, gov_id_num: txt })}
                        value={obj["gov_id_num"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20, display: "none" }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    />
                    {/* <TextInput
                        placeholder='Race'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, race: txt })}
                        value={obj["race"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16, color: "black" }}
                        outlineStyle={{ borderColor: "#fff" }}
                    /> */}

                    <View style={{ backgroundColor: "#FFF", width: "90%", marginLeft: "5%", marginBottom: 20, }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: 20 }}>
                            <Switch

                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={obj["isPortalRequired"] ? '#1976d2' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(v) => setObj({ ...obj, isPortalRequired: v })}
                                value={obj["isPortalRequired"]}
                            /><Text style={{ fontSize: 16, lineHeight: 50, paddingLeft: 10 }}>Portal Required</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: "#FFF", width: "90%", marginLeft: "5%", marginBottom: 20, height: 50, justifyContent: "center", paddingLeft: 20 }}>
                        <BSelect
                            placeholder={{
                                label: "Contact Type",
                                value: ""
                            }}
                            value={obj["phoneNumbers"][0]["phoneNumberType"]}
                            items={masterdata.masterPhoneType.map((i) => { return { label: i.globalCodeName, value: i.id } })}
                            key={masterdata.masterPhoneType.length}
                            onselect={(value) => {
                                let temp = obj.phoneNumbers[0];
                                temp.phoneNumberTypeId = value;
                                setObj({ ...obj, phoneNumbers: [temp] })
                            }}
                        />

                    </View>
                    {/* <TextInput
                        placeholder='Contact Type'
                        mode='outlined'
                        onChangeText={(txt) => {
                            let temp = obj.phoneNumbers[0];
                            temp.phoneNumberTypeId = txt;

                            setObj({ ...obj, phoneNumbers: [temp] })
                        }}
                        value={obj["phoneNumbers"][0]["phoneNumberType"]}

                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16 }}
                        outlineStyle={{ borderColor: "#fff" }}
                    /> */}
                    <TextInput
                        placeholder='Phone Number'
                        mode='outlined'
                        onChangeText={(txt) => {
                            let temp = obj.phoneNumbers[0];
                            temp.phoneNumber = txt;
                            setObj({ ...obj, phoneNumbers: [temp] })
                        }}
                        value={obj["phoneNumbers"][0]["phoneNumber"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16 }}
                        outlineStyle={{ borderColor: "#fff" }}
                        keyboardType={'numeric'}
                    />
                    <View style={{ backgroundColor: "#FFF", width: "90%", marginLeft: "5%", marginBottom: 20, height: 50, justifyContent: "center", paddingLeft: 20 }}>

                        <BSelect
                            placeholder={{
                                label: "Preference",
                                value: ""
                            }}
                            value={obj["preference"]}
                            items={masterdata.masterPhonePreferences.map((i) => { return { label: i.globalCodeName, value: i.id } })}
                            key={masterdata.masterPhonePreferences.length}
                            onselect={(value) => {
                                setObj({ ...obj, preference: value })
                            }}
                        />
                    </View>
                    {/* <TextInput
                        placeholder='Preference'
                        mode='outlined'
                        onChangeText={(txt) => setObj({ ...obj, preference: txt })}
                        value={obj["preference"]}
                        style={{ width: "90%", marginLeft: "5%", backgroundColor: "#FFF", marginBottom: 20 }}
                        contentStyle={{ fontSize: 16 }}
                        outlineStyle={{ borderColor: "#fff" }}
                    /> */}
                    <View style={{ padding: 20 }}>

                        <ToggleButton
                            icon=""
                            value="terms"
                            status={status}
                            onPress={onButtonToggle}
                            iconColor='#111'
                            style={{ backgroundColor: "transparent" }}
                        />
                        <Text style={{ color: "#1D1E25", fontSize: 14 }}>
                            <Text onPress={onButtonToggle}>
                                {
                                    status == 'check' ?
                                        <Icon source={'check'} color='#111' size={20} style={{ borderColor: '#111' }} />
                                        :
                                        <Icon source={'checkbox-blank'} color='#ccc' size={20} style={{ borderColor: '#111' }} />

                                }
                            </Text>   I agree to the company Term of Service and Privacy Policy </Text>
                    </View>

                </ScrollView>
            </View>
            <View style={{ paddingBottom: 30, paddingTop: 20, justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
                <Button onPress={signup} type="elevated" buttonColor='#5D8DF7' textColor='#FFF' style={{ width: "90%", borderRadius: 0, height: 40 }} labelStyle={{ fontWeight: 900, fontSize: 16 }}>Sign Up</Button>
                <Text style={{ marginTop: 20, fontSize: 16, color: "#808D9E", fontWeight: 400 }}>Already have an account? <Text style={{ fontSize: 16, color: "#5D8DF7", fontWeight: 400 }} onPress={() => props.navigation.navigate("signin")}>Sign In</Text> </Text>
            </View>
            {
                message && message.length ? <MySnackbar message={message} setMessage={setMessage} />
                    : <></>
            }
        </View>
    );
}

export default Signup;
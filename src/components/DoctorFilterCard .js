import { Platform, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { useEffect, useState } from 'react';
import api from '../services/API';
import storage from '../services/StorageService';
import BSelect from './BSelect';


const DoctorFilterCard = ({ pic, name, allDepartments, department, location, gender, phone_number, rating, doc_id, closeFilter, findProvider }) => {
    const [departments, setDepartments] = useState([]);
    const [masterLocation, setMasterLocation] = useState([]);
    const [masterGender, setMasterGender] = useState([]);
    const [obj, setObj] = useState({});
    const [departmentItems, setDepartmentItems] = useState([]);
    const [genderItems, setGenderItems] = useState([]);
    const [locationItems, setLocationItems] = useState([]);
    const loadDefault = async () => {

        console.log("load default ");

        const saveMasterData = await storage.getKeyData("masterData");
        if (saveMasterData) {
            let masterLocation = [];
            if (saveMasterData.masterLocation) {
                setMasterLocation([...saveMasterData.masterLocation]);
                let temp = [];
                saveMasterData.masterLocation?.map((item) => {
                    temp.push({
                        label: item.locationName,
                        value: item.id
                    })
                });

                setLocationItems(temp);
            }


            if (saveMasterData.masterGender) {
                setMasterGender([...saveMasterData.masterGender])
                let temp = [];
                saveMasterData.masterGender?.map((item) => {
                    temp.push({
                        label: item.value,
                        value: item.id
                    })
                });


                setGenderItems([...temp]);
            }

        }


        // const result = await api.getDepartment();
        // if (result && result.statusCode == 200) {
        //     if (result.data) {
        //         setDepartments([...result.data])
        //         let temp = [];
        //         result.data?.map((item) => {
        //             temp.push({
        //                 label: item.departmentName,
        //                 value: item.id
        //             })
        //         });
        //         setDepartmentItems([...temp]);
        //     }
        // }
        const result = allDepartments;
        if (result) {
            setDepartments([...result])
            let temp = [];
            result?.map((item) => {
                temp.push({
                    label: item.departmentName,
                    value: item.id
                })
            });
            setDepartmentItems([...temp]);
        }

    }

    useEffect(() => {
        console.log(obj)

    }, [obj])

    useEffect(() => {
        console.log("selected department ", department);
        if (department >= 0)
            obj["departmentID"] = department;

        if (gender >= 0)
            obj["gender"] = gender;

        if (location >= 0)
            obj["locationID"] = location;


        loadDefault();
    }, [])


    return <View style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <View style={{ display: "flex", flexDirection: "row", width: "80%", backgroundColor: "#FFF", padding: 10, borderRadius: 40, marginBottom: 10 }}>
            <View style={{ margin: 2 }}>
                <Avatar.Icon icon={'magnify'} size={40} color='#5E8DF7' style={{ backgroundColor: "#C8D8FC" }} />
            </View>
            <View style={{ paddingLeft: 10, flex: 1 }}>
                <Text style={{
                    color: '#808D9E',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 20,
                }}>Speciality</Text>
                <View style={{
                    height: 20
                }}>

                    <BSelect
                        placeholder={{
                            label: "All Specialities",
                            value: ""
                        }}
                        items={departmentItems}
                        value={obj["departmentID"]}
                        key={departmentItems.length}
                        onselect={(value) => setObj({ ...obj, departmentID: value })}
                    />
                    {/* <RNPickerSelect
                        placeholder={{
                            label: "All Specialities",
                            value: ""
                        }}
                        items={
                            departments?.map((i) => { return { label: i.departmentName, value: i.id } })
                        }
                        value={obj["departmentID"]}
                        onDonePress={(value) => Platform.OS === 'ios' ? setObj({ ...obj, departmentID: value }) : console.log('done press ', value)}
                        onValueChange={(value) => Platform.OS != 'ios' ? setObj({ ...obj, departmentID: value }) : console.log('value highlighted ', value)}
                        useNativeAndroidPickerStyle={false}
                        style={{ color: "#111" }}

                    /> */}

                </View>
            </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", width: "80%", backgroundColor: "#FFF", padding: 10, borderRadius: 40, marginBottom: 10 }}>
            <View style={{ margin: 2 }}>
                <Avatar.Icon icon={'map-marker'} size={40} color='#5E8DF7' style={{ backgroundColor: "#C8D8FC" }} />
            </View>
            <View style={{ paddingLeft: 10, flex: 1 }}>
                <Text style={{
                    color: '#808D9E',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 20,
                }}>Location</Text>
                <View style={{
                    height: 20
                }}>
                    <BSelect
                        placeholder={{
                            label: "All Locations",
                            value: ""
                        }}
                        value={obj["locationID"]}
                        key={locationItems.length}
                        items={locationItems}
                        onselect={(value) => setObj({ ...obj, locationID: value })}
                    />

                    {/* <RNPickerSelect
                        placeholder={{
                            label: "All Locations",
                            value: ""
                        }}
                        value={obj["locationID"]}
                        items={
                            masterLocation?.map((i) => { return { label: i.locationName, value: i.id } })
                        }
                        onDonePress={(value) => Platform.OS === 'ios' ? setObj({ ...obj, locationID: value }) : console.log('done press ', value)}
                        onValueChange={(value) => Platform.OS != 'ios' ? setObj({ ...obj, locationID: value }) : console.log('value highlighted ', value)}
                        useNativeAndroidPickerStyle={false}
                        style={{ color: "#111" }}

                    /> */}

                </View>
            </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", width: "80%", backgroundColor: "#FFF", padding: 10, borderRadius: 40, marginBottom: 10 }}>
            <View style={{ margin: 2 }}>
                <Avatar.Icon icon={'gender-male-female'} size={40} color='#5E8DF7' style={{ backgroundColor: "#C8D8FC" }} />
            </View>
            <View style={{ paddingLeft: 10, flex: 1 }}>
                <Text style={{
                    color: '#808D9E',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 20,
                }}>Gender</Text>
                <View style={{
                    height: 20
                }}>
                    <BSelect
                        placeholder={{
                            label: "All Gender",
                            value: ""
                        }}
                        value={obj["gender"]}
                        items={genderItems}
                        key={genderItems.length}

                        onselect={(value) => setObj({ ...obj, gender: value })}
                    />

                    {/* <RNPickerSelect
                        placeholder={{
                            label: "All Gender",
                            value: ""
                        }}
                        value={obj["gender"]}
                        items={
                            masterGender?.map((i) => { return { label: i.value, value: i.id } })
                        }

                        onDonePress={(value) => Platform.OS === 'ios' ? setObj({ ...obj, gender: value }) : console.log('done press ', value)}
                        onValueChange={(value) => Platform.OS != 'ios' ? setObj({ ...obj, gender: value }) : console.log('value highlighted ', value)}
                        useNativeAndroidPickerStyle={false}
                        style={{ color: "#111" }}

                    /> */}

                </View>
            </View>
        </View>
        <Button mode="contained" style={{ backgroundColor: "#5E8DF7", minWidth: "60%", marginVertical: 10 }} onPress={() => findProvider(obj)}>Find Provider</Button>
        <Text onPress={closeFilter} style={{
            color: '#5E8DF7',
            fontSize: 12,
            fontWeight: 600
        }}>Cancel</Text>
    </View>;
}



export default DoctorFilterCard;
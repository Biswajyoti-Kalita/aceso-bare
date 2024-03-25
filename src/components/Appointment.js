import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TopHeaderV2 from './TopHeaderV2';
import { Row, Rows, Table } from 'react-native-reanimated-table';
import { useCallback, useEffect, useState } from 'react';
import { store } from '../store/Store';
import api from '../services/API';
import AppointmentCardV2 from './AppointmentCardV2';
import DepartmentBlock from './DepartmentBlock';
import { useFocusEffect } from '@react-navigation/native';

const Appointment = () => {

    const [activeMenu, setActiveMenu] = useState(1);
    const [appointments, setAppointments] = useState([]);
    const [splittedAppointments, setSplittedAppointments] = useState({
        "future": [],
        "todays": [],
        "previous": [],
        "new": []
    });
    const [departments, setDepartments] = useState([]);

    const selectedMenu = (num) => {
        setActiveMenu(num);
        if (num == 3)
            loadDepartments();
    }

    const modifyAppointmentsData = (appointmentData) => {
        if (!appointmentData || appointmentData == undefined)
            return;
        const currentDate = new Date();
        let spdata = {
            "future": [],
            "todays": [],
            "previous": [],
            "new": []
        };
        appointmentData?.map((appointment) => {
            const appointmentDate = new Date(appointment.startDateTime);
            if (appointmentDate.toISOString().substring(0, 10) == currentDate.toISOString().substring(0, 10)) {
                spdata.todays.push(appointment);
            }
            else if (appointmentDate.getTime() > currentDate.getTime()) {
                spdata.future.push(appointment);
            } else {
                spdata.previous.push(appointment);
            }
        });

        setSplittedAppointments({ ...spdata });
    }


    const loadDepartments = async () => {
        const getDepartments = await api.getDepartment();
        if (getDepartments && getDepartments.data)
            setDepartments([...getDepartments.data]);

    }


    const loadDefault = async () => {
        const currentuser = store.getState().user;
        console.log({ currentuser });
        if (currentuser && currentuser.token) {
            const getAppointmentsData = await api.getPatientAppointments({
                token: currentuser.token,
                fromDate: '',
                patientIds: currentuser.profile?.id,
                locationIds: currentuser.profile?.locationID,
            });
            if (getAppointmentsData && getAppointmentsData.data)
                modifyAppointmentsData(getAppointmentsData.data);

            loadDepartments();
        }
    }


    useEffect(() => {

        console.log("deptartments updated ", departments.length)

    }, [departments])


    
    useFocusEffect(
        useCallback(() => {
            loadDefault();
        },[])
    )


    useEffect(() => {
       // loadDefault();
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <TopHeaderV2 />
            <Text style={{
                textAlign: "center",
                color: "#242B42",
                lineHeight: 28,
                fontWeight: 700,
                marginTop: 20
            }}>Appointment</Text>
            <View style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20
            }}>
                <View style={{ backgroundColor: "#F1F5FF", display: "flex", flexDirection: "row", width: "85%", borderRadius: 15, padding: 1 }}>
                    <View style={[{
                        borderRadius: 17,
                        backgroundColor: activeMenu == 1 ? "#FFF" : "transparent",
                        flex: 1,
                        padding: 7
                    }, activeMenu == 1 ? styles.activeMenu : {}]}
                        onTouchEnd={() => selectedMenu(1)}
                    >
                        <Text style={{ textAlign: "center", fontSize: 15, color: "#1D1E25", fontWeight: 400 }}>Previous</Text>
                    </View>
                    <View style={[{
                        borderRadius: 17,
                        backgroundColor: activeMenu == 2 ? "#FFF" : "transparent",
                        padding: 7,
                        flex: 1
                    }, activeMenu == 2 ? styles.activeMenu : {}]}
                        onTouchEnd={() => selectedMenu(2)}
                    >
                        <Text style={{ textAlign: "center", fontSize: 15, color: "#1D1E25", fontWeight: 400 }}>Upcoming</Text>
                    </View>
                    <View style={[{
                        borderRadius: 17,
                        backgroundColor: activeMenu == 3 ? "#FFF" : "transparent",
                        flex: 1,
                        padding: 7
                    }, activeMenu == 3 ? styles.activeMenu : {}]}
                        onTouchEnd={() => selectedMenu(3)}
                    >
                        <Text style={{ textAlign: "center", fontSize: 15, color: "#1D1E25", fontWeight: 400 }}>New</Text>
                    </View>
                </View>
            </View>
            <ScrollView>


                {
                    activeMenu == 1 && splittedAppointments.previous.length ?
                        splittedAppointments.previous?.map((appointment, index) => (
                            <View key={index} style={{ flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <AppointmentCardV2 isPrevious={true} appointment={appointment} />
                            </View>
                        ))
                        : <></>
                }

                {
                    activeMenu == 2 && (splittedAppointments.todays.length || splittedAppointments.future.length) ?
                        <>
                            {
                                splittedAppointments.todays.length ?
                                    <>
                                        <View style={{ marginLeft: 20, marginTop: 20 }}><Text style={{ color: "#5E8DF7", fontSize: 15, fontWeight: 500, }}>Today</Text></View>
                                        {
                                            splittedAppointments.todays?.map((appointment, index) => (
                                                <View key={index} style={{ flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <AppointmentCardV2 appointment={appointment} />
                                                </View>
                                            ))
                                        }
                                    </> : <></>
                            }
                            {
                                splittedAppointments.future.length ?
                                    <>
                                        <View style={{ marginLeft: 20, marginTop: 20 }}><Text style={{ color: "#5E8DF7", fontSize: 15, fontWeight: 500, }}>Future</Text></View>
                                        {
                                            splittedAppointments.future?.map((appointment, index) => (
                                                <View key={index} style={{ flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <AppointmentCardV2 appointment={appointment} />
                                                </View>
                                            ))
                                        }
                                    </> : <></>
                            }

                        </>
                        : <></>
                }
                {
                    activeMenu == 3 && <View>
                        <View style={{
                            padding: 25
                        }}>
                            <Text style={{
                                color: "#242B42",
                                textAlign: 'center',
                                fontSize: 16,
                                fontWeight: 500,
                                lineHeight: 28
                            }}>What type of Appointment do you need today?</Text>
                        </View>
                        <View style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginTop: 20,
                        }}>
                            <DepartmentBlock key={departments.length} departments={departments} />
                        </View>
                    </View>
                }

            </ScrollView >
        </View >

    );
}
const styles = StyleSheet.create({
    activeMenu: {
        borderRadius: 30,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.23)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
});


export default Appointment;
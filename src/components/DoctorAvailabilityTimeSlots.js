import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/API';



const TimeSlot = ({ isSelected, time, slotSelected }) => {

    const [times, setTimes] = useState(["", ""]);

    const formatTime = (time) => {
        return time.toTimeString().substring(0, 5) + "" + (time.getHours() >= 12 ? 'PM' : 'AM');
    }

    useEffect(() => {
        const firstTime = new Date(time);
        const secondTime = new Date(time);
        secondTime.setMinutes(secondTime.getMinutes() + 30);
        console.log({ firstTime, secondTime });
        setTimes([...[formatTime(firstTime), formatTime(secondTime)]]);
        console.log(times)
    }, [])

    return (
        <View style={[{
            width: "48%",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center"
        }, isSelected ? { backgroundColor: "#257CFF" } : { backgroundColor: "#FFF", borderColor: "#E5E7EB", borderWidth: 1 }]}
            onTouchEnd={() => slotSelected(times[0])}
        >
            <Text style={[{
                textAlign: "center",
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 16
            }, isSelected ? { color: "#FFF" } : {}]}> {times[0]} - {times[1]} </Text>
        </View>
    )
}

const DoctorAvailabilityTimeSlots = ({ selectedDate, staffID, appointmentDateTimeSelected, selectedAppointmentDateTime }) => {
    const [timeslots, setTimeslots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    const slotSelected = (timeselected) => {
        console.log("slot selected ", timeselected);
        const cdate = new Date(selectedDate);
        let hhmm = timeselected.replace("AM", "").replace("PM", "").split(":");
        cdate.setHours(parseInt(hhmm[0]));
        cdate.setMinutes(hhmm[1], 0, 0);
        console.log("appointmentDateTimeSelected ", cdate);
        appointmentDateTimeSelected(cdate);
    }

    const showSlots = (st, et, unavailableSlots) => {
        const startTime = new Date(st);
        const endTime = new Date(et);
        // startTime.setHours(10);
        // startTime.setMinutes(0);
        // endTime.setHours(17);
        // endTime.setMinutes(0);
        console.log({
            startTime, endTime
        })

        let currentTime = new Date(startTime);

        const timeArray = [];
        console.log("start time", startTime, " endtime", endTime, "selectedDate ", selectedDate);
        while (currentTime.getTime() <= endTime.getTime()) {
            const tempTime = new Date(currentTime);
            const checkExist = unavailableSlots.find((us) => new Date(us.startTime).getTime() <= tempTime.getTime() && tempTime.getTime() <= new Date(us.endTime).getTime())
            if (!checkExist)
                timeArray.push(tempTime);
            currentTime.setMinutes(currentTime.getMinutes() + 30);
        }
        //console.log(timeArray);
        let array2d = [];

        for (let i = 0, j = 0; i < timeArray.length; i = i + 2, j++) {

            array2d[j] = [timeArray[i]];
            if ((i + 1) < timeArray.length)
                array2d[j].push(timeArray[i + 1]);

        }

        console.log("\n\n\n", { array2d })
        setTimeslots([...array2d]);

    }

    const loadDefault = async () => {

        const availabilityData = await api.getDoctorAvailability({
            id: staffID
        });

        const currentDate = new Date(selectedDate);

        if (availabilityData && availabilityData.data) {

            console.log(availabilityData.data.days);
            const days = availabilityData.data.days.find((d => d.dayId == (currentDate.getDay() + 1)));
            console.log(days);
            if (days) {
                // let startDateTime = new Date(selectedDate);
                // let endDateTime = new Date(selectedDate);

                console.log({ selectedDate, currentDate })
                let dayStartTime = new Date(days.startTime);
                let dayEndTime = new Date(days.endTime);

                console.log({ dayStartTime, dayEndTime });
                // startDateTime.setHours(dayStartTime.getHours());
                // startDateTime.setMinutes(dayStartTime.getMinutes(), 0, 0);

                // endDateTime.setHours(dayEndTime.getHours());
                // endDateTime.setMinutes(dayEndTime.getMinutes(), 0, 0);
                let month = currentDate.getMonth() + 1;
                let dateString = `${currentDate.getFullYear()}-${month < 10 ? "0" + month : month}-${currentDate.getDate()}`;
                let timeString1 = dayStartTime.toISOString().substring(10);
                let timeString2 = dayEndTime.toISOString().substring(10);
                console.log({ dateString }, currentDate.getDate())
                let startDateTime = new Date(dateString + timeString1);
                let endDateTime = new Date(dateString + timeString2);

                console.log({ startDateTime, endDateTime });
                // startDateTime.setHours(dayStartTime.getHours(), dayStartTime.getMinutes(), 0, 0);
                // endDateTime.setDate(dayEndTime.getHours(), dayEndTime.getMinutes(), 0, 0);

                // console.log({ startDateTime, endDateTime });


                showSlots(startDateTime, endDateTime, availabilityData.data.unavailable);

            }
        }
        setIsLoading(false);
    }

    useEffect(() => {


        console.log("\n\n\nselectedAppointmentDateTime ", { selectedAppointmentDateTime }, "\n\n");

        setTimeslots([...[]]);
        setIsLoading(true);
        loadDefault();

    }, [])

    return (
        <View style={{
            paddingLeft: 10,
            marginVertical: 20
        }}>
            <Text style={{
                color: "#1D1E25",
                fontSize: 18,
                fontWeight: 700,
                lineHeight: 20,
                marginVertical: 10,
            }}>Availability</Text>

            {
                isLoading && <ActivityIndicator />
            }
            <View style={{
                paddingHorizontal: 10
            }}>
                {
                    timeslots?.map((item, ind1) => (
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 5
                        }} key={ind1}>
                            {
                                item?.map((i, ind) => (
                                    <TimeSlot slotSelected={slotSelected} time={i} key={ind} isSelected={(selectedAppointmentDateTime && new Date(selectedAppointmentDateTime[0]).getTime() == i.getTime()) || (selectedAppointmentDateTime.length == 2 && new Date(selectedAppointmentDateTime[1]).getTime() == i.getTime())} />
                                ))
                            }
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DoctorAvailabilityTimeSlots;
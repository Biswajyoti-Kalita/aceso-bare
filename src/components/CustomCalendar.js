import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CalendarItem = ({ date, isSelected, dateSelected }) => {
    const _date = new Date(date);
    _date.setHours(0, 0, 0, 0);
    return <View style={[{
        width: 50,
        height: 70,
        padding: 15,
        borderRadius: 35,
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 5
    }, isSelected ? { backgroundColor: "#4F81FF" } : { backgroundColor: "#E5E7EB" }]}
        onTouchEnd={() => dateSelected(date)}
    >
        <Text style={[{
            fontSize: 10,
            fontWeight: 600,
            lineHeight: 14,
        }, isSelected ? { color: "#F8F8FB" } : { color: "#808D9E" }]}>{['S', 'M', 'T', 'W', 'T', 'F', 'S'][_date.getDay()]}</Text>
        <Text style={[{
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 15,
        }, isSelected ? { color: "#FFFFFF" } : { color: "#101623" }]}>{_date.getDate()}</Text>
    </View>
}

const CustomCalendar = ({ startDate, endDate, selectedDate, dateSelected }) => {
    const [totalDates, setTotalDates] = useState([]);

    useEffect(() => {
        let currentDate = new Date(startDate);
        const dateArray = [];
        console.log("start date", startDate, "enddate", endDate);
        while (currentDate <= endDate) {
            dateArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setTotalDates([...dateArray]);
    }, [])

    return (
        <View>

            <View style={{
                paddingLeft: 10
            }}>
                <Text style={{
                    color: "#1D1E25",
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 20,
                }}>{["January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"][selectedDate.getMonth()]}</Text>
            </View>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10
            }}>
                <View>
                    <MaterialCommunityIcon name='chevron-left' color={'#808D9E'} size={35} />
                </View>
                <View style={{
                    flex: 1,
                }}>
                    <ScrollView horizontal={true}>
                        {
                            totalDates?.map((item, ind) => (
                                <CalendarItem date={item} key={ind} dateSelected={dateSelected} isSelected={selectedDate.toDateString() == item.toDateString()} />
                            ))

                        }
                    </ScrollView>
                </View>
                <View>
                    <MaterialCommunityIcon name='chevron-right' color={'#808D9E'} size={35} />
                </View>
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

export default CustomCalendar;
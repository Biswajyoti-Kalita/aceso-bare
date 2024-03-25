import { Text, View, TextInput, ScrollView } from 'react-native';
import FindDoctor from './FindDoctor';
import TopHeaderV2 from './TopHeaderV2';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Avatar, Icon } from 'react-native-paper';


const TelemedicineDoctorCard = () => {
    return <View style={{
        display: "flex",
        flexDirection: "row"
    }}>
        <View>
            <Avatar.Icon icon={'account'} size={40} />
        </View>
        <View>

        </View>
        <View>

        </View>
    </View>
}
const DoctorSearch = () => {
    const [showTelemedicine, setShowTelemedicine] = useState(true);
    const [search, setSearch] = useState('');

    return (
        // <FindDoctor />
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <TopHeaderV2 />

            <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.39)']}
                style={{
                    position: 'absolute',
                    left: -200,
                    top: 100,
                    borderRadius: 715,
                    width: 715,
                    height: 715
                }}
            />
            <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.29)']}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 0,
                    borderRadius: 315,
                    width: 315,
                    height: 315
                }}
            />
            <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.09)']}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: -100,
                    borderRadius: 415,
                    width: 415,
                    height: 415
                }}
            />
            <Text style={{
                textAlign: "center",
                color: "#242B42",
                lineHeight: 28,
                fontWeight: 700,
                marginTop: 20
            }}>e- Visit & Telemedicine </Text>
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20
                }}>
                <View
                    style={{
                        width: "80%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        backgroundColor: "#F1F5FF",
                        borderWidth: 1,
                        borderColor: "#FAFAFA",
                        borderRadius: 20,
                        zIndex: 9999
                    }}
                >
                    <View

                        onTouchEnd={() => setShowTelemedicine(true)}
                        style={[showTelemedicine ? {
                            backgroundColor: "#FFF", borderRadius: 20
                        } : { backgroundColor: "#F1F5FF" }, { width: "50%", padding: 10, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }]
                        }
                    >
                        <Text style={{ textAlign: "center" }}>Telemedicine</Text>
                    </View>

                    <View
                        onTouchEnd={() => setShowTelemedicine(false)}
                        style={[!showTelemedicine ? {
                            backgroundColor: "#FFF", borderRadius: 20
                        } : { backgroundColor: "#F1F5FF" }, { width: "50%", padding: 10, borderBottomRightRadius: 20, borderTopRightRadius: 20 }]}
                    >
                        <Text style={{ textAlign: "center" }}>e-Visit</Text>
                    </View>
                </View>
                <View style={{
                    width: "80%",
                    marginTop: 15
                }}>
                    <View style={{
                        position: "absolute",
                        padding: 20,
                        zIndex: 999
                    }}>
                        <Icon source={'magnify'} size={20} color='#CCC' />
                    </View>
                    <TextInput
                        label="Search"
                        value={search}
                        onChangeText={setSearch}

                        placeholder='Search'
                        style={{ backgroundColor: "#FFF", fontSize: 12, padding: 0, height: 40, marginVertical: 10, borderRadius: 20, paddingHorizontal: 20, paddingLeft: 45 }}

                    />
                </View>
            </View>
            <Text style={{
                marginLeft: "10%",
                color: "#1D1E25",
                fontSize: 15,
                fontWeight: 500
            }}>
                {
                    showTelemedicine ? 'Telemedicine' : 'e-Visit'
                }
            </Text>

            <ScrollView>
                <TelemedicineDoctorCard />
            </ScrollView>
        </View>
    );
}

export default DoctorSearch;
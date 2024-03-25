import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';

const DoctorSearchCard = ({ pic, name, specialty, phone_number, rating, doc_id, selectDoctor }) => {

    let picture = pic && pic.indexOf("http") === 0 ? pic : `https://api.ascendehr.com//Images//StaffPhotos//thumb//${pic}`;
    return <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
        <View style={{ display: "flex", backgroundColor: "#FFF", flexDirection: "row", width: "90%", borderRadius: 5, padding: 15 }} onTouchEnd={() => selectDoctor(doc_id)}>
            <View style={{ flex: 1 }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View>
                        {
                            pic ?
                                <Avatar.Image size={50} source={{
                                    uri: picture
                                }} />
                                :
                                <Avatar.Icon icon={'account'} size={50} />
                            // <Ionicon color={'#E9AF19'} />

                        }
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: 5 }}>
                            <Ionicon name={'star'} size={15} color={'#E9AF19'} />
                            <Text style={{
                                marginLeft: 3,
                                color: '#A4A8B2',
                                fontSize: 12,
                                fontWeight: 400,
                            }}>{rating}</Text>
                        </View>
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        {
                            name && <Text style={{
                                color: '#1D1E25',
                                fontSize: 12,
                                fontWeight: 700,
                                lineHeight: 20
                            }}>{name}</Text>
                        }
                        {
                            specialty &&
                            <Text style={{
                                color: '#808D9E',
                                fontSize: 12,
                                fontWeight: 400,
                                lineHeight: 21
                            }}>{specialty}</Text>
                        }
                        {
                            phone_number && <Text style={{
                                color: '#808D9E',
                                fontSize: 12,
                                fontWeight: 400,
                                lineHeight: 21
                            }}>{phone_number}</Text>
                        }

                    </View>
                </View>
            </View>
            <View>
                <Text style={{
                    color: '#5D8DF7',
                    fontSize: 11,
                    fontWeight: 400
                }}>view</Text>
            </View>
        </View>
    </View>;
}



export default DoctorSearchCard;
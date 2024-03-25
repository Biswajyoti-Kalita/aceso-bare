import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';

const DoctorSpecialityCard = ({ pic, name, specialty, phone_number, rating, doc_id }) => {
    let picture = pic && pic.indexOf("http") === 0 ? pic : `https://api.ascendehr.com//Images//StaffPhotos//thumb//${pic}`;

    return <View style={{ width: 160, backgroundColor: "#FFF", alignItems: "center", justifyContent: "center", margin: 10, borderRadius: 14, paddingTop: 15, paddingBottom: 10 }}>
        <View style={{ justifyContent: "center", margin: 10 }}>
            {
                pic ?
                    <Avatar.Image size={70} source={{
                        uri: picture
                    }} />
                    :
                    <Avatar.Icon icon={'account'} size={70} />
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
        {
            name && <Text style={{
                color: '#1D1E25',
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 20
            }}>{name}</Text>
        }
        <Text style={{
            color: '#808D9E',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 21
        }}>{specialty ? specialty : ''}</Text>
        {
            phone_number && <Text style={{
                color: '#808D9E',
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 21
            }}>{phone_number}</Text>
        }
    </View>;
}



export default DoctorSpecialityCard;
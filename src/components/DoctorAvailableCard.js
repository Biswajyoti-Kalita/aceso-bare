import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';

const DoctorAvailableCard = ({ pic, name, specialty, phone_number, rating, doc_id }) => {
    let picture = pic && pic.indexOf("http") === 0 ? pic : `https://api.ascendehr.com//Images//StaffPhotos//thumb//${pic}`;

    return <View style={{ width: 260, backgroundColor: "#5E8DF7", alignItems: "flex-start", justifyContent: "flex-start", margin: 10, borderRadius: 14, paddingTop: 15, paddingLeft: 30, paddingBottom: 10 }}>
        <View style={{ justifyContent: "flex-start", margin: 0 }}>
            {
                pic ?
                    <Avatar.Image size={70} source={{
                        uri: picture
                    }} />
                    :
                    <Avatar.Icon icon={'account'} size={70} />
                // <Ionicon color={'#E9AF19'} />

            }
        </View>
        {
            name && <Text style={{
                color: '#FFF',
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 20
            }}>{name}</Text>
        }
        <Text style={{
            color: '#FFF',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 21
        }}>{specialty ? specialty : ''}</Text>
        {
            phone_number && <Text style={{
                color: '#FFF',
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 21
            }}>{phone_number}</Text>
        }
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: 5 }}>
            <Ionicon name={'star'} size={15} color={'#E9AF19'} />
            <Text style={{
                marginLeft: 3,
                color: '#FFF',
                fontSize: 12,
                fontWeight: 400,
            }}>{rating}</Text>
        </View>

    </View>;
}



export default DoctorAvailableCard;
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppointmentModalItem = ({ id, image, primaryText, secondaryText, value, showProviderDetails }) => {
    return (
        <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }} onTouchEnd={() => showProviderDetails(value, primaryText)}>
            <View style={{
                flex: 1
            }}>
                {
                    image ? <View style={{ backgroundColor: "#48BD69", width: 50, height: 50, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                        <Image source={image} style={{ width: 25, height: 25 }} />
                    </View> : <View style={{ backgroundColor: "#48BD69", width: 50, height: 50, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                        <MaterialCommunityIcon name='marker-check' color={'#FFF'} size={25} />
                    </View>
                }

            </View>
            <View style={{
                paddingLeft: 20,
                paddingRight: 5,
                flex: 5
            }}>
                <Text style={{
                    color: "#4F81FF",
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 35
                }}>{primaryText}</Text>
                <Text style={{
                    color: "#9D9D9D",
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 16
                }}>{secondaryText}</Text>
            </View>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
            }}
            >
                {/* <Avatar.Icon icon={'chevron-right'} style={{ backgroundColor: "transparent" }} color='#808D9E' size={50} /> */}
                <MaterialCommunityIcon name='chevron-right' style={{ backgroundColor: "transparent" }} color='#808D9E' size={40} />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AppointmentModalItem;
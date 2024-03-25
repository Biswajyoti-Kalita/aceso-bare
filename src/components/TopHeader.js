import { Image, StyleSheet, Text, View } from 'react-native';
import MyDrawer from './MyDrawer';
import { useState } from 'react';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const TopHeader = ({ auth, showBackButton = false }) => {
    // const [showDrawer, setShowDrawer] = useState(false);
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    }

    return (
        <>
            {/* <MyDrawer showDrawer={showDrawer} onHide={() => setShowDrawer(false)} /> */}
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", width: "100%", zIndex: 100000, padding: 20, paddingHorizontal: 30, marginTop: 20 }}>
                {
                    showBackButton && <View style={{ lineHeight: 50, alignItems: "center", justifyContent: "center", height: 50 }}>
                        <Avatar.Icon onTouchEnd={goBack} icon={'chevron-left'} size={40} color='#242B42' style={{ backgroundColor: "transparent" }} />
                    </View>

                }
                <View style={{ borderRightWidth: 1, paddingRight: 10, marginRight: 10, borderColor: "#9CBAFF" }}>
                    <Text style={{ color: "#1B387A", fontSize: 10, fontWeight: 400, lineHeight: 50 }}> Ascend Health System</Text>
                </View>
                <Image source={require("./../assets/aceso.png")} style={{ width: 50, height: 50 }} />
            </View>
        </>
    );
}
export default TopHeader;
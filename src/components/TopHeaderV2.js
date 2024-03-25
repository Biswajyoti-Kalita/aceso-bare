import { Image, StyleSheet, Text, View } from 'react-native';
import MyDrawer from './MyDrawer';
import { useState } from 'react';
import { Avatar } from 'react-native-paper';
import CustomMenu from './CustomMenu';

const TopHeaderV2 = ({ auth }) => {
    // const [showDrawer, setShowDrawer] = useState(false);
    return (
        <>
            {/* <MyDrawer showDrawer={showDrawer} onHide={() => setShowDrawer(false)} /> */}
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", width: "100%", zIndex: 10, marginTop: 40, paddingHorizontal: 15 }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ borderRightWidth: 1, paddingRight: 10, marginRight: 10, borderColor: "#9CBAFF" }}>
                        {/* <Text onPress={() => setShowDrawer(!showDrawer)}>toggle</Text> */}
                        <Text style={{ color: "#1B387A", fontSize: 10, fontWeight: 400, lineHeight: 50 }}>Ascend Health System</Text>
                    </View>
                    <Image source={require("./../assets/aceso.png")} style={{ width: 50, height: 50 }} />
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", paddingLeft: 10 }}>
                    {/* <Avatar.Icon icon={'account'} size={34} />
                    <Text style={{ marginLeft: 1, lineHeight: 50, color: "#747474", fontSize: 15, fontWeight: 500 }}>John Doe</Text> */}
                    <CustomMenu />
                </View>
            </View>
        </>
    );
}
export default TopHeaderV2;
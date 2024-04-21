import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Drawer, Icon, Portal } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { store } from '../store/Store';
import { useNavigation } from '@react-navigation/native';

const MyDrawer = ({ showDrawer, onHide }) => {

    //const [active, setActive] = useState(showDrawer);
    const navigation = useNavigation();

    const translateX = useRef(new Animated.Value(-300)).current;

    const navigateTo = (screen) => {
        console.log("screen ", screen);
        navigation.navigate(screen);
        //setActive(false);
        onHide();
    }

    useEffect(() => {
        if (showDrawer) {
            // If the component is showDrawer, animate it entering from the left
            Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: false, // false is required for layout animation
            }).start();
        } else {
            // If the component is hidden, animate it exiting to the left
            Animated.spring(translateX, {
                toValue: -300,
                useNativeDriver: false,
            }).start();
        }
    }, [showDrawer, translateX]);

    return <>
        {
            showDrawer ?
                <Portal>
                    <View style={{ position: "absolute", zIndex: 1000, width: "100%", backgroundColor: "#FFF", bottom: 0, top: 0, paddingTop: 30 }}>
                        <LinearGradient
                            colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.59)']}
                            style={{
                                position: 'absolute',
                                left: -100,
                                top: 50,
                                borderRadius: 815,
                                width: 815,
                                height: 815
                            }}
                        />
                        <LinearGradient
                            colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.29)']}
                            style={{
                                position: 'absolute',
                                right: 20,
                                top: 0,
                                borderRadius: 515,
                                width: 515,
                                height: 515
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
                        <View style={{ padding: 10, display: "flex", flexDirection: "row" }}>
                            <Avatar.Icon icon={'chevron-left'} color='#242B42' style={{ backgroundColor: "transparent" }} size={40} onTouchEnd={onHide} />
                            <View style={{ justifyContent: "center", alignItems: "center", display: "flex", width: "80%" }}>
                                <Text style={{ textAlign: "center", lineHeight: 40, color: "#242B42", fontSize: 20, fontWeight: 700 }}>Menu</Text>
                            </View>
                        </View>
                        <ScrollView>

                            <View style={{ display: "flex", flexDirection: "row", padding: 10, paddingLeft: 20, margin: 10 }}>
                                <Avatar.Icon icon={'home'} size={35} color='#FFFFFF' style={{ backgroundColor: "#5E8DF7", marginRight: 15 }} />
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 400,
                                    color: "#000"
                                }}
                                    onPress={() => navigateTo('Home')}
                                >Home</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", padding: 10, paddingLeft: 20, margin: 10 }}>
                                <Avatar.Icon icon={'calendar-month'} size={35} color='#FFFFFF' style={{ backgroundColor: "#5E8DF7", marginRight: 15 }} />
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 400,
                                    color: "#000"
                                }}
                                    onPress={() => navigateTo('Appointment')}

                                >Scheduling</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", padding: 10, paddingLeft: 20, margin: 10 }}>
                                <Avatar.Text label='$' size={35} color='#FFFFFF' style={{ backgroundColor: "#5E8DF7", marginRight: 15 }} />
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 400,
                                    color: "#000"
                                }}
                                    onPress={() => navigateTo('Payment')}

                                >Payment</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", padding: 10, paddingLeft: 20, margin: 10 }}>
                                <Avatar.Icon icon={'phone-outline'} size={35} color='#FFFFFF' style={{ backgroundColor: "#5E8DF7", marginRight: 15 }} />
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 400,
                                    color: "#000"
                                }}
                                    onPress={() => navigateTo('Appointment')}
                                >Telemedicine</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", padding: 10, paddingLeft: 20, margin: 10 }}>
                                <Avatar.Icon icon={'account'} size={35} color='#FFFFFF' style={{ backgroundColor: "#5E8DF7", marginRight: 15 }} />
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 400,
                                    color: "#000"
                                }}
                                    onPress={() => navigateTo('Profile')}
                                >Profile</Text>
                            </View>
                            <View style={{ display: "none", flexDirection: "row", padding: 10, paddingLeft: 20, margin: 10 }}>
                                <Avatar.Icon icon={'receipt'} size={35} color='#FFFFFF' style={{ backgroundColor: "#5E8DF7", marginRight: 15 }} />
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 400,
                                    color: "#000"
                                }}
                                    onPress={() => navigateTo('Home')}
                                >Order</Text>
                            </View>
                            <View style={{ display: "none", flexDirection: "row", padding: 10, paddingLeft: 20, margin: 10 }}>
                                <Avatar.Icon icon={'message-text'} size={35} color='#FFFFFF' style={{ backgroundColor: "#5E8DF7", marginRight: 15 }} />
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 400,
                                    color: "#000"
                                }}
                                    onPress={() => navigateTo('Home')}
                                >Message</Text>
                            </View>
                            <View style={{ display: "none", flexDirection: "row", padding: 10, paddingLeft: 20, margin: 10 }}>
                                <Avatar.Icon icon={'bell'} size={35} color='#FFFFFF' style={{ backgroundColor: "#5E8DF7", marginRight: 15 }} />
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 400,
                                    color: "#000"
                                }}
                                    onPress={() => navigateTo('Home')}
                                >Notification</Text>
                            </View>
                        </ScrollView>

                    </View>
                </Portal > : <></>

        }
    </>

}

export default MyDrawer;
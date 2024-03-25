import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Badge, Button, Drawer, Icon, Menu } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import MyDrawer from './MyDrawer';
import { useNavigation } from '@react-navigation/native';
import { signoutUser } from '../store/User';

const CustomMenu = () => {

    const [showDrawer, setShowDrawer] = useState(false);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation()

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);


    const moveToHome = () => {
        setVisible(false);
        navigation.navigate("Home");

    }
    const signout = () => {
        dispatch(signoutUser({}));
    }
    const showSidebar = () => {
        setShowDrawer(true);
        setVisible(false);
    }

    return (
        <>
            <MyDrawer showDrawer={showDrawer} onHide={() => setShowDrawer(false)} />

            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Button onPress={openMenu}>
                    <MaterialCommunityIcon name={'dots-vertical'} size={25} color={'#858AAB'} />
                </Button>}
            >
                <Menu.Item onPress={moveToHome} title="Home" />
                <Menu.Item onPress={signout} title="Logout" />
                <Menu.Item onPress={showSidebar} title="Menu" />
                {/* <Menu.Item onPress={moveToSignup} title="Signup" /> */}
            </Menu>
        </>
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

export default CustomMenu;
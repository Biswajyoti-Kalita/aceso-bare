const { View, Text, Image, StyleSheet } = require("react-native");
import { StatusBar } from 'expo-status-bar';
import css from '../common/css';
import { useEffect } from 'react';
import api from '../services/API';
import storage from '../services/StorageService';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/Splash';
import { signinUser } from '../store/User';
const logo = require("./../assets/splash-icon.png");

const SplashScreen = () => {

    const dispatch = useDispatch();
    const loadMasterData = async () => {

        const data = await api.getMasterData();
        await storage.save("masterData", data);
        dispatch(setLoading({ isLoading: false }))
    }
    const loadDefault = () => {
        const savedUser = storage.getKeyData("userAuth");
        savedUser.then((res) => {
            console.log({ res }, res.auth);
            if (res && res.auth) {
                dispatch(signinUser(res));
            }
        });
        loadMasterData();
    }
    useEffect(() => {
        setTimeout(loadDefault, 500);
    }, [])

    return (
        <View style={css.splashScreen}>
            <StatusBar style='light'></StatusBar>
            <Image source={require("./../assets/aceso.png")} width={300} height={150} />
            <View style={styles.circleOne}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    circleOne: {
        // backgroundColor: 'rgb(255,255,255)', 
        borderColor: '#AAA',
        borderCurve: "circular",
        left: 50,
        opacity: 0.28,
        height: 415,
        width: 415,
        borderRadius: 415,
        position: "absolute",

    }
});

export default SplashScreen;
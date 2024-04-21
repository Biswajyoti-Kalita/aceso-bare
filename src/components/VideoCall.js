import { OTPublisher, OTSession, OTSubscriber } from 'opentok-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


const VideoCall = (props) => {
    const [creds, setCreds] = useState(null);

    useEffect(() => {
        console.log("\n\n\n video call params")
        console.log(props.route.params);
        setCreds(props.route.params);
    }, [])

    useEffect(() => {
        console.log({ creds });
        if (creds)
            console.log("creds.apiKey", creds.apiKey);
    }, [creds])

    return (
        <View style={{
            width: "100%",
            flex: 1
        }}>
            {
                creds && creds.apiKey && <View style={{
                    width: "100%",
                    flex: 1
                }} >
                    <OTSession apiKey={creds.apiKey + ""} sessionId={creds.sessionID} token={creds.token}>
                        <OTPublisher style={{ width: "100%", minHeight: 300, zIndex: 5 }} />
                        <OTSubscriber style={{ width: "100%", top: 0, minHeight: 300 }} />
                    </OTSession>
                    {/* <OTSession apiKey={"46337942"} sessionId={"1_MX40NjMzNzk0Mn5-MTcxMzQ1MzE3MTMwN34vcHRDdVlzUlNuQ0sxV1hDTThkOE51U2l-fn4"} token={"T1==cGFydG5lcl9pZD00NjMzNzk0MiZzaWc9ZmYxMjc2NmJmZTcyNDhjMWM2ZDEwODhiYjZlNmFkNGY3NGU0ZTYwMjpzZXNzaW9uX2lkPTFfTVg0ME5qTXpOemswTW41LU1UY3hNelExTXpFM01UTXdOMzR2Y0hSRGRWbHpVbE51UTBzeFYxaERUVGhrT0U1MVUybC1mbjQmY3JlYXRlX3RpbWU9MTcxMzQ1MzY0NSZub25jZT01NDgyOCZyb2xlPVBVQkxJU0hFUg=="}>
                        <OTPublisher style={{ width: 100, height: 100 }} />
                        <OTSubscriber style={{ width: 100, height: 100 }} />
                    </OTSession> */}
                </View>
            }
        </View>
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

export default VideoCall;
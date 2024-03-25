import { CardField, StripeProvider, Token, createPaymentMethod, createToken } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { store } from '../store/Store';
import api from '../services/API';
import MySnackbar from './MySnackbar';


const StripePayment = ({ publishableKey, staffId, appointmentTypeId, locationId = 1, serviceLocationId = 1, appointmentDateTime, roomId = null, isPrepaid = null, hideModalSuccess, fee = 0 }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [orderCompleted, setOrderCompleted] = useState(false);
    const [message, setMessage] = useState("");
    const [cardDetails, setCardDetails] = useState({});
    const [currentuser, setCurrentuser] = useState({});


    const createCardToken = async (card) => {
        //console.log({ card });
        const token = await createToken({
            type: "Card",
            //name: currentuser ? currentuser.profile ? currentuser.profile.firstName : "" : "",
            name: "John",
            //currency: "ngn"
            currency: "usd"
        });
        console.log({ token });
        setCardDetails({ ...token });

    }

    const payAndBook = async () => {

        console.log({ cardDetails })
        if (cardDetails && cardDetails.error) {
            setMessage(cardDetails.error.localizedMessage);
            return;
        }



        setIsLoading(true);

        const currentuser = store.getState().user;
        console.log({ currentuser });

        const startDateTime = new Date(appointmentDateTime);
        const endDateTime = new Date(appointmentDateTime);

        endDateTime.setMinutes(endDateTime.getMinutes() + 30);



        let obj = [
            {
                PatientAppointmentId: null,
                AppointmentTypeID: appointmentTypeId,
                AppointmentStaffs: [{ StaffId: staffId, IsDeleted: false }],
                PatientID: currentuser?.profile?.id,
                ServiceLocationID: serviceLocationId,
                StartDateTime: startDateTime,
                EndDateTime: endDateTime,
                IsTelehealthAppointment: false,
                IsExcludedFromMileage: false,
                IsDirectService: false,
                Mileage: null,
                DriveTime: null,
                latitude: 0,
                longitude: 0,
                Notes: "",
                IsRecurrence: false,
                RoomId: roomId,
                RecurrenceRule: null,
                DepartmentID: 26,
                LocationID: locationId,
                IsPrepaidAppointment: isPrepaid,
                ClaimID: 2304,
                CustomAddressID: null,
                CustomAddress: null,
                PatientAddressID: null,
                OfficeAddressID: 16,
            },
        ];


        console.log(obj);
        let applyPaymentObj = {
            "PaymentTypeId": 18,
            "DescriptionTypeId": 2,
            "CustomReferenceNumber": "",
            "PatientId": currentuser.profile.id,
            "Amount": fee,
            "PaymentDate": new Date().toISOString().substring(0, 10),
            "Claims": null,
            "ServiceCodeIds": "6",
            "IsPrepaid": true,
            "SelectedStaffs": staffId
        };
        console.log({ applyPaymentObj });
        const applyPayment = await api.applyPayment(applyPaymentObj);
        if (applyPayment && applyPayment.message) {
            setMessage(applyPayment.message);
        }
        const result = await api.saveAppointment(obj);
        console.log(result);

        if (result.statusCode != 200) {
            setTimeout(() => { setMessage(result.message); setIsLoading(false); }, 2200);

        }
        else {
            setOrderCompleted(true);
            setIsLoading(false);
        }

    }

    useEffect(() => {

        const user = store.getState().user;
        console.log({ user });
        setCurrentuser({ ...user });

    }, [])


    return (
        <StripeProvider
            publishableKey={publishableKey}
        >
            {
                orderCompleted ?
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#FFF",
                        padding: 20,
                        paddingVertical: 80,
                    }}>

                        <Avatar.Icon icon={'check'} color='#FFF' size={100} style={{ backgroundColor: "#6e99f8" }} />
                        <Text style={{
                            color: "#949494",
                            fontSize: 20,
                            fontWeight: 400,
                            lineHeight: 31,
                        }}>
                            Order Completed Successfully! Thank you and see you soon
                        </Text>
                        <View style={{
                            backgroundColor: "#4F81FF",
                            width: 100,
                            marginVertical: 30,
                            padding: 10,
                            borderRadius: 20
                        }}
                            onTouchEnd={hideModalSuccess}
                        >
                            <Text style={{
                                color: "#FFF",
                                textAlign: "center"
                            }}>OKAY</Text>
                        </View>
                    </View>
                    :
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#FFF",
                        padding: 20
                    }}>
                        <Text style={{
                            color: "#242B42",
                            fontSize: 20,
                            fontWeight: 700,
                            lineHeight: 28
                        }}>Card details</Text>
                        <CardField
                            postalCodeEnabled={false}
                            autofocus
                            placeholder={{
                                number: '4242 4242 4242 4242',
                            }}
                            cardStyle={{
                                backgroundColor: '#FFFFFF',
                                textColor: '#000000',
                            }}
                            style={{
                                width: '100%',
                                height: 50,
                                marginVertical: 30,
                            }}
                            onCardChange={(cardDetails) => {
                                //console.log('cardDetails', cardDetails);
                                createCardToken(cardDetails);
                            }}
                            onFocus={(focusedField) => {
                                console.log('focusField', focusedField);
                            }}
                        />
                        {
                            isLoading ? <ActivityIndicator /> : <View onTouchEnd={payAndBook}>
                                <Text style={{
                                    textAlign: "center",
                                    backgroundColor: "#4F81FF",
                                    padding: 10,
                                    color: "#FFF",
                                    borderRadius: 20,
                                    width: 150
                                }}>Pay now</Text>
                            </View>

                        }
                    </View>
            }
            {
                message && message.length ? <MySnackbar message={message} setMessage={setMessage} />
                    : <></>
            }
        </StripeProvider>

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

export default StripePayment;
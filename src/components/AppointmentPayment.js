import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { StyleSheet, Text, View } from 'react-native';

const AppointmentPayment = () => {
    const { redirectToCheckout } = useStripe();


    const handleCheckout = async () => {
        try {

            const result = await redirectToCheckout({
                lineItems: [{ price: '1000', quantity: 1 }],
                mode: 'payment',
            });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <StripeProvider publishableKey='pk_test_51JXO8sSAgQwqbqdwlECMBapaO6czUbAJQcIvbiXcH448A3D4WYNmRbXXxkujr1wFjQEASl5Kg Gp8RlrI9PxbB4fX00GUEjsMu2'>
            <View onTouchEnd={handleCheckout} style={{
                flex: 1,
                justifyContent: "center", alignItems: "center"
            }}>
                <Text onTouchEnd={handleCheckout} >Pay now</Text>
            </View>
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

export default AppointmentPayment;
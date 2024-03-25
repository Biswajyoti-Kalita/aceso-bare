import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TopHeaderV2 from './TopHeaderV2';
import { Row, Rows, Table, TableWrapper } from 'react-native-reanimated-table';
import { useEffect, useState } from 'react';
import { store } from '../store/Store';
import api from '../services/API';

const Payment = () => {

    const [paymentData, setPaymentData] = useState([]);
    const tableHeader = ['Claim', 'DOS', 'Total Amount (₦)', 'INS Paid', 'ins adj'];
    const widthArr = [60, 80, 140, 80, 70];
    const loadDefault = async () => {

        const currentuser = store.getState().user;
        console.log({ currentuser });

        const payments = await api.getPatientLedger({
            id: currentuser.profile?.id,
            pageNumber: 1,
            pageSize: 100,
            token: currentuser?.token
        });
        if (payments && payments.data) {
            let temp = [];
            payments.data.map((item) => {
                const data = [
                    item.claimId,
                    item.dos.substring(0, 10),
                    item.totalAmount,
                    item.insurancePayments,
                    item.insuranceAdjustments
                ];
                temp.push(data)
            });
            setPaymentData(temp);
        }

    }
    useEffect(() => {
        loadDefault();
    }, [])

    return (
        <View>
            <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.19)']}
                style={{
                    position: 'absolute',
                    right: 100,
                    top: -100,
                    borderRadius: 315,
                    width: 315,
                    height: 315
                }}
            />
            <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.19)']}
                style={{
                    position: 'absolute',
                    right: -100,
                    top: -300,
                    borderRadius: 515,
                    width: 515,
                    height: 515
                }}
            />
            {/* <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(94, 141, 247, 0.09)']}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    borderRadius: 415,
                    width: 415,
                    height: 415
                }}
            /> */}
            <TopHeaderV2 />
            <Text style={{
                textAlign: "center",
                color: "#242B42",
                lineHeight: 28,
                fontWeight: 700,
                marginTop: 20
            }}>Payment</Text>
            <View style={{ marginTop: 30, backgroundColor: "#FFF", zIndex: 50 }}>



                <ScrollView horizontal={true}>
                    <View>
                        <Table>
                            <Row data={tableHeader} style={styles.head} widthArr={widthArr} textStyle={styles.headText} />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table>
                                {
                                    paymentData.map((rowData, index) => (
                                        <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={widthArr}
                                            style={index % 2 == 1 ? styles.eventext : {}}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>






                {/* 
                <ScrollView horizontal={true}>
                    <Table borderStyle={{ borderWidth: 0, borderColor: '#c8e1ff' }}>
                        <Row data={tableHeader} style={styles.head} textStyle={styles.headText} />
                        <TableWrapper>
                            {
                                paymentData?.map((item, index) => (
                                    <Row
                                        style={index % 2 == 1 ? styles.eventext : {}}
                                        key={index}
                                        data={item}
                                        textStyle={styles.text} />
                                ))
                            }
                        </TableWrapper>
                    </Table>

                </ScrollView> */}
                <View style={{ height: 400 }}></View>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 60, backgroundColor: '#5E8DF7' },
    headText: { margin: 6, fontSize: 12, textTransform: "uppercase", color: "#FFF", textAlign: "center", paddingHorizontal: 4, },
    text: { margin: 6, fontSize: 10, fontWeight: 400, color: "#1B1818", lineHeight: 16, textAlign: "center" },
    eventext: { margin: 6, fontSize: 10, fontWeight: 400, color: "#1B1818", lineHeight: 16, textAlign: "center", backgroundColor: "#F3F7FE" }
});

export default Payment;
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

const BSelect = ({ placeholder, value, items, onselect }) => {
    const [valueFound, setValueFound] = useState(null);
    const [selectItems, setSelectItems] = useState(items);
    const [placeHolderData, setPlaceHolderData] = useState({
        label: 'Select item',
        value: ''
    });


    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const selected = (ph) => {
        console.log("selected ", ph);
        onselect(ph.value);
        hideModal();
        setValueFound(ph.label)
    }

    useEffect(() => {

        console.log("use effect ", value, items);
        if (items && items.length) {
            setSelectItems(items);
        }

        if (placeholder) {
            if (placeholder.hasOwnProperty('label') && placeholder.hasOwnProperty('value')) {
                setPlaceHolderData({ ...placeholder })
            }
        }

        if (value != null && value != undefined) {
            const checkExistOnItem = items.find(item => item.value == value);
            console.log({ checkExistOnItem });
            if (checkExistOnItem) {
                setValueFound(checkExistOnItem.label);
            }
        }



    }, [])

    return (
        <View>
            <View onTouchEnd={showModal}>
                {
                    valueFound ? <Text>{valueFound}</Text> : <Text style={{ color: "#aaa" }}>{placeHolderData.label}</Text>
                }
            </View>
            <Portal>

                <Modal visible={visible} onDismiss={hideModal}>
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <View style={{ backgroundColor: "#FFF", padding: 10, borderRadius: 5, width: "90%", maxHeight: 400 }}>
                            <ScrollView>

                                {
                                    <View style={{ marginVertical: 10 }} onTouchEnd={() => selected(placeHolderData)}>
                                        <Text style={{ lineHeight: 30, fontSize: 14 }}>{placeHolderData.label}</Text>
                                    </View>

                                }
                                {
                                    selectItems?.map((item, index) => (
                                        <View key={index} style={{ marginVertical: 10 }} onTouchEnd={() => selected(item)}>
                                            <Text style={{ lineHeight: 30, fontSize: 14 }}>{item.label}</Text>
                                        </View>
                                    ))
                                }
                            </ScrollView>

                        </View>

                    </View>
                </Modal>
            </Portal>

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

export default BSelect;
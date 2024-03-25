import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const DepartmentBlock = ({ departments }) => {

    const [deps, setDeps] = useState(departments)
    const navigation = useNavigation();

    const [splittedDepartments, setSplittedDepartments] = useState([]);


    const selectedDepartment = (item) => {
        console.log("selectedDepartment ", item);
        navigation.navigate("find-doctor-auth", {
            department: item
        })

    }

    const createArrayOfArrays = (originalArray, chunkSize) => {
        const result = [];
        for (let i = 0; i < originalArray.length; i += chunkSize) {
            result.push(originalArray.slice(i, i + chunkSize));
        }
        return result;
    };
    useEffect(() => {

        // console.log("\n\n loading departments ", departments.length)

        if (deps) {
            const newArray = createArrayOfArrays(deps, 3);
            console.log({ newArray })
            setSplittedDepartments(newArray);
        }

    }, [])





    return (
        <View>
            {
                splittedDepartments?.map((blocks, index) => (
                    <View style={styles.container}
                        key={index}
                    >
                        {
                            blocks?.map((item, ind) => (
                                <View style={styles.block} key={ind} onTouchEnd={() => selectedDepartment(item)}>
                                    <Image
                                        source={{
                                            uri: item["imageBase64"]
                                        }}
                                        style={{ width: 100, height: 100 }}
                                    />
                                    {/* <Text></Text> */}
                                </View>
                            ))
                        }

                    </View>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10
    },
    block: {
        width: 100,
        height: 100,
        backgroundColor: "#F1F5FF",
        borderRadius: 13,
        padding: 10,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    text: {
        color: "#606060",
        fontSize: 10,
        lineHeight: 13
    }
});

export default DepartmentBlock;
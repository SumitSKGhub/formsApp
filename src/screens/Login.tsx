import { Formik } from "formik";
import * as Yup from 'yup'
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }: any) => {


    const [user, setUser] = useState('')


    const getUser = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value != null) {
                console.log('Retrieved data: ', value);
                setUser(value);
            }
        }
        catch (error) {
            console.error("Error: ", error);
        }
    }


    useEffect(() => {
        getUser("Email");
    }, []);


    const validate = Yup.object().shape({
        email: Yup.string().required('Enter email'),
        password: Yup.string()
            .min(4, 'Should be min of 4 characters')
            .max(16, 'Should be max of 16 characters')
            .required('Enter password')
    })


    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <SafeAreaView style={styles.appContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Login</Text>
                    <Formik
                        initialValues={{ email: user, password: '' }}
                        enableReinitialize
                        validationSchema={validate}
                        onSubmit={(values) => {
                            console.log('Submitted: ', values);
                            // showAlert()
                            Alert.alert(
                                'Welcome!',
                                'Sign up was successful.');
                        }

                        }
                    >
                        {({
                            values,
                            errors,
                            touched,
                            isValid,
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            handleReset,
                            /* and other goodies */
                        }) => (
                            <View>


                                <View style={styles.inputWrapper}>
                                    <View style={styles.inputColumn}>
                                        <Text style={styles.heading}>Email</Text>
                                        {touched.email && errors.email && (
                                            <Text style={styles.errorText}>
                                                {errors.email}
                                            </Text>
                                        )}

                                    </View>
                                    <TextInput
                                        style={styles.inputStyle}
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        // onBlur={handleBlur('email')}
                                        placeholder="example@mail.com"
                                    //keyboardType="numeric"

                                    />
                                </View>

                                <View style={styles.inputWrapper}>
                                    <View style={styles.inputColumn}>
                                        <Text style={styles.heading}>Password</Text>
                                        {touched.password && errors.password && (
                                            <Text style={styles.errorText}>
                                                {errors.password}
                                            </Text>
                                        )}

                                    </View>
                                    <TextInput
                                        style={styles.inputStyle}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        //onBlur={handleBlur('password')}
                                        placeholder="password123$%^"
                                    //keyboardType="numeric"

                                    />
                                </View>

                                <View style={styles.inputWrapper}></View>
                                <View style={styles.inputWrapper}></View>
                                <View style={styles.inputWrapper}></View>

                                <View style={styles.formActions}>

                                    <Button
                                        title="Submit"
                                        style={styles.primaryBtn}
                                        onPress={() => { handleSubmit() }}
                                    >

                                    </Button>


                                    <TouchableOpacity
                                        style={styles.secondaryBtn}
                                        onPress={() =>
                                            handleReset()
                                        }
                                    ><Text style={styles.secondaryBtnTxt}>Reset</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', margin: '5%' }}>
                                    <Text >Sign up? </Text>
                                    <TouchableOpacity
                                        disabled={!isValid}
                                        onPress={() => {
                                            navigation.navigate('SignUp')
                                        }}
                                    >
                                        <Text >Click here.</Text></TouchableOpacity>
                                </View>
                            </View>

                        )}
                    </Formik>
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}


const styles = StyleSheet.create({

    appContainer: {
        flex: 1,
        backgroundColor: '#f4f7fc',
        padding: 16,
    },
    formContainer: {
        margin: 16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#16213e',
    },
    subTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
        color: '#5DA3FA',
    },
    description: {
        color: '#748a9d',
        marginBottom: 12,
        textAlign: 'center',
        fontSize: 14,
    },
    heading: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    inputWrapper: {
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: 'column',
    },
    inputColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
    },
    inputStyle: {
        padding: 12,
        width: '100%',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#cad5e2',
        backgroundColor: '#f9fafb',
        color: '#333',
        fontSize: 16,
    },
    errorText: {
        fontSize: 12,
        color: '#e63946',
        marginTop: 4,
    },
    formActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    primaryBtn: {
        width: '45%',
        padding: 14,
        borderRadius: 6,
        marginHorizontal: 8,
        backgroundColor: '#1e90ff',
        shadowColor: '#1e90ff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    primaryBtnTxt: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryBtn: {
        width: '45%',
        padding: 14,
        borderRadius: 6,
        marginHorizontal: 8,
        backgroundColor: '#f0f4f7',
        borderWidth: 1,
        borderColor: '#cad5e2',
    },
    secondaryBtnTxt: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#748a9d',
    },
    card: {
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 16,
        backgroundColor: '#ffffff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardElevated: {
        backgroundColor: '#ffffff',
        elevation: 4,
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    generatedPassword: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 12,
        color: '#1e90ff',
        fontWeight: 'bold',
    },
    CheckBox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#16213e',
        borderRadius: 4,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
    },
});

export default LoginScreen;
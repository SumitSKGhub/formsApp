import { Formik } from "formik";
import * as Yup from 'yup'
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }: any) => {

    
    const [user, setUser] = useState('')


    const getUser = async (key:string) =>{
        try{
            const value = await AsyncStorage.getItem(key);
            if(value!=null){
                console.log('Retrieved data: ', value);                
                setUser(value);
            }
        }
        catch(error){
            console.error("Error: ", error);
        }
    }

    
    useEffect(() =>{
        getUser("Email");
    },[]);
    

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
                                        onPress={() =>{handleSubmit()}}
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
    },
    formContainer: {
        margin: 8,
        padding: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 15,
    },
    subTitle: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 2,
    },
    description: {
        color: '#758283',
        marginBottom: 8,
    },
    heading: {
        fontSize: 15,
    },
    inputWrapper: {
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    inputColumn: {
        flexDirection: 'column',
    },
    inputStyle: {
        padding: 8,
        width: '60%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#16213e',
    },
    errorText: {
        fontSize: 12,
        color: '#ff0d10',
    },
    formActions: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    primaryBtn: {
        width: 120,
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 8,
        backgroundColor: '#5DA3FA',
    },
    primaryBtnTxt: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
    },
    secondaryBtn: {
        width: 120,
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 8,
        backgroundColor: '#CAD5E2',
    },
    secondaryBtnTxt: {
        textAlign: 'center',
    },
    card: {
        padding: 12,
        borderRadius: 6,
        marginHorizontal: 12,
    },
    cardElevated: {
        backgroundColor: '#ffffff',
        elevation: 1,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    generatedPassword: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 12,
        color: '#000'
    },
});

export default LoginScreen;
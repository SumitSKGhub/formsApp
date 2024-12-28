import { Formik } from "formik";
import * as Yup from 'yup'
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Button, CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SignUpScreen = ({ navigation }: any) => {


    const [password, setPassword] = useState('');
    const [isPassGenerated, setIsPassGenerated] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    const validate = Yup.object().shape({  ///   !!!!! The form should always have 
        name: Yup.string().required('Enter name'), //  all the validations that are defined here.
        email: Yup.string().required('Enter email'),
        password: Yup.string()
            .min(4, 'Should be min of 4 characters')
            .max(16, 'Should be max of 16 characters')
            .required('Enter password'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], "Password doesn't match!")
            .required('Confirm password')
    })

    const remeber = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
            console.log('Stored!', value);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const resetAll = () => {
        setPassword('')
        setIsPassGenerated(false)

    }

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <SafeAreaView style={styles.appContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Register</Text>
                    <Formik
                        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                        validationSchema={validate}
                        onSubmit={(values) => {
                            console.log('Submitted: ', values);
                            remeber("Email", values.email)
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
                                        <Text style={styles.heading}>Name</Text>
                                        {touched.name && errors.name && (
                                            <Text style={styles.errorText}>
                                                {errors.name}
                                            </Text>
                                        )}

                                    </View>
                                    <TextInput
                                        style={styles.inputStyle}
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        // onBlur={handleBlur('name')}
                                        placeholder="John Doe"
                                    //keyboardType="numeric"

                                    />
                                </View>


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

                                <View style={styles.inputWrapper}>
                                    <View style={styles.inputColumn}>
                                        <Text style={styles.heading}> Confirm Password</Text>
                                        {touched.confirmPassword && errors.confirmPassword && (
                                            <Text style={styles.errorText}>
                                                {errors.confirmPassword}
                                            </Text>
                                        )}

                                    </View>
                                    <TextInput
                                        style={styles.inputStyle}
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        // onBlur={handleBlur('confirmPassword')}
                                        placeholder="password123$%^"
                                    //keyboardType="numeric"

                                    />
                                </View>

                                <View >
                                    <CheckBox
                                        title="Remember me"
                                        checked={isChecked}
                                        style={styles.CheckBox}
                                        onPress={() => { setIsChecked(!isChecked) }}
                                    />
                                </View>

                                <View style={styles.formActions}>

                                    {/* <Button
                                        title="Submit"
                                        style={styles.primaryBtn}
                                        onPress={() => { handleSubmit() }}
                                    >

                                    </Button> */}

                                    <TouchableOpacity
                                        disabled={!isValid}
                                        style={styles.primaryBtn}
                                        onPress={() => {
                                            console.log(values)
                                            handleSubmit()
                                        }}
                                    >
                                        <Text style={styles.primaryBtnTxt}>Submit</Text></TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.secondaryBtn}
                                        onPress={() =>
                                            handleReset()
                                        }
                                    ><Text style={styles.secondaryBtnTxt}>Reset</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', margin: '5%' }}>
                                    <Text >Already have an account? </Text>
                                    <TouchableOpacity
                                        disabled={!isValid}
                                        onPress={() => {
                                            navigation.navigate('Login')
                                        }}
                                    >
                                        <Text style={{color:'#1e90ff'}}>Click here.</Text></TouchableOpacity>
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

export default SignUpScreen;
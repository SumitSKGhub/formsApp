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
                                        onPress={() => { setIsChecked(!isChecked) }}
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

                                    {/* <TouchableOpacity
                                        disabled={!isValid}
                                        style={styles.primaryBtn}
                                        onPress={() => {
                                            console.log(values)
                                            handleSubmit()
                                        }}
                                    >
                                        <Text style={styles.primaryBtnTxt}>Submit</Text></TouchableOpacity> */}
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
    CheckBox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#16213e',
        borderRadius: 4,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SignUpScreen;
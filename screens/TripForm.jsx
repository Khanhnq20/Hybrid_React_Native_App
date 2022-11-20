import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, ScrollView } from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'
import React from 'react'
import { TripSqlite} from '../sqliteHelper/tripSqlite';
import moment from 'moment';
import {MaterialIcons} from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

const tripHelper = new TripSqlite();

const TripSchema = Yup.object().shape({
name: Yup.string()
    .required('Required'),
destination: Yup.string()
    .required('Required'),
date: Yup.string()
    .required('Required'),
});

export default function TripForm({navigation,route}) {
    const {isEdit} = route.params;
    const [show, setShow] = React.useState(false);

    const onDeleteTrip = (id) =>{
        tripHelper.deleteTripById(id);
        return navigation.goBack();
    }

    return (
        <ScrollView>
            <Formik
                enableReinitialize={true}
                initialValues={!isEdit ? {
                name: '',
                destination: '',
                date: '',
                required: 1,
                description:''
                }: {
                    ...route.params.trip.item,
                    date: route.params.trip.item.date,
                }}
                validationSchema={TripSchema}
                onSubmit={(values)=> {
                    if(isEdit){
                        console.log("Submited", values.id);
                        tripHelper.updateTripById(values, (result) =>{
                            navigation.goBack();
                        });
                        return;
                    }
                    tripHelper.insertNewTrip(values, () =>{
                        console.log("inserted successfully");
                        navigation.goBack();
                    });
                }}
            >
            {({handleChange,handleBlur,handleSubmit,values,errors, touched,setFieldValue}) => (
                <View style={styles.container}>
                    <View>
                        <View style={styles.lineRow}>
                            <Text>Name</Text>
                            <Text style={styles.red}>*</Text>
                        </View>
                        <View>
                            <TextInput
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                // onChangeText= {handleChange('name')}
                                style={styles.input}
                                placeholder="enter the trip's name"
                            ></TextInput>
                            {errors.name && touched.name && <Text style={styles.textValidate}>{errors.name}</Text>}
                        </View>
                    </View>
                    <View>
                        <View style={styles.lineRow}>
                            <Text>Destination</Text>
                            <Text style={styles.red}>*</Text>
                        </View>
                        <View>
                            <TextInput
                                id = 'destination'
                                value={values.destination}
                                onChangeText={handleChange('destination')}
                                onBlur={handleBlur('destination')}
                                style={styles.input}
                                placeholder="useless placeholder"
                            ></TextInput>
                            {errors.destination && touched.destination && <Text style={styles.textValidate}>{errors.destination}</Text>}
                        </View>
                    </View>
                    <View>
                        <View style={styles.lineRow}>
                            <Text>Date</Text>
                            <Text style={styles.red}>*</Text>
                        </View>
                        <View style={styles.inline}>
                            <TextInput
                                style={styles.dateInput}
                                value={values.date}
                                onBlur={()=> {
                                    handleBlur('date')
                                }}
                                placeholder="dd/MM/yyyy"
                            >
                            </TextInput>
                                {show && (<DateTimePicker 
                                    // testID='dateTimePicker'
                                    value={new Date()}
                                    // display='default'
                                    // is24Hour={true}
                                    mode="date"
                                    onChange={(e)=>{
                                        setShow(false);
                                        setFieldValue("date", moment(new Date(e.nativeEvent.timestamp)).format("DD/MM/YYYY"));
                                    }}
                                    ></DateTimePicker>)}
                            <TouchableOpacity onPress={() => setShow(true)} 
                            onPressOut={() => setShow(false)}>
                                <Text>
                                    <MaterialIcons
                                        name='date-range' 
                                        size={40}></MaterialIcons>
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {errors.date && touched.date && <Text style={styles.textValidate}>{errors.date}</Text>}
                    </View>
                    <View>
                        <View style={styles.lineRow}>
                            <Text>Require Risks Assessment</Text>
                            <Text style={styles.red}>*</Text>
                        </View>
                    <View>
                        <RadioButton.Group 
                        //     onChange={e => handleChange(e,'name')}
                        onValueChange={newValue => setFieldValue('required',newValue)} 
                        value={values.required === 0 ? 0 : 1}
                        >
                            <View style={styles.radioInline}>
                                <View style={styles.lineRow}>
                                    <RadioButton 
                                        value={1}
                                    />
                                    <Text>Yes</Text>
                                </View>
                                <View style={styles.lineRow}>
                                    <RadioButton
                                    value={0}
                                    />
                                    <Text>No</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>
                    </View>
                        <View>
                            <View style={styles.lineRow}>
                                <Text>Description</Text>
                            </View>
                            <View>
                                <TextInput
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    style={styles.inputArea}
                                    placeholder="useless placeholder"
                                ></TextInput>
                            </View>
                    </View>
                    <View style={styles.justify}>
                        <Button 
                        style={styles.button}
                        onPress={handleSubmit}
                        >Submit</Button>
                    </View>
                    {
                        isEdit && <View style={styles.justify}>
                        <Button 
                        style={styles.buttonDelete}
                        onPress={() => onDeleteTrip(values.id)}
                        >Delete this trip</Button>
                    </View>
                    }
                </View>
            )}
            </Formik>
        </ScrollView>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    lineRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        padding: 12,
        width:200
    },
    input: {
        height: 40,
        marginHorizontal:12,
        marginBottom:12,
        borderWidth: 1,
        padding: 10,
        borderRadius:6
    },
    inline: {
        flexDirection: 'row',
        padding: 12,
        justifyContent:'center',
    },
    red: {
        color: 'red'
    },
    inputArea :{
        height: 100,
        marginHorizontal:12,
        borderWidth: 1,
        padding: 10,
        borderRadius:6
    },
    radioInline: {
        flexDirection:'row',
    },
    button:{
        backgroundColor:'#ffff',
        width:200,
        padding:3,
        margin:30,
        borderWidth:2,
        borderColor:'purple',
        borderRadius:6
    },
    justify:{
        justifyContent:'center',
        alignItems:'center'
    },
    dateInput:{
        width:200,
        height: 40,
        textAlign:'center',
        marginHorizontal:12,
        borderWidth: 1,
        padding: 10,
        borderRadius:6
    },
    textValidate:{
        color:'red',
        textAlign:'center',
    },
        buttonDelete:{
        backgroundColor:'#ffff',
        width:200,
        padding:3,
        marginBottom:30,
        borderWidth:2,
        borderColor:'purple',
        borderRadius:6
    }
});
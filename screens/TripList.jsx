import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import {Button} from 'react-native-paper';
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { TripSqlite } from '../sqliteHelper/tripSqlite';


const tripHelper = new TripSqlite();
export default function TripList({navigation}) {
    const [listTrip,setListTrip] = React.useState([]);
    React.useEffect(()=>{
        fetchData();
        navigation.addListener('focus', () =>{
            fetchData();
        });
        return () =>{
            navigation.removeListener('focus', () =>{});
        }
    },[])

    function fetchData(){
        tripHelper.getTripList((rowResult) => {
            console.log(rowResult);
            setListTrip(rowResult);
        });
    }

    const onDelete = () =>{
    tripHelper.deleteAllTrip(()=>{
        setListTrip([]);
    });
    
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("TripForm", {isEdit: false})} style={styles.addTripBtn}>
                            <Button>Add New Trip</Button>
                    </TouchableOpacity>
                </View>
                <View>
                    <FontAwesome 
                        style={{marginRight:10}}
                        onPress={() => {onDelete()}}
                        name="trash-o" 
                        size={24} color="black" />
                </View>
            </View>
            <View>
                <FlatList
                    data={listTrip}
                    renderItem={(props) =>{
                        return <TouchableOpacity onPress={() => {
                                navigation.navigate("TripForm", {isEdit: true, trip: props});
                            }}>
                            <TripItem {...props.item}></TripItem>
                        </TouchableOpacity>
                    }}
                    keyExtractor={item => item.name}
                ></FlatList>
            </View>
        </View>
    )
}

function TripItem(props) {
    const {id, name, destination, date, required, onPress} = props;
    return <View style={styles.tripItem} onPress={onPress}>
        <View style={{paddingLeft:20}}>
            <Text>{id}</Text>
        </View>
        <View>
            <Text style={{marginBottom:8}}>{name}</Text>
            <Text>{date}</Text>
        </View>
        <View>
            <Text style={{marginBottom:8}}>{destination}</Text>
            <Text>Required: {required === 1 ? "Yes" : "No"}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    tripItem: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        padding: 12,
        borderTopWidth: 2,
        borderBottomWidth:2,
        marginVertical:15
    },
    addTripBtn: {
        backgroundColor:'#ffff',
        borderWidth:2,
        borderColor:'purple',
        borderRadius:6,
        flexGrow:1,
        width: 140,
        marginVertical: 20
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})
import {openDatabase} from 'expo-sqlite';
import { TripColumns, TripSqlite } from './tripSqlite';

export const DATABASE_NAME = 'trip.db';
export const DATABASE_VERSION = "1";


export const databaseContext = openDatabase(DATABASE_NAME, DATABASE_VERSION, undefined, undefined,(db) =>{
    console.log("connected to database");
    db.transaction(context =>{
        context.executeSql(`CREATE TABLE IF NOT EXISTS ${TripColumns.TABLE} (
            ${TripColumns.COLUMN_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
            ${TripColumns.COLUMN_NAME} TEXT NOT NULL,
            ${TripColumns.COLUMN_DESTINATION} TEXT NOT NULL,
            ${TripColumns.COLUMN_REQUIRED} BOOL NOT NULL,
            ${TripColumns.COLUMN_DESCRIPTION} TEXT NOT NULL,
            ${TripColumns.COLUMN_DATE} TEXT NOT NULL
        )`
        , []
        , () => {
            console.log("created table trip");
        }, (_, error) =>{
            console.log("create trip table failed", error);
            return false;
        });
    })
});

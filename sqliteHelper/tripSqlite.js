import {databaseContext} from './sqliteHelper';

export const TripColumns = {
    TABLE: "trip",
    COLUMN_ID: "id",
    COLUMN_NAME: "name",
    COLUMN_DESTINATION: "destination",
    COLUMN_DATE: "date",
    COLUMN_REQUIRED: "required",
    COLUMN_DESCRIPTION: "description"
}

export class TripSqlite {

    getTripList(callback){
        const query = `SELECT * FROM ${TripColumns.TABLE}`;

        databaseContext.exec([
            {
                sql: query,
                args: []
            }
        ], true, (error, resultSet) =>{
            console.log(resultSet);
            if(error){
                console
                .error("Failed to get trip list", error);
            }
            if(typeof callback === 'function'){
                callback(resultSet[0].rows);
            }
        })
    }

    insertNewTrip(newTrip, callback){
        const query = `INSERT INTO ${TripColumns.TABLE} (
            ${TripColumns.COLUMN_NAME},
            ${TripColumns.COLUMN_DESTINATION},
            ${TripColumns.COLUMN_DATE},
            ${TripColumns.COLUMN_REQUIRED},
            ${TripColumns.COLUMN_DESCRIPTION}
        ) VALUES (?,?,?,?,?)`
        databaseContext.exec([{
            sql : query,
            args:[newTrip.name,newTrip.destination
                ,newTrip.date,newTrip.required,newTrip.description]
        }], false, (error,resultSet) =>{
            if(error){
                console.error(error);
                return;
            }
            if(typeof callback === 'function'){
                console.log(resultSet);
                callback(resultSet);
            }
        });
    }

    updateTripById(newTrip, callback){
        const query = `UPDATE ${TripColumns.TABLE}
        SET ${TripColumns.COLUMN_NAME} = ?,
            ${TripColumns.COLUMN_DESTINATION} = ?,
            ${TripColumns.COLUMN_DATE} = ?,
            ${TripColumns.COLUMN_REQUIRED} = ?,
            ${TripColumns.COLUMN_DESCRIPTION} = ?
        WHERE ${TripColumns.COLUMN_ID} = ${newTrip.id}` 
        databaseContext.exec([{
            sql : query,
            args : [newTrip.name, newTrip.destination
                ,newTrip.date, newTrip.required, newTrip.description]
        }], false, (error,resultSet) =>{
            if(error){
                console.error(error);
                return;
            }
            if(typeof callback === 'function'){
                callback(resultSet);
            }
        });
    }

    deleteTripById(id, callback) {
        const query = `DELETE FROM ${TripColumns.TABLE} WHERE ${TripColumns.COLUMN_ID} = ${id}`;
        databaseContext.exec([{
            sql: query,
            args: []
        }], false, (error, result) =>{
            if(error){
                console.error(error);
                return;
            }
            if(typeof callback === 'function'){
                callback(result);
            }
        })
    }

    deleteAllTrip(callback) {
        const query = `DELETE FROM ${TripColumns.TABLE}`;

        databaseContext.exec([{
            sql: query,
            args: []
        }], false, (error, result) =>{
            if(error){
                console.error(error);
                return;
            }
            if(typeof callback === 'function'){
                callback(result);
            }
        })
    }
}
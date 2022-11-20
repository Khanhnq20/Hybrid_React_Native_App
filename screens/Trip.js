export class Trip {
    constructor(id, name, destination, date, required, description){
        this.id = id;
        this.name = name;
        this.description = description;
        this.destination = destination;
        this.date = date;
        this.required = required;
    }

    setTrip(id, name, destination, date, required, description){
        this.id = id;
        this.name = name;
        this.description = description;
        this.destination = destination;
        this.date = date;
        this.required = required;
    }
}
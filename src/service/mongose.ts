import mongoose from "mongoose";
import { URL_DATABASE } from "../config";

mongoose.connect(URL_DATABASE).then(mon => mon.set('strictQuery', true)).
    catch(error => console.log(error));


export {
    mongoose
}
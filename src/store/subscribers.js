import  store from "./index";
import axios from "axios";
import { getData } from "../utils/localStorage";

store.subscribe((mutation) =>{
    if (mutation.type == "auth/SET_TOKEN" && mutation.payload) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${getData("token")}`;
    }
}); 
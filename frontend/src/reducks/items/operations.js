import { fetchItemsAction } from "./actions";
import API from "../../API";

const api = new API();

export const fetchItems=(category)=>{
    return async(dispatch)=>{
        return api.getItems(category)
            .then((items)=>{
                dispatch(fetchItemsAction(items))
            }).catch((error)=>{
                alert("Failed to connect API:/items/")
            })
    }
}
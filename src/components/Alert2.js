import React, { useContext } from "react";
import alertContext from "../context/alertContext/AlertContext";

export const Alert2 = () => {

    const alerturmil = useContext(alertContext)
    const { alert } = alerturmil
    // console.log("aaaa", alert)

    const capitalize = (word) => {
        if (word === "danger") {
            word = "error"
        }
        const lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }

    return (
        <div style={{ height: "50px", zIndex: '100' }}>
            {alert && (<div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(alert.type)}</strong>:&nbsp;{capitalize(alert.msg)}
            </div>)}
        </div>
        // <div class="toast-container p-3" id="toastPlacement">
        //     {alert && (<div class="toast">
        //         <div class="toast-header">
        //             <img src="..." class="rounded me-2" alt="..." />
        //             <strong class="me-auto">{capitalize(alert.type)}</strong>
        //             {/* <small>11 mins ago</small> */}
        //         </div>
        //         <div class="toast-body">
        //             {capitalize(alert.msg)}
        //         </div>
        //         <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        //     </div>)}
        // </div>





    );
};

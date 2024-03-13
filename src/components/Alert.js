import React from "react";

export const Alert = (props) => {
  // console.log("alert", props)
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error"
    }
    const lower = word.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }

  return (
    <div style={{ height: "50px" }}>
      {props.alert && (<div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)}</strong>:&nbsp;{capitalize(props.alert.msg)}
      </div>)}
    </div>
    // <div class="toast-container p-3" id="toastPlacement">
    //   {props.alert && (<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    //     <div class="toast-header">
    //       {/* <img src="..." class="rounded me-2" alt="..."> */}
    //       <strong class="me-auto">{props.alert.type}</strong>
    //       <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    //     </div>
    //     <div class="toast-body">
    //       {props.alert.msg}        </div>
    //   </div>
    //   )}
    // </div>


  );
};

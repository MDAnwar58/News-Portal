import React from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function Alert(options) {
   const {
      type = "success",
      msg = "This is a toast",
      gravity = "top",
      position = "right",
      close = true,
      newWindow = true,
      destination = "",
      duration = 3000,
      stopOnFocus = true,
   } = options;
   return Toastify({
      text: msg,
      duration,
      destination: destination ? destination : undefined,
      newWindow,
      close,
      gravity: gravity, // `top` or `bottom`
      position: position, // `left`, `center` or `right`
      stopOnFocus, // Prevents dismissing of toast on hover
      style: {
         //  background: "linear-gradient(to right, #00b09b, #96c93d)",
         background:
            type === "success"
               ? "linear-gradient(to right, #00b09b, #96c93d)"
               : "linear-gradient(to right,rgb(255, 79, 79),rgb(255, 79, 79))",
      },
      onClick: function () {}, // Callback after click
   }).showToast();
}

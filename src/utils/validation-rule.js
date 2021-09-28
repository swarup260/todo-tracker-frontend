const rules = {
    emailRules : [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 50 || "Max 50 characters",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }, 
    ],
    inputRules : [(value) => !!value || "Required."]
}

export {
    rules
}
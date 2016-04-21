export function PlanModel(){
    return {
        id: "",
        name: "",
        description: "",
        type: "INFINITE",
        payment_definitions: [],
        merchant_preferences: new MerchantPreferences()
    }
}

export function PaymentDefinition(){
    return {
        name: "",
        type: "REGULAR",
        frequency_interval: "1",
        frequency: "MONTH",
        cycles: "0",
        amount: new Amount(),
        tax: new Amount(),
        shipping: new Amount()
    };
}

export function MerchantPreferences(){
    return {
        setup_fee: new Amount(),
        cancel_url: "",
        return_url: "",
        max_fail_attempts: 0,
        auto_bill_amount: "YES",
        initial_fail_amount_action: "CANCEL"
    };
}

export function Amount() {
    return {
        currency: "EUR",
        value: 0
    };
}
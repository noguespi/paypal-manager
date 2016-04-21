import paypal from 'paypal-rest-sdk';
import creds from './credentials';

console.time("paypal.configure");
paypal.configure(creds);
console.timeEnd("paypal.configure");

var list_billing_plan = {
    'status': 'ACTIVE',
    'total_required': 'yes'
};

paypal.billingPlan.list(list_billing_plan, function (error, billingPlan) {
    if (error) {
        throw error;
    } else {
        console.log(billingPlan);
    }
});
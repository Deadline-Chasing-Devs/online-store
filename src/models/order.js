class Order{
    constructor(order_id,customer_name,customer_email,customer_address,customer_contact_num,status,date_time) {
        this.order_id = order_id;
        this.customer_name = customer_name;
        this.customer_email = customer_email;
        this.customer_address = customer_address;
        this.customer_contact_num = customer_contact_num;
        this.status = status;
        this.date_time = date_time;
    }
}

export default Order;
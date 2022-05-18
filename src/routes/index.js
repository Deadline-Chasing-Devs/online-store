import cartRouter from "./cart.js";
import checkoutRouter from "./checkout.js";
import dashboardRouter from "./dashboard.js";
import editItemRouter from "./editItem.js";
import homepageRouter from "./homepage.js";
import itemRouter from "./item.js";
import loginRouter from "./login.js";
import logoutRouter from "./logout.js";
import newItemRouter from "./newItem.js";
import orderRouter from "./order.js";
import ordersRouter from "./orders.js";
import productsRouter from "./products.js";
import searchRouter from "./search.js";

const handler = (pool) => {
    return {
        cartRouter: cartRouter(pool),
        checkoutRouter: checkoutRouter(pool),
        dashboardRouter: dashboardRouter(pool),
        editItemRouter: editItemRouter(pool),
        homepageRouter: homepageRouter(pool),
        itemRouter: itemRouter(pool),
        loginRouter: loginRouter(pool),
        logoutRouter: logoutRouter(pool),
        newItemRouter: newItemRouter(pool),
        orderRouter: orderRouter(pool),
        ordersRouter: ordersRouter(pool),
        productsRouter: productsRouter(pool),
        searchRouter: searchRouter(pool),
    };
};

export default handler;

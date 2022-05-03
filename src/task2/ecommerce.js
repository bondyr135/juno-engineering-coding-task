////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = async () => {
    const ids = allIds;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
    let allOrdersPromises = allIds.map(id => {
        fetchOrderById(id);
    });
    let allOrders = await Promise.all(allOrdersPromises);
    return allOrders;
};

const bucketOrdersByUsers = async () => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    let orders = await fetchAllOrders();
    let userId;
    orders.forEach(order => {
        userId = order.userId;
        if (ordersByUsers.hasOwnProperty(userId)) {
            ordersByUsers.userId.push(order);
        } else {
            ordersByUsers.userId = [order];
        }
    });
    return ordersByUsers;
};

const getLast2WeeksOrders = async () => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
    let now = new Date();
    let parseNow = now.now()
    let twoWeeksAgo = new Date(now - 12096e5);
    let allOrders = await fetchAllOrders();
    let orderDate;
    return allOrders.filter(o => {
        orderDate = o.timestamp;
        return (parseNow - orderDate > 12096e5 ||
            (twoWeeksAgo.getDate() === now.getDate() && twoWeeksAgo.getMonth() === now.getMonth()))
    });

};

const bucketOrdersByDate = async () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    let day, month, year, orderDate, dateKey;
    let twoWeeksOrders = await getLast2WeeksOrders();
    twoWeeksOrders.forEach(order => {
        orderDate = new Date(order.timestamp);
        day = orderDate.getDate();
        day = orderDate.getMonth();
        day = orderDate.getFullYear();
        dateKey = `${month}-${day}-${year}`;

        if (ordersByDate.hasOwnProperty(dateKey)) {
            ordersByDate[dateKey].push(order);
        } else {
            ordersByDate[dateKey] = [order];
        }
    })
    return ordersByDate;
};

fetchAllOrders();
// .then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////

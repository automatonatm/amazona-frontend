import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../../components/utils/LoadingBox";
import MessageBox from "../../components/utils/MessageBox";
import {useNavigate} from "react-router-dom";
import {getAllOrders} from "../../store/actions/orderActions";
import currentFormatter from "../../components/utils/currencyFormmater";



const OrdersScreen = () => {

    const {loading, error, orders} = useSelector(state => state.adminOrders)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getAllOrders())

    }, [dispatch])

    return (
        <div>
            <h1>All Orders</h1>
            {loading ? (<LoadingBox/>)  : error ? (<MessageBox variant='danger'>{error}</MessageBox>) :
                (
                    <div>
                        {orders.length <= 0 ? (
                            <MessageBox>No Orders Yet</MessageBox>
                        )  : (
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.user.name}</td>
                                        <td>{order.createdAt.substring(0,10)}</td>
                                        <td>{currentFormatter(order.totalPrice)}</td>
                                        <td>{order.isPaid ? order.payedAt.substring(0,10) : 'No' }</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'No' }</td>
                                        <td>
                                            <button type="button" className="small" onClick={() => navigate(`/order/${order.id}`)}>Details</button>
                                            <button type="button" className="small" onClick={() =>  {}}>Delete</button>
                                        </td>
                                    </tr>
                                )) }
                                </tbody>

                            </table>
                        )}
                    </div>

                )
            }
        </div>
    );
};

export default OrdersScreen;

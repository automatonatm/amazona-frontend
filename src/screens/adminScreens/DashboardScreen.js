import React, {useEffect} from 'react';
import LoadingBox from "../../components/utils/LoadingBox";
import MessageBox from "../../components/utils/MessageBox";
import currentFormatter from "../../components/utils/currencyFormmater";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersSummary} from "../../store/actions/orderActions";
import {Chart} from "react-google-charts"

const DashboardScreen = () => {

    const {loading, error, summary} = useSelector(state => state.ordersStats)

    const dispatch = useDispatch()


    useEffect(() => {

            dispatch(getOrdersSummary())
    }, [dispatch])

    return (
        <div>
            <div className="row">

                <h1>Dashboard</h1>
            </div>

                {loading ? (<LoadingBox/>) : error ? (<MessageBox variant='danger'>{error}</MessageBox>) : (
                    <>
                        <div>
                            {summary && (
                                <ul className="row summary">
                                    <li>
                                        <div className="summary-title color1">
                                    <span>
                                        <i className="fa fa-users"></i>Users
                                    </span>
                                        </div>
                                        <div className="summary-body">
                                            {summary.users[0].totalUser}
                                        </div>
                                    </li>


                                    <li>
                                        <div className="summary-title color2">
                                    <span>
                                        <i className="fa fa-shopping-cart"></i>Orders
                                    </span>
                                        </div>
                                        <div className="summary-body">
                                            {summary.orders[0] ? summary.orders[0].totalOrders : 0}
                                        </div>
                                    </li>




                                    <li>
                                        <div className="summary-title color3">
                                    <span>
                                        <i className="fa fa-money"></i>Total Sales
                                    </span>
                                        </div>
                                        <div className="summary-body">
                                            {summary.orders[0] ? currentFormatter(summary.orders[0].totalSales) : 0}
                                        </div>
                                    </li>


                                </ul>
                            )}

                        </div>

                        <div>
                            <h2>Sales Summary</h2>
                            {
                                summary.dailyOrders.length === 0 ? (
                                    <MessageBox>No sales</MessageBox>
                                ) : (
                                    <Chart
                                        width="100%"
                                        height="400px"
                                        chartType="AreaChart"
                                        loader={<div>Loading Data</div>}
                                        data={[
                                            ['Dates', "Sales"],

                                            ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                                        ]}
                                    />
                                )
                            }
                        </div>


                        <div>
                            <h2>Category</h2>
                            {
                                summary.productCategories.length === 0 ? (
                                    <MessageBox>No Category</MessageBox>
                                ) : (


                                    <Chart
                                        width="100%"
                                        height="400px"
                                        chartType="PieChart"
                                        loader={<div>Loading Data</div>}
                                        data={[
                                            ['Category', "Total"],
                                            ...summary.productCategories.map((x) => [x._id, x.total]),
                                        ]}
                                    />
                                )
                            }
                        </div>
                    </>
                )
                }

        </div>
    );
};

export default DashboardScreen;

import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
    FaBook,
    FaCalendarCheck,
    FaChevronDown,
    FaFileInvoiceDollar,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import HomeLayout from "../../Layouts/HomeLayout";
import { getMyPurchases } from "../../Redux/Slices/AuthSlice";

function PurchaseHistory() {
    const dispatch = useDispatch();
    let { myPurchases, data } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [expandedPurchase, setExpandedPurchase] = useState(null);

    useEffect(() => {
        (async () => await dispatch(getMyPurchases()))();
    }, []);

    const toggleExpand = (purchaseId) => {
        setExpandedPurchase(
            expandedPurchase === purchaseId ? null : purchaseId
        );
    };

    const StatusBadge = ({ status }) => (
        <span
            className={`badge badge-sm ${
                status === "Completed" ? "badge-success" : "badge-error"
            } gap-1`}
        >
            {status === "Completed" ? "Completed" : "Cancelled"}
        </span>
    );

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-base-100 pt-12">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center">
                        <h1 className="bg-gradient-to-r from-warning via-error to-warning bg-clip-text text-transparent text-3xl md:text-4xl font-bold mb-2">
                            My Purchase History
                        </h1>
                        <p className="text-lg text-base-content/70">
                            Your complete transaction records
                        </p>
                        <div className="divider divider-primary w-24 mx-auto my-4" />
                    </div>
                    {myPurchases?.length > 0 ? (
                        <>
                            <div className="hidden md:block overflow-x-auto rounded-box shadow-lg border border-base-200 mt-10">
                                <table className="table table-zebra">
                                    <thead className="bg-base-200">
                                        <tr>
                                            <th>#</th>
                                            <th>Details</th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myPurchases.map((purchase, idx) => (
                                            <tr
                                                key={purchase?._id}
                                                className="hover:bg-base-200/50"
                                            >
                                                <td className="font-bold">
                                                    {idx + 1}
                                                </td>
                                                <td>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-1">
                                                            <FaFileInvoiceDollar className="text-sm opacity-70" />
                                                            <span className="font-mono">
                                                                {
                                                                    purchase.razorpay_payment_id
                                                                }
                                                            </span>
                                                        </div>
                                                        <span className="text-xs opacity-70">
                                                            {purchase.razorpay_subscription_id ||
                                                                purchase.razorpay_order_id}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    {purchase.subscriptionPurchase ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="badge badge-primary badge-outline badge-sm">
                                                                Subscription
                                                            </span>
                                                            {purchase.razorpay_subscription_id ===
                                                            data.subscription
                                                                .id ? (
                                                                <span className="badge badge-success badge-sm">
                                                                    Active
                                                                </span>
                                                            ) : (
                                                                <span className="badge badge-error badge-sm">
                                                                    Inactive
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <span className="badge badge-secondary badge-outline badge-sm">
                                                                Course
                                                            </span>
                                                            <span className="max-w-[150px] truncate">
                                                                {
                                                                    purchase
                                                                        .coursePurchase
                                                                        ?.courseTitle
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-1">
                                                        <span className="font-bold">
                                                            {purchase.amount}
                                                        </span>
                                                        <span className="text-sm opacity-70 ml-1">
                                                            ({purchase.currency}
                                                            )
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-1 tooltip">
                                                        <FaCalendarCheck />
                                                        {format(
                                                            new Date(
                                                                purchase.createdAt
                                                            ),
                                                            "dd MMM yyyy"
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge badge-sm ${
                                                            purchase.status ===
                                                            "Completed"
                                                                ? "badge-success"
                                                                : "badge-error"
                                                        } gap-1`}
                                                    >
                                                        {purchase.status ===
                                                        "Completed"
                                                            ? "Completed"
                                                            : "Cancelled"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="md:hidden space-y-4">
                                {myPurchases.map((purchase, idx) => (
                                    <div
                                        key={purchase?._id}
                                        className="card bg-base-100 shadow-lg border border-base-200 mt-10"
                                    >
                                        <div
                                            className="card-body p-4 cursor-pointer"
                                            onClick={() =>
                                                toggleExpand(purchase._id)
                                            }
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">
                                                        #{idx + 1}
                                                    </span>
                                                    <FaFileInvoiceDollar className="text-sm opacity-70" />
                                                    <div className="flex flex-col">
                                                        <span className="font-mono text-sm">
                                                            {
                                                                purchase.razorpay_payment_id
                                                            }
                                                        </span>
                                                        <span className="text-xs opacity-70">
                                                            {purchase.razorpay_subscription_id ||
                                                                purchase.razorpay_order_id}
                                                        </span>
                                                    </div>
                                                </div>
                                                <FaChevronDown
                                                    className={`transition-transform ${
                                                        expandedPurchase ===
                                                        purchase._id
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            </div>
                                            <div
                                                className={`collapse ${
                                                    expandedPurchase ===
                                                    purchase._id
                                                        ? "collapse-open"
                                                        : ""
                                                }`}
                                            >
                                                <div className="collapse-content pt-4 space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm opacity-70">
                                                            Type:
                                                        </span>
                                                        {purchase.subscriptionPurchase ? (
                                                            <div className="flex items-center gap-2">
                                                                <span className="badge badge-primary badge-outline badge-sm">
                                                                    Subscription
                                                                </span>
                                                                {purchase.razorpay_subscription_id ===
                                                                data
                                                                    .subscription
                                                                    .id ? (
                                                                    <span className="badge badge-success badge-sm">
                                                                        Active
                                                                    </span>
                                                                ) : (
                                                                    <span className="badge badge-error badge-sm">
                                                                        Inactive
                                                                    </span>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <span className="badge badge-secondary badge-outline badge-sm">
                                                                    Course
                                                                </span>
                                                                <span className="max-w-[150px] truncate">
                                                                    {
                                                                        purchase
                                                                            .coursePurchase
                                                                            ?.courseTitle
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm opacity-70">
                                                            Amount:
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-bold">
                                                                {
                                                                    purchase.amount
                                                                }
                                                            </span>
                                                            <span className="text-sm opacity-70">
                                                                (
                                                                {
                                                                    purchase.currency
                                                                }
                                                                )
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm opacity-70">
                                                            Date:
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            <FaCalendarCheck />
                                                            {format(
                                                                new Date(
                                                                    purchase.createdAt
                                                                ),
                                                                "dd MMM yyyy"
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm opacity-70">
                                                            Status:
                                                        </span>
                                                        <StatusBadge
                                                            status={
                                                                purchase.status
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="max-w-xl mx-auto text-center py-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                                <FaFileInvoiceDollar className="text-4xl text-warning" />
                            </div>
                            <h2 className="text-xl font-semibold mb-4">
                                No Purchase History Found
                            </h2>
                            <p className="text-base-content/70 mb-6">
                                Your transaction records will appear here after
                                purchases
                            </p>
                            <button
                                className="btn btn-secondary md:btn-lg gap-2"
                                onClick={() => navigate("/courses")}
                            >
                                <FaBook /> Browse Courses
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default PurchaseHistory;

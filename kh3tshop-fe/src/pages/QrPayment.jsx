import React from "react";
import { useLocation } from "react-router";

const QrPayment = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const orderId = params.get("orderId");
  const amount = params.get("amount");

  const qrCode = `https://qr.sepay.vn/img?acc=100874803366&bank=VietinBank&amount=${amount}&des=SEVQR+TKPVAK+${orderId}`;
  return (
    <div className="max-w-5xl mx-auto p-6 grid lg:grid-cols-2 gap-10">
      <div className="flex flex-col justify-center items-center bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Scan QR Code to Pay
        </h2>
        <img
          src={qrCode}
          alt="QR Code"
          className="w-64 h-64 object-contain mb-4"
        />
        <p className="text-gray-500 text-center">
          Use your banking app to scan the QR code and complete payment.
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
        <div className="flex items-center gap-4 border p-4 rounded-lg">
          <img
            className="w-16 h-16 object-contain"
            src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-VietinBank-CTG-Ori.png"
            alt="VietinBank Logo"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">VietinBank</span>
            <span className="text-gray-500 text-sm">Bank Transfer</span>
          </div>
        </div>
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between border-b pb-2 border-gray-200">
            <span>Account Name:</span>
            <span>NGUYEN HO VIET KHOA</span>
          </div>
          <div className="flex justify-between border-b pb-2 border-gray-200">
            <span>Account Number:</span>
            <span>100874803366</span>
          </div>
          <div className="flex justify-between border-b pb-2 border-gray-200">
            <span>Amount:</span>
            <span className="font-semibold">{amount} VNĐ</span>
          </div>
          <div className="flex justify-between border-b pb-2 border-gray-200">
            <span>Transfer Content:</span>
            <span>SEVQR + TKPVAK + {orderId}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-2">
          Please complete the payment using the above details to ensure your
          order is processed.
        </p>
      </div>
    </div>
  );
};

export default QrPayment;

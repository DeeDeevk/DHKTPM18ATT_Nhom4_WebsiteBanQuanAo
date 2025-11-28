import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function MeetingModal({ isOpen, onClose, onSubmit }) {
    if (!isOpen) return null;

    // Validation bằng Yup
    const MeetingSchema = Yup.object().shape({
        title: Yup.string().required("Tiêu đề không được để trống"),
        description: Yup.string().required("Mô tả không được để trống"),
        startTime: Yup.string().required("Vui lòng chọn thời gian bắt đầu"),
        endTime: Yup.string().required("Vui lòng chọn thời gian kết thúc"),
        attendees: Yup.string()
            .required("Danh sách email không được để trống")
            .test("emails-check", "Email không hợp lệ",
                value => {
                    const emails = value.split(",").map(e => e.trim());
                    return emails.every(email =>
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    );
                }
            )
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fadeIn">

                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Tạo cuộc họp Google Meet
                </h2>

                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        startTime: "",
                        endTime: "",
                        attendees: ""
                    }}
                    validationSchema={MeetingSchema}
                    onSubmit={(values) => {
                        const attendeesArray = values.attendees.split(",").map(e => e.trim());
                        onSubmit({ ...values, attendees: attendeesArray });
                    }}
                >
                    {() => (
                        <Form className="space-y-4">

                            {/* Title */}
                            <div>
                                <label className="font-medium">Tiêu đề cuộc họp</label>
                                <Field
                                    name="title"
                                    className="w-full p-2 border rounded-lg mt-1"
                                    placeholder="Nhập tiêu đề..."
                                />
                                <ErrorMessage
                                    name="title"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="font-medium">Mô tả</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    className="w-full p-2 border rounded-lg mt-1"
                                    placeholder="Nhập mô tả..."
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Start Time */}
                            <div>
                                <label className="font-medium">Thời gian bắt đầu</label>
                                <Field
                                    name="startTime"
                                    type="datetime-local"
                                    className="w-full p-2 border rounded-lg mt-1"
                                />
                                <ErrorMessage
                                    name="startTime"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* End Time */}
                            <div>
                                <label className="font-medium">Thời gian kết thúc</label>
                                <Field
                                    name="endTime"
                                    type="datetime-local"
                                    className="w-full p-2 border rounded-lg mt-1"
                                />
                                <ErrorMessage
                                    name="endTime"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Attendees */}
                            <div>
                                <label className="font-medium">Email nhân viên</label>
                                <Field
                                    name="attendees"
                                    className="w-full p-2 border rounded-lg mt-1"
                                    placeholder="email1@gmail.com, email2@gmail.com"
                                />
                                <ErrorMessage
                                    name="attendees"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                                >
                                    Hủy
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Tạo cuộc họp
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

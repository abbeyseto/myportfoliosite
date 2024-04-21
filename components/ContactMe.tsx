import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PageInfo } from "../typings";
import { fetchPageInfo, sendEmail } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationPin,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactMe() {
  const [pageInfo, setPageInfo] = useState({} as PageInfo);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    async function fetchData() {
      const pageInfo = await fetchPageInfo();
      setPageInfo(pageInfo);
    }
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setSubmitting(true);
    const to = pageInfo.email;
    const subject = formData.subject;
    const text = formData.message;
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Introduction Email</title>
    </head>
    <body>
        <h1>Introduction Email</h1>
        <p>Hi,</p>
        
        <p>I'd like to introduce you to <strong>${formData.name}</strong>. They've sent you a message fron your website:</p>
        
        <h2>Message:</h2>
        <p><strong>Subject:</strong> ${formData.subject} </p>
        <p><strong>From:</strong> ${formData.name} &lt;${formData.email}&gt;</p>
        <p><strong>Message:</strong> ${formData.message}</p>
        
        <p>Best regards,<br>
        Your Name</p>
    </body>
    </html>`;
    const emailStatus: any = await sendEmail(to, subject, text, html);
    console.log(emailStatus);
    if (emailStatus.message.includes("success")) {
      setSuccessMessage(emailStatus.message);
      reset(); // Clear form fields
    } else {
      setFailureMessage(emailStatus.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="h-screen flex relative flex-col space-y-12 text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl">
        Contact
      </h3>
      <div className="flex flex-col lg:m-4 space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-10">
        <h4 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-center">
          I have got just what you need.{" "}
          <span className="decoration-darkGreen/50 underline">Lets talk.</span>
        </h4>

        <div className="space-y-1 md:space-y-3 lg:space-y-3 xl:space-y-3 2xl:space-y-5">
          <div className="flex items-center space-x-5 justify-center">
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-darkGreen h-7 w-7 animate-pulse"
            />
            <a
              className="text-lg md:text-2xl lg:text-2xl"
              href={`https://wa.me/${pageInfo.phoneNumber}`}
            >
              {pageInfo.phoneNumber}
            </a>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <FontAwesomeIcon
              icon={faPhone}
              className="text-darkGreen h-7 w-7 animate-pulse"
            />
            <a
              className="text-lg md:text-2xl lg:text-2xl"
              href={`tel:${pageInfo.phoneNumber}`}
            >
              {pageInfo.phoneNumber}
            </a>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-darkGreen h-7 w-7 animate-pulse"
            />
            <a
              className="text-lg md:text-2xl lg:text-2xl"
              href={`mailto:${pageInfo.email}`}
            >
              {pageInfo.email}
            </a>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <FontAwesomeIcon
              icon={faLocationPin}
              className="text-darkGreen h-7 w-7 animate-pulse"
            />
            <p className="text-lg md:text-2xl lg:text-2xl">
              {pageInfo.address}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-80 md:w-fit mx-auto"
        >
          <div className="md:flex md:space-x-2 space-y-2 md:space-y-0 ">
            <input
              {...register("name")}
              placeholder="Name"
              required
              className="contactInput w-80 md:w-auto"
              type="text"
            />{" "}
            <input
              {...register("email")}
              placeholder="Email"
              required
              className="contactInput w-80 md:w-auto"
              type="email"
            />
          </div>
          <input
            {...register("subject")}
            placeholder="Subject"
            required
            className="contactInput "
            type="text"
          />
          <textarea
            {...register("message")}
            placeholder="Message"
            required
            className="contactInput"
          />
          <button
            type="submit"
            className="bg-lightGreen py-3 md:py-5 px-10 rounded-lg text-white font-bold text-lg"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
        {successMessage && (
        <p className="text-green-900 text-xl border-4 text-center py-3 md:py-5 px-10 rounded-lg border-lime-200 bg-green-100 font-semibold animate-pulse">
          {successMessage}
        </p>
      )}
       {failureMessage && (
        <p className="text-red-900 text-xl border-4 text-center py-3 md:py-5 px-10 rounded-lg border-orange-200 bg-red-100 p-4 font-semibold animate-pulse">
          {failureMessage}
        </p>
      )}
      </div>
    </div>
  );
}

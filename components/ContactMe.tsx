import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { PageInfo } from "../typings";
import { sendEmail } from "../utils";
import SectionFrame from "./SectionFrame";
import SectionHeading from "./SectionHeading";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {
  pageInfo: PageInfo;
};

export default function ContactMe({ pageInfo }: Readonly<Props>) {
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    setSuccessMessage("");
    setFailureMessage("");
  }, [pageInfo.email]);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setSubmitting(true);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio enquiry</title>
</head>
<body>
  <h1>Portfolio enquiry</h1>
  <p><strong>From:</strong> ${formData.name} &lt;${formData.email}&gt;</p>
  <p><strong>Subject:</strong> ${formData.subject}</p>
  <p><strong>Message:</strong> ${formData.message}</p>
</body>
</html>`;

    const emailStatus: any = await sendEmail(pageInfo.email, formData.subject, formData.message, html);

    if (emailStatus?.message?.includes("success")) {
      setSuccessMessage(emailStatus.message);
      reset();
    } else {
      setFailureMessage(emailStatus?.message ?? "Something went wrong.");
    }

    setSubmitting(false);
  };

  return (
    <SectionFrame id="contact" className="pb-28">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="Contact"
          title="If you need a sharper product story, let’s build it."
          description="Email is the best way to reach me. I’m open to product, systems, strategy, and AI-enabled work where clarity and execution both matter."
        />

        <div className="surface-card rounded-[2rem] p-6 backdrop-blur-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactRow icon={faEnvelope} label="Email" value={pageInfo.email} href={`mailto:${pageInfo.email}`} />
            <ContactRow icon={faLocationPin} label="Location" value={pageInfo.address} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input {...register("name")} required placeholder="Name" className="contactInput" type="text" />
              <input {...register("email")} required placeholder="Email" className="contactInput" type="email" />
            </div>
            <input {...register("subject")} required placeholder="Subject" className="contactInput" type="text" />
            <textarea {...register("message")} required placeholder="Message" className="contactInput min-h-[10rem]" />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-[#6f9f98] px-6 py-4 text-[0.72rem] font-medium uppercase tracking-[0.35em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Send message"}
            </button>
          </form>

          {successMessage && <p className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">{successMessage}</p>}
          {failureMessage && <p className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100">{failureMessage}</p>}
        </div>
      </div>
    </SectionFrame>
  );
}

type ContactRowProps = {
  icon: IconDefinition;
  label: string;
  value: string;
  href?: string;
};

function ContactRow({ icon, label, value, href }: Readonly<ContactRowProps>) {
  const isExternal = Boolean(href && href.startsWith("http"));
  const content = (
    <>
      <FontAwesomeIcon icon={icon} className="h-4 w-4 text-[#6f9f98]" />
      <div>
        <p className="text-[0.62rem] uppercase tracking-[0.35em] text-[color:var(--page-muted)]">{label}</p>
        <p className="mt-2 break-words text-sm text-[color:var(--page-fg)]">{value || "Not set"}</p>
      </div>
    </>
  );

  if (!href || !value) {
    return <div className="surface-panel flex items-start gap-3 rounded-2xl p-4">{content}</div>;
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="surface-panel flex items-start gap-3 rounded-2xl p-4 transition hover:border-[#6f9f98]/60"
      >
        {content}
      </a>
    );
  }

  return (
    <a
      href={href}
      className="surface-panel flex items-start gap-3 rounded-2xl p-4 transition hover:border-[#6f9f98]/60"
    >
      {content}
    </a>
  );
}

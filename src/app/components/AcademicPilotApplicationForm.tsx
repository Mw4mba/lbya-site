'use client';

import React, { useState } from 'react';

type FormCopy = {
  submit: string;
  success: string;
};

const ACADEMIC_PILOT_EMAIL = 'info@lbya.se';

export default function AcademicPilotApplicationForm({ copy }: { copy: FormCopy }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fullName = `${formData.get('fullName') ?? ''}`.trim();
    const subject = `NBC Academic Pilot Application - ${fullName}`;
    const lines = [
      `Full name: ${formData.get('fullName') ?? ''}`,
      `Email address: ${formData.get('email') ?? ''}`,
      `School / university: ${formData.get('school') ?? ''}`,
      `Program or field of study: ${formData.get('program') ?? ''}`,
      `Country: ${formData.get('country') ?? ''}`,
      `Current level: ${formData.get('level') ?? ''}`,
      `Area of interest: ${formData.get('interest') ?? ''}`,
      '',
      'Why do you want to join the NBC Academic Pilot Program?',
      `${formData.get('motivation') ?? ''}`,
      '',
      'Do you want to use NBC for a course, thesis, personal learning, or research project?',
      `${formData.get('useCase') ?? ''}`,
    ];

    const mailto = `mailto:${ACADEMIC_PILOT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;

    setSubmitted(true);
    event.currentTarget.reset();
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-[#1F3529]/10 bg-white p-6 shadow-[0_18px_45px_rgba(31,53,41,0.08)] sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-[#1F3529]">Full name</label>
          <input id="fullName" name="fullName" required type="text" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#1F3529]">Email address</label>
          <input id="email" name="email" required type="email" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
        </div>
        <div>
          <label htmlFor="school" className="mb-2 block text-sm font-semibold text-[#1F3529]">School / university</label>
          <input id="school" name="school" required type="text" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
        </div>
        <div>
          <label htmlFor="program" className="mb-2 block text-sm font-semibold text-[#1F3529]">Program or field of study</label>
          <input id="program" name="program" required type="text" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
        </div>
        <div>
          <label htmlFor="country" className="mb-2 block text-sm font-semibold text-[#1F3529]">Country</label>
          <input id="country" name="country" required type="text" className="w-full border border-[#1F3529]/18 px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]" />
        </div>
        <div>
          <label htmlFor="level" className="mb-2 block text-sm font-semibold text-[#1F3529]">Current level</label>
          <select id="level" name="level" required defaultValue="" className="w-full border border-[#1F3529]/18 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]">
            <option value="" disabled>Select level</option>
            <option>Bachelor</option>
            <option>Master</option>
            <option>PhD</option>
            <option>Professional training</option>
            <option>Other</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="interest" className="mb-2 block text-sm font-semibold text-[#1F3529]">Area of interest</label>
          <select id="interest" name="interest" required defaultValue="" className="w-full border border-[#1F3529]/18 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#2E7D32]">
            <option value="" disabled>Select area</option>
            <option>BIM</option>
            <option>Architecture</option>
            <option>Civil Engineering</option>
            <option>Structural Engineering</option>
            <option>Construction Management</option>
            <option>Infrastructure</option>
            <option>Other</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="motivation" className="mb-2 block text-sm font-semibold text-[#1F3529]">Why do you want to join the NBC Academic Pilot Program?</label>
          <textarea id="motivation" name="motivation" required rows={5} className="w-full resize-none border border-[#1F3529]/18 px-4 py-3 text-sm leading-6 outline-none transition-colors focus:border-[#2E7D32]" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="useCase" className="mb-2 block text-sm font-semibold text-[#1F3529]">Do you want to use NBC for a course, thesis, personal learning, or research project?</label>
          <textarea id="useCase" name="useCase" required rows={4} className="w-full resize-none border border-[#1F3529]/18 px-4 py-3 text-sm leading-6 outline-none transition-colors focus:border-[#2E7D32]" />
        </div>
      </div>

      <button type="submit" className="mt-8 inline-flex w-full items-center justify-center rounded-sm bg-[#2E7D32] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#1F5B25]">
        {copy.submit}
      </button>

      {submitted && (
        <p className="mt-4 rounded-sm border border-[#2E7D32]/30 bg-[#2E7D32]/10 px-4 py-3 text-sm text-[#1F3529]">
          {copy.success}
        </p>
      )}
    </form>
  );
}

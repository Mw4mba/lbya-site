import React from 'react';

const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahrain',
  'Bangladesh',
  'Belarus',
  'Belgium',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Bulgaria',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Costa Rica',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Estonia',
  'Ethiopia',
  'Finland',
  'France',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Guatemala',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kuwait',
  'Latvia',
  'Lebanon',
  'Lithuania',
  'Luxembourg',
  'Malaysia',
  'Mexico',
  'Morocco',
  'Netherlands',
  'New Zealand',
  'Nigeria',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Panama',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Saudi Arabia',
  'Serbia',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'South Africa',
  'South Korea',
  'Spain',
  'Sri Lanka',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Thailand',
  'Tunisia',
  'Turkey',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Venezuela',
  'Vietnam',
];

export default function CheckoutAccountSection({ email }: { email: string }) {
  return (
    <section className="rounded-sm border border-[#DCE3E0] bg-white p-5">
      <h2 className="text-lg font-semibold text-[#1F3529]">Account</h2>
      <p className="mt-2 text-sm text-[#37474F]/74">The signed-in account becomes the purchaser and subscription administrator.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Signed-in user email</span>
          <input className="rounded-sm border border-[#DCE3E0] px-3 py-2" defaultValue={email} readOnly />
        </label>
        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Company name</span>
          <input className="rounded-sm border border-[#DCE3E0] px-3 py-2" placeholder="LBYA Client Organization" />
        </label>
        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Organization number / VAT number</span>
          <input className="rounded-sm border border-[#DCE3E0] px-3 py-2" placeholder="VAT/Org number" />
        </label>
        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Country</span>
          <select defaultValue="" className="rounded-sm border border-[#DCE3E0] bg-white px-3 py-2">
            <option value="" disabled>
              Select country
            </option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm text-[#37474F] md:col-span-2">
          <span>Billing address</span>
          <input className="rounded-sm border border-[#DCE3E0] px-3 py-2" placeholder="Billing address" />
        </label>
      </div>
    </section>
  );
}

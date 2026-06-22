import React from 'react';

const addOns = [
  'Advanced Analytics',
  'API Access',
  'Custom Document Verification',
  'Premium Support',
  'Enterprise Onboarding',
  'Multi-country Operations Module',
];

export default function AddOnEditorCard() {
  return (
    <section className="rounded-sm border border-[#E3E7E8] bg-white p-5">
      <h3 className="text-lg font-semibold text-[#1F3529]">Add-ons management</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-[#F6F9FA] text-left text-[#37474F]/72">
            <tr>
              <th className="px-3 py-2">Add-on name</th>
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2">Price placeholder</th>
              <th className="px-3 py-2">Billing type</th>
              <th className="px-3 py-2">Compatible plans</th>
              <th className="px-3 py-2">Active/inactive</th>
            </tr>
          </thead>
          <tbody>
            {addOns.map((name) => (
              <tr key={name} className="border-t border-[#E3E7E8]">
                <td className="px-3 py-2 font-semibold text-[#1F3529]">{name}</td>
                <td className="px-3 py-2">Placeholder description</td>
                <td className="px-3 py-2">Placeholder</td>
                <td className="px-3 py-2">Recurring</td>
                <td className="px-3 py-2">Business / Enterprise</td>
                <td className="px-3 py-2">Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex gap-2 text-xs text-[#2E7D32]">
        <button className="rounded-sm border border-[#2E7D32]/25 px-2.5 py-1.5">Create add-on</button>
        <button className="rounded-sm border border-[#2E7D32]/25 px-2.5 py-1.5">Edit add-on</button>
      </div>
    </section>
  );
}

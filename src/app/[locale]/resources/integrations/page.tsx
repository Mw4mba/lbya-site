import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ResourcesHeroInteractiveBackdrop from '@/app/components/ResourcesHeroInteractiveBackdrop';
import { pageFrameStyle } from '@/app/components/LayoutFrame';
import { nbcIntegrations } from '@/data/mockResources';

type Props = { params: Promise<{ locale: string }> };

const integrationCategories = [
  'OpenBIM foundation',
  'Authoring tools',
  'CDE & document platforms',
  'Issue management',
  'Model checking',
  'Reporting & analytics',
  'Storage',
  'Future connectors',
];

export const metadata: Metadata = {
  title: 'Integrations | LBYA',
  description: 'How NBC is designed to work alongside the tools teams already use.',
};

export default async function ResourcesIntegrationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[#37474F] pt-30 pb-20 text-white">
          <ResourcesHeroInteractiveBackdrop variant="integrations" />
          <div className="relative z-10" style={pageFrameStyle}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">Integrations</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">Designed to work beside the tools teams already use.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84 md:text-xl">
              NBC is not designed to replace authoring tools, CDEs, issue platforms, model checkers, or reporting
              systems. It is positioned as a readiness and evidence-control layer around existing project workflows.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div style={pageFrameStyle}>
            <div className="rounded-sm border border-[#DCE3E0] bg-[#F7FAF7] p-7 shadow-[0_16px_28px_rgba(31,53,41,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">Positioning</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#1F3529]">CDE-compatible, not CDE-competing.</h2>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-[#37474F]/82 md:text-base">
                Keep your existing tools. Use NBC to verify, interpret, and communicate readiness across the project
                information they produce.
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-[#37474F]/82 md:text-base">
                Integration availability will depend on technical feasibility, API access, licensing, customer
                priorities, and implementation phase. Initial workflows may use controlled file imports and exports
                before direct API integrations are released.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div style={pageFrameStyle}>
            <div className="flex flex-wrap gap-3">
              {integrationCategories.map((category) => (
                <span key={category} className="rounded-full border border-[#A5D6A7]/40 bg-[#F6FAF6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#2E7D32]">
                  {category}
                </span>
              ))}
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {nbcIntegrations.map((item) => (
                <article key={item.id} className="rounded-sm border border-[#DCE3E0] bg-white p-6 shadow-[0_18px_30px_rgba(31,53,41,0.06)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">{item.category}</p>
                      <h2 className="mt-3 text-2xl font-semibold text-[#1F3529]">{item.name}</h2>
                    </div>
                    <span className="rounded-full border border-[#2E7D32]/20 bg-[#F6FAF6] px-3 py-1 text-xs font-semibold text-[#2E7D32]">{item.status}</span>
                  </div>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-[#37474F]/82">
                    <p><span className="font-semibold text-[#1F3529]">Description:</span> {item.description}</p>
                    <p><span className="font-semibold text-[#1F3529]">NBC use case:</span> {item.nbcUseCase}</p>
                    <p><span className="font-semibold text-[#1F3529]">Workflow type:</span> {item.workflowType}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

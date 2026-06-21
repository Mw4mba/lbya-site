import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import AcademicPilotApplicationForm from '@/app/components/AcademicPilotApplicationForm';
import { asLocale } from '@/app/content/locale';
import { localizePath } from '@/app/content/paths';

type Props = { params: Promise<{ locale: string }> };

const pageFrameStyle = {
  marginLeft: 'clamp(1.5rem, calc(9.14vw - 0.354rem), 7.875rem)',
  marginRight: 'clamp(1.5rem, calc(11.43vw - 1.286rem), 9rem)',
};

export const metadata: Metadata = {
  title: 'NBC Academic Pilot Program | Nayeli BIM Control',
  description:
    'Free selected pilot access for BIM, architecture, and civil engineering students to test model readiness, issue tracking, and digital construction workflows with NBC.',
  keywords: [
    'NBC Academic Pilot',
    'Nayeli BIM Control',
    'BIM students',
    'architecture students',
    'civil engineering students',
    'BIM model readiness',
    'digital construction workflows',
    'issue tracking',
    'BIM pilot program',
  ],
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default async function AcademicPilotPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const activeLocale = asLocale(locale);

  return (
    <div className="min-h-screen bg-white text-[#1F3529]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-[#37474F] pt-30 pb-20 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(129,212,250,0.2),transparent_40%),radial-gradient(circle_at_82%_8%,rgba(165,214,167,0.18),transparent_38%)]" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(129, 212, 250, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(165, 214, 167, 0.1) 1px, transparent 1px)',
              backgroundSize: '54px 54px',
              maskImage: 'linear-gradient(180deg, black 0%, black 70%, transparent 100%)',
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] items-center pr-8 lg:flex">
            <div className="relative h-[340px] w-full overflow-hidden rounded-sm border border-white/18 bg-white/[0.05] backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,212,250,0.2),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(165,214,167,0.2),transparent_40%)]" />
              <svg className="absolute inset-0 h-full w-full opacity-65" viewBox="0 0 520 340" preserveAspectRatio="none" aria-hidden="true">
                <path d="M16 278 H500" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <path d="M16 238 H500" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                <path d="M16 198 H500" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                <path d="M16 158 H500" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                <path d="M72 278 V78 H164 V278" stroke="rgba(165,214,167,0.65)" strokeWidth="2" fill="none" />
                <path d="M198 278 V114 H298 V278" stroke="rgba(129,212,250,0.65)" strokeWidth="2" fill="none" />
                <path d="M322 278 V96 H446 V278" stroke="rgba(165,214,167,0.6)" strokeWidth="2" fill="none" />
                <path d="M72 132 L118 98 L164 132" stroke="rgba(165,214,167,0.65)" strokeWidth="2" fill="none" />
                <path d="M322 120 L384 74 L446 120" stroke="rgba(165,214,167,0.6)" strokeWidth="2" fill="none" />
              </svg>
              <div className="absolute left-6 top-5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/72">Academic Studio Board</div>
              <div className="absolute bottom-5 right-6 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#A5D6A7]">Model Readiness / Issue Review</div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <p className="absolute left-[6%] top-[22%] text-[0.64rem] font-semibold uppercase tracking-[0.5em] text-white/20">Academic Pilot</p>
            <p className="absolute left-[12%] top-[34%] text-[0.64rem] font-semibold uppercase tracking-[0.48em] text-[#A5D6A7]/30">BIM Studio</p>
            <p className="absolute left-[18%] top-[46%] text-[0.64rem] font-semibold uppercase tracking-[0.5em] text-white/18">Thesis Workflow</p>
            <p className="absolute left-[24%] top-[58%] text-[0.64rem] font-semibold uppercase tracking-[0.48em] text-[#81D4FA]/28">Digital Construction Lab</p>
          </div>
          <div className="relative" style={pageFrameStyle}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A5D6A7]">Nayeli BIM Control</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">NBC Academic Pilot Program</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84 md:text-xl">
              Free access for selected BIM, architecture, and civil engineering students to test model readiness,
              issue tracking, and digital construction workflows.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#application" className="inline-flex items-center gap-3 rounded-sm bg-white px-7 py-3.5 text-sm font-semibold text-[#2E7D32] transition-colors hover:bg-[#A5D6A7]">
                <span>Apply for Pilot Access</span>
                <ArrowIcon />
              </a>
              <a href="#what-you-can-test" className="inline-flex items-center gap-3 rounded-sm border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2E7D32]">
                <span>Learn What You Can Test</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAF7] py-16">
          <div style={pageFrameStyle}>
            <p className="max-w-5xl text-base leading-8 text-[#37474F]/82 md:text-lg">
              The NBC Academic Pilot Program is designed to give selected students early access to Nayeli BIM
              Control while the platform is under development. The goal is to let future architects, BIM
              specialists, and civil engineers explore how digital model control, readiness scoring, issue
              tracking, and structured construction workflows can improve project quality before construction begins.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div style={pageFrameStyle}>
            <h2 className="text-3xl font-light md:text-5xl">Who It Is For</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  title: 'BIM students',
                  body: 'Students learning model coordination, clash control, model checking, and BIM workflows.',
                },
                {
                  title: 'Architecture students',
                  body: 'Students interested in design quality, model completeness, documentation readiness, and coordination between disciplines.',
                },
                {
                  title: 'Civil and structural engineering students',
                  body: 'Students working with structural models, infrastructure models, design coordination, and technical validation.',
                },
                {
                  title: 'Thesis and research students',
                  body: 'Students who want to explore digital construction, model readiness, BIM quality control, or AI-supported construction workflows.',
                },
              ].map((item) => (
                <article key={item.title} className="border border-[#1F3529]/10 bg-white p-6 shadow-[0_14px_40px_rgba(31,53,41,0.07)]">
                  <h3 className="text-xl font-semibold text-[#2E7D32]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#37474F]/78">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="what-you-can-test" className="bg-[#F7FAF7] py-16">
          <div style={pageFrameStyle}>
            <h2 className="text-3xl font-light md:text-5xl">What Students Can Test</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Model readiness overview',
                  body: 'Upload or review BIM-related files and understand how prepared a model is for coordination, review, or construction use.',
                },
                {
                  title: 'Issue tracking workflow',
                  body: 'Create, classify, assign, and follow issues found during model review.',
                },
                {
                  title: 'Digital construction process',
                  body: 'Explore how model data, project status, responsibilities, and quality checks can be organized in one control environment.',
                },
                {
                  title: '3D readiness view',
                  body: 'Visualize a building or infrastructure model and understand its readiness through a simplified control interface.',
                },
                {
                  title: 'Reports and review notes',
                  body: 'Generate structured outputs that can support academic assignments, thesis work, or project review exercises.',
                },
              ].map((feature) => (
                <article key={feature.title} className="border border-[#1F3529]/10 bg-white p-6">
                  <h3 className="text-lg font-semibold text-[#1F3529]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#37474F]/76">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div style={pageFrameStyle} className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-light md:text-5xl">Why NBC Offers This Program</h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/82 md:text-lg">
                NBC is being developed as a practical BIM control and digital construction platform. By opening
                selected pilot access to students, NBC can receive valuable feedback from future professionals while
                helping students gain hands-on experience with modern digital workflows used in architecture,
                engineering, and construction.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light">Benefits for Students</h3>
              <div className="mt-5 grid gap-3">
                {[
                  'Free selected access during the pilot period',
                  'Practical experience with BIM quality and readiness workflows',
                  'Useful for school projects, thesis work, and portfolio development',
                  'Early exposure to digital construction control systems',
                  'Opportunity to provide feedback and influence future product development',
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 border border-[#1F3529]/10 bg-[#F7FAF7] p-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2E7D32]" />
                    <span className="text-sm leading-7 text-[#37474F]/78">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7FAF7] py-16">
          <div style={pageFrameStyle}>
            <h2 className="text-3xl font-light md:text-5xl">Selection Criteria</h2>
            <p className="mt-5 text-base leading-8 text-[#37474F]/82 md:text-lg">
              Access is limited and based on relevance, motivation, and field of study.
            </p>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                'Student in BIM, architecture, civil engineering, structural engineering, construction management, or related field',
                'Clear reason for wanting to test NBC',
                'Interest in BIM quality, model control, digital workflows, or construction technology',
                'Willingness to provide feedback during or after the pilot',
              ].map((criterion) => (
                <li key={criterion} className="flex items-start gap-3 border border-[#1F3529]/10 bg-white p-4 text-sm leading-7 text-[#37474F]/78">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2E7D32]" />
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="application" className="py-16">
          <div style={pageFrameStyle} className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2E7D32]">Application</p>
              <h2 className="mt-4 text-3xl font-light md:text-5xl">Apply for Academic Pilot Access</h2>
              <p className="mt-5 text-base leading-8 text-[#37474F]/82 md:text-lg">
                Apply to explore pilot workflows, test model readiness and issue tracking, and share practical feedback
                while NBC is under development.
              </p>
            </div>
            <AcademicPilotApplicationForm
              copy={{
                submit: 'Apply for Academic Pilot Access',
                success:
                  'Thank you for applying. Selected students will be contacted with further information about pilot access.',
              }}
            />
          </div>
        </section>

        <section className="bg-[#37474F] py-16 text-white">
          <div style={pageFrameStyle} className="grid gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-light md:text-5xl">For Universities and Academic Partners</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
                NBC is also open to academic collaboration with universities, BIM programs, architecture schools,
                engineering departments, and construction technology educators who want to introduce students to
                practical digital construction workflows.
              </p>
            </div>
            <a
              href={localizePath(activeLocale, '/contact')}
              className="inline-flex items-center justify-center gap-3 rounded-sm bg-white px-6 py-3.5 text-sm font-semibold text-[#2E7D32] transition-colors hover:bg-[#A5D6A7]"
            >
              <span>Contact NBC for Academic Collaboration</span>
              <ArrowIcon />
            </a>
          </div>
        </section>

        <section className="bg-[#F7FAF7] py-16">
          <div style={pageFrameStyle} className="rounded-sm border border-[#1F3529]/10 bg-white p-8 text-center shadow-[0_18px_45px_rgba(31,53,41,0.08)] md:p-10">
            <h2 className="text-3xl font-light md:text-4xl">Help Shape the Future of BIM Control</h2>
            <p className="mt-5 text-base leading-8 text-[#37474F]/82 md:text-lg">
              The Academic Pilot Program gives students the opportunity to test NBC early, explore real digital
              construction workflows, and contribute feedback that can help improve the platform before wider release.
            </p>
            <a href="#application" className="mt-7 inline-flex items-center justify-center gap-3 rounded-sm bg-[#2E7D32] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1F5B25]">
              <span>Apply Now</span>
              <ArrowIcon />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

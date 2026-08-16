'use client';

import { PageHeader } from '@/components/page-header';
import { useEffect, useState } from 'react';
import { getTermsOfService } from '@/lib/db';
import Markdown from 'react-markdown';

export default function TermsOfServicePage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getTermsOfService();
      if (data) setContent(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="container mx-auto px-6 max-w-4xl pb-24">
      <PageHeader 
        title="Terms of Service" 
        description="Please review the terms and conditions governing your participation and use of Civil Engineering Club resources."
      />
      
      <div className="glass rounded-[36px] p-8 md:p-12 prose dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-info-light">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : content ? (
          <div className="markdown-body">
            <Markdown>{content.contentMarkdown || content.description || content.content || ''}</Markdown>
          </div>
        ) : (
          <>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing the official website, participating in events, or utilizing resources provided by the 
              <strong> Civil Engineering Club (CEC)</strong>, you agree to adhere to and be bound by these Terms of Service. 
              If you do not agree with any portion of these terms, you should refrain from using our online platforms and services.
            </p>

            <h2>2. Membership & Code of Conduct</h2>
            <p>
              All members and participants are expected to maintain the highest standards of integrity, professional ethics, and mutual respect. 
              Harassment, discrimination, academic dishonesty, and unauthorized commercial exploitation of club activities or materials are strictly prohibited.
            </p>
            <ul>
              <li>Members must provide accurate information during registration and verification processes.</li>
              <li>Official credentials and membership badges are non-transferable.</li>
              <li>Participation in club projects requires compliance with departmental safety guidelines and intellectual standards.</li>
            </ul>

            <h2>3. Intellectual Property & Publications</h2>
            <p>
              All original content, magazines, event media, research articles, logos, and digital publications displayed on this platform are 
              the property of the Civil Engineering Club or their respective authors. Content may be downloaded or referenced for personal, academic, 
              and non-commercial use with appropriate citation and credit.
            </p>

            <h2>4. Event Registrations & Certificates</h2>
            <p>
              Certificates of completion, achievement, or participation issued by the club are verified through our digital verification portal. 
              Any attempt to falsify, duplicate, or tamper with official certificates, membership IDs, or verification records will result in 
              immediate revocation of membership and report to university disciplinary committees.
            </p>

            <h2>5. Disclaimer of Liability</h2>
            <p>
              The Civil Engineering Club provides educational materials, event announcements, and resources on an &ldquo;as is&rdquo; basis. 
              While we strive for accuracy, the club makes no warranties regarding the complete precision or applicability of materials for specific commercial engineering projects.
            </p>

            <h2>6. Amendments & Contact</h2>
            <p>
              The Executive Committee reserves the right to update these terms as needed to reflect organizational policies or university regulations. 
              Continued involvement with the club constitutes acceptance of any revised terms.
            </p>
            <p>
              For inquiries regarding these Terms of Service, please reach out via our contact page or email 
              <a href="mailto:contact@civilengineeringclub.edu" className="ml-1">contact@civilengineeringclub.edu</a>.
            </p>

            <hr />
            <p className="text-sm text-primary-light/60 dark:text-primary/60 text-center mt-8">
              Effective Date: January 2025 • Civil Engineering Club
            </p>
          </>
        )}
      </div>
    </div>
  );
}

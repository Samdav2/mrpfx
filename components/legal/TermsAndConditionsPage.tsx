'use client';

const TermsAndConditionsPage = () => {
    return (
        <div className="bg-[#f5f5f5] min-h-screen py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                {/* White Card Container with left border */}
                <div
                    className="bg-white rounded-lg shadow-sm p-8 md:p-12"
                    style={{ borderLeft: '4px solid #e67e22' }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-semibold text-black mb-4">
                            Terms and Conditions
                        </h1>
                        {/* Decorative line with diamond */}
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-20 h-[1px] bg-gray-300"></div>
                            <div className="w-2.5 h-2.5 bg-[#3442D9] transform rotate-45"></div>
                            <div className="w-20 h-[1px] bg-gray-300"></div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="text-gray-800 text-[13px] md:text-[14px] leading-[1.8] space-y-4">
                        <p className="text-justify">
                            We are Mr_P Worldwide Ventures, doing business as Mr P Fx (&apos;Company&apos;, &apos;we&apos;, &apos;us&apos;, or &apos;our&apos;), a company registered in Nigeria at Ikbpoba hill, Benin City, Edo 300105.
                        </p>

                        <p className="text-justify">
                            We operate the website Mrpfx.com (the &apos;Site&apos;), as well as any other related products and services that refer or link to these legal terms (the &apos;Legal Terms&apos;) (collectively, the &apos;Services&apos;).
                        </p>

                        <p className="text-justify">
                            You can contact us by phone at <a href="tel:+2347020870022" className="text-[#e67e22] hover:underline">+234/0208/0022</a>, email at <a href="mailto:Mrpfxworld1@gmail.com" className="text-[#e67e22] hover:underline">Mrpfxworld1@gmail.com</a>, or by mail to Ikbpobahill, Benin City, Edo 300105, Nigeria.
                        </p>

                        <p className="text-justify">
                            These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&apos;you&apos;), and Mr_P Worldwide Ventures, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                        </p>

                        <p className="text-justify">
                            Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you about any changes by updating the &apos;Last updated&apos; date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
                        </p>

                        <p className="text-justify">
                            The Services are Intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
                        </p>

                        <p className="text-justify">
                            We recommend that you print a copy of these Legal Terms for your records.
                        </p>

                        {/* Table of Contents */}
                        <p className="font-semibold text-black mt-6 mb-2">TABLE OF CONTENTS</p>
                        <div className="space-y-1">
                            <p><a href="#our-services" className="text-[#e67e22] hover:underline">1. OUR SERVICES</a></p>
                            <p><a href="#intellectual-property" className="text-[#e67e22] hover:underline">2. INTELLECTUAL PROPERTY RIGHTS</a></p>
                            <p><a href="#user-representations" className="text-[#e67e22] hover:underline">3. USER REPRESENTATIONS</a></p>
                            <p><a href="#user-registration" className="text-[#e67e22] hover:underline">4. USER REGISTRATION</a></p>
                            <p><a href="#products" className="text-[#e67e22] hover:underline">5. PRODUCTS</a></p>
                            <p><a href="#purchases-payment" className="text-[#e67e22] hover:underline">6. PURCHASES AND PAYMENT</a></p>
                            <p><a href="#refunds-policy" className="text-[#e67e22] hover:underline">7. REFUNDS POLICY</a></p>
                            <p><a href="#software" className="text-[#e67e22] hover:underline">8. SOFTWARE</a></p>
                            <p><a href="#prohibited-activities" className="text-[#e67e22] hover:underline">9. PROHIBITED ACTIVITIES</a></p>
                            <p><a href="#user-contributions" className="text-[#e67e22] hover:underline">10. USER GENERATED CONTRIBUTIONS</a></p>
                            <p><a href="#contribution-licence" className="text-[#e67e22] hover:underline">11. CONTRIBUTION LICENCE</a></p>
                            <p><a href="#advertisers" className="text-[#e67e22] hover:underline">12. ADVERTISERS</a></p>
                            <p><a href="#services-management" className="text-[#e67e22] hover:underline">13. SERVICES MANAGEMENT</a></p>
                            <p><a href="#privacy-policy" className="text-[#e67e22] hover:underline">14. PRIVACY POLICY</a></p>
                            <p><a href="#copyright" className="text-[#e67e22] hover:underline">15. COPYRIGHT INFRINGEMENTS</a></p>
                            <p><a href="#term-termination" className="text-[#e67e22] hover:underline">16. TERM AND TERMINATION</a></p>
                            <p><a href="#modifications" className="text-[#e67e22] hover:underline">17. MODIFICATIONS AND INTERRUPTIONS</a></p>
                            <p><a href="#governing-law" className="text-[#e67e22] hover:underline">18. GOVERNING LAW</a></p>
                            <p><a href="#dispute-resolution" className="text-[#e67e22] hover:underline">19. DISPUTE RESOLUTION</a></p>
                            <p><a href="#corrections" className="text-[#e67e22] hover:underline">20. CORRECTIONS</a></p>
                            <p><a href="#disclaimer" className="text-[#e67e22] hover:underline">21. DISCLAIMER</a></p>
                            <p><a href="#limitations" className="text-[#e67e22] hover:underline">22. LIMITATIONS OF LIABILITY</a></p>
                            <p><a href="#indemnification" className="text-[#e67e22] hover:underline">23. INDEMNIFICATION</a></p>
                            <p><a href="#user-data" className="text-[#e67e22] hover:underline">24. USER DATA</a></p>
                            <p><a href="#electronic-communications" className="text-[#e67e22] hover:underline">25. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</a></p>
                            <p><a href="#miscellaneous" className="text-[#e67e22] hover:underline">26. MISCELLANEOUS</a></p>
                            <p><a href="#contact-us" className="text-[#e67e22] hover:underline">27. CONTACT US</a></p>
                        </div>

                        {/* Section 1 */}
                        <h2 id="our-services" className="font-semibold text-black mt-8 mb-2">OUR SERVICES</h2>
                        <p className="text-justify">
                            The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                        </p>

                        {/* Section 2 */}
                        <h2 id="intellectual-property" className="font-semibold text-black mt-8 mb-2">INTELLECTUAL PROPERTY RIGHTS</h2>
                        <p className="font-medium text-black mt-4 mb-2">Our intellectual property</p>
                        <p className="text-justify">
                            We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &apos;Content&apos;), as well as the trademarks, service marks, and logos contained therein (the &apos;Marks&apos;).
                        </p>
                        <p className="text-justify">
                            Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
                        </p>
                        <p className="text-justify">
                            The Content and Marks are provided in or through the Services &apos;AS IS&apos; for your personal, non-commercial use only.
                        </p>

                        <p className="font-medium text-black mt-4 mb-2">Your use of our Services</p>
                        <p className="text-justify">
                            Subject to your compliance with these Legal Terms, including the &apos;PROHIBITED ACTIVITIES&apos; section below, we grant you a non-exclusive, non-transferable, revocable licence to:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Access the Services; and</li>
                            <li>Download or print a copy of any portion of the Content to which you have properly gained access.</li>
                        </ul>
                        <p className="text-justify">Solely for your personal, non-commercial use.</p>

                        <p className="text-justify">
                            Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                        </p>

                        {/* Section 3 */}
                        <h2 id="user-representations" className="font-semibold text-black mt-8 mb-2">USER REPRESENTATIONS</h2>
                        <p className="text-justify">
                            By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorised purpose; and (7) your use of the Services will not violate any applicable law or regulation.
                        </p>

                        {/* Section 4 */}
                        <h2 id="user-registration" className="font-semibold text-black mt-8 mb-2">USER REGISTRATION</h2>
                        <p className="text-justify">
                            You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                        </p>

                        {/* Section 5 */}
                        <h2 id="products" className="font-semibold text-black mt-8 mb-2">PRODUCTS</h2>
                        <p className="text-justify">
                            All products are subject to availability. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.
                        </p>

                        {/* Section 6 */}
                        <h2 id="purchases-payment" className="font-semibold text-black mt-8 mb-2">PURCHASES AND PAYMENT</h2>
                        <p className="text-justify">We accept the following forms of payment:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Credit/Debit</li>
                            <li>Naira bank transfer</li>
                            <li>Bitcoin payment</li>
                            <li>USDT TRON payment and other crypto payments</li>
                        </ul>
                        <p className="text-justify">
                            You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in US dollars.
                        </p>

                        {/* Section 7 */}
                        <h2 id="refunds-policy" className="font-semibold text-black mt-8 mb-2">REFUNDS POLICY</h2>
                        <p className="text-justify">
                            All sales processed directly on the Mrpfx.com website or on any social networks affiliated with the Mr P Fx brand (Mr P worldwide Ventures are final and no refund will be issued.
                        </p>

                        {/* Section 8 */}
                        <h2 id="software" className="font-semibold text-black mt-8 mb-2">SOFTWARE</h2>
                        <p className="text-justify">
                            We may include software for use in connection with our Services. If such software is accompanied by an end user licence agreement (&apos;EULA&apos;), the terms of the EULA will govern your use of the software. If such software is not accompanied by a EULA, then we grant to you a non-exclusive, revocable, personal, and non-transferable licence to use such software solely in connection with our services and in accordance with these Legal Terms.
                        </p>

                        {/* Section 9 */}
                        <h2 id="prohibited-activities" className="font-semibold text-black mt-8 mb-2">PROHIBITED ACTIVITIES</h2>
                        <p className="text-justify">
                            You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavours except those that are specifically endorsed or approved by us.
                        </p>
                        <p className="text-justify">As a user of the Services, you agree not to:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Systematically retrieve data or other content from the Services to create or compile a collection, database, or directory without written permission from us.</li>
                            <li>Trick, defraud, or mislead us and other users.</li>
                            <li>Circumvent, disable, or interfere with security-related features of the Services.</li>
                            <li>Disparage, tarnish, or otherwise harm us and/or the Services.</li>
                            <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                            <li>Upload or transmit viruses, Trojan horses, or other harmful material.</li>
                            <li>Engage in any automated use of the system.</li>
                            <li>Attempt to impersonate another user or person.</li>
                            <li>Harass, annoy, intimidate, or threaten any of our employees or agents.</li>
                            <li>Sell or otherwise transfer your profile.</li>
                            <li>Resell any product from the website paid or free.</li>
                        </ul>

                        {/* Section 10 */}
                        <h2 id="user-contributions" className="font-semibold text-black mt-8 mb-2">USER GENERATED CONTRIBUTIONS</h2>
                        <p className="text-justify">
                            The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services (collectively, &apos;Contributions&apos;). Contributions may be viewable by other users of the Services and through third-party websites.
                        </p>

                        {/* Section 11 */}
                        <h2 id="contribution-licence" className="font-semibold text-black mt-8 mb-2">CONTRIBUTION LICENCE</h2>
                        <p className="text-justify">
                            By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions for any purpose, commercial, advertising, or otherwise.
                        </p>

                        {/* Section 12 */}
                        <h2 id="advertisers" className="font-semibold text-black mt-8 mb-2">ADVERTISERS</h2>
                        <p className="text-justify">
                            We allow advertisers to display their advertisements and other information in certain areas of the Services, such as sidebar advertisements or banner advertisements. We simply provide the space to place such advertisements, and we have no other relationship with advertisers.
                        </p>

                        {/* Section 13 */}
                        <h2 id="services-management" className="font-semibold text-black mt-8 mb-2">SERVICES MANAGEMENT</h2>
                        <p className="text-justify">
                            We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who violates the law or these Legal Terms; (3) refuse, restrict access to, limit the availability of, or disable any of your Contributions; (4) remove from the Services or otherwise disable all files and content that are excessive in size or are burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property.
                        </p>

                        {/* Section 14 */}
                        <h2 id="privacy-policy" className="font-semibold text-black mt-8 mb-2">PRIVACY POLICY</h2>
                        <p className="text-justify">
                            We care about data privacy and security. By using the Services, you agree to be bound by our Privacy Policy posted on the Services, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United States.
                        </p>

                        {/* Section 15 */}
                        <h2 id="copyright" className="font-semibold text-black mt-8 mb-2">COPYRIGHT INFRINGEMENTS</h2>
                        <p className="text-justify">
                            We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us using the contact information provided below.
                        </p>

                        {/* Section 16 */}
                        <h2 id="term-termination" className="font-semibold text-black mt-8 mb-2">TERM AND TERMINATION</h2>
                        <p className="text-justify">
                            These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES TO ANY PERSON FOR ANY REASON OR FOR NO REASON.
                        </p>

                        {/* Section 17 */}
                        <h2 id="modifications" className="font-semibold text-black mt-8 mb-2">MODIFICATIONS AND INTERRUPTIONS</h2>
                        <p className="text-justify">
                            We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Services without notice at any time.
                        </p>

                        {/* Section 18 */}
                        <h2 id="governing-law" className="font-semibold text-black mt-8 mb-2">GOVERNING LAW</h2>
                        <p className="text-justify">
                            These Legal Terms shall be governed by and defined following the laws of Nigeria. Mr_P Worldwide Ventures and yourself irrevocably consent that the courts of Nigeria shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
                        </p>

                        {/* Section 19 */}
                        <h2 id="dispute-resolution" className="font-semibold text-black mt-8 mb-2">DISPUTE RESOLUTION</h2>
                        <p className="font-medium text-black mt-4 mb-2">Informal Negotiations</p>
                        <p className="text-justify">
                            To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms, the Parties agree to first attempt to negotiate any Dispute informally for at least nine hundred (900) days before initiating arbitration.
                        </p>

                        {/* Section 20 */}
                        <h2 id="corrections" className="font-semibold text-black mt-8 mb-2">CORRECTIONS</h2>
                        <p className="text-justify">
                            There may be information on the Services that contains typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
                        </p>

                        {/* Section 21 */}
                        <h2 id="disclaimer" className="font-semibold text-black mt-8 mb-2">DISCLAIMER</h2>
                        <p className="text-justify">
                            THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.
                        </p>

                        {/* Section 22 */}
                        <h2 id="limitations" className="font-semibold text-black mt-8 mb-2">LIMITATIONS OF LIABILITY</h2>
                        <p className="text-justify">
                            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST CAPITAL, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES.
                        </p>

                        {/* Section 23 */}
                        <h2 id="indemnification" className="font-semibold text-black mt-8 mb-2">INDEMNIFICATION</h2>
                        <p className="text-justify">
                            You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys&apos; fees and expenses, made by any third party due to or arising out of your use of the Services.
                        </p>

                        {/* Section 24 */}
                        <h2 id="user-data" className="font-semibold text-black mt-8 mb-2">USER DATA</h2>
                        <p className="text-justify">
                            We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services.
                        </p>

                        {/* Section 25 */}
                        <h2 id="electronic-communications" className="font-semibold text-black mt-8 mb-2">ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
                        <p className="text-justify">
                            Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communication be in writing.
                        </p>

                        {/* Section 26 */}
                        <h2 id="miscellaneous" className="font-semibold text-black mt-8 mb-2">MISCELLANEOUS</h2>
                        <p className="text-justify">
                            These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision.
                        </p>

                        {/* Section 27 */}
                        <h2 id="contact-us" className="font-semibold text-black mt-8 mb-2">CONTACT US</h2>
                        <p className="text-justify">
                            In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
                        </p>
                        <div className="mt-4 space-y-1">
                            <p className="font-semibold">Mr_P Worldwide Ventures</p>
                            <p>Ikbpobahill</p>
                            <p>Benin City, Edo 300105</p>
                            <p>Nigeria</p>
                            <p>Phone: <a href="tel:+2347020870022" className="text-[#e67e22] hover:underline">+2347020870022</a></p>
                            <p>Email: <a href="mailto:Mrpfxworld1@gmail.com" className="text-[#e67e22] hover:underline">Mrpfxworld1@gmail.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;

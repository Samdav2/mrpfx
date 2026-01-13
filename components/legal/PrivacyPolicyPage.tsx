'use client';

const PrivacyPolicyPage = () => {
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
                            Privacy Policy
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
                            This privacy policy explains how MrP Fx collects, uses, and protects your personal information when you visit our website and use our services. By using our website and services, you consent to our privacy policy and agree to our terms and conditions.
                        </p>

                        {/* Section 1 */}
                        <h2 className="font-semibold text-black mt-8 mb-2">What Information Do We Collect?</h2>
                        <p className="text-justify">
                            We collect information from you when you register on our website, pay for our services, contact us, or use our services. The information we collect may include:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Your name, email address, phone number, and other contact details</li>
                            <li>Your payment information, such as credit/debit card number, expiration date, and security code</li>
                            <li>Your bank account or crypto wallet details, when you choose to receive a payout from us</li>
                            <li>Your IP address, browser type, device type, and other technical information</li>
                            <li>Your browsing activity, preferences, feedback, and other usage information</li>
                        </ul>

                        {/* Section 2 */}
                        <h2 className="font-semibold text-black mt-8 mb-2">How Do We Use Your Information?</h2>
                        <p className="text-justify">We use your information for the following purposes:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>To provide you with our services and fulfill your requests</li>
                            <li>To communicate with you and respond to your inquiries</li>
                            <li>To process your payments and issue refunds, if applicable</li>
                            <li>To monitor your trading activity and ensure compliance with our rules and guidelines</li>
                            <li>To improve our website and services and customize your experience</li>
                            <li>To prevent fraud, detect errors, and resolve disputes</li>
                            <li>To enforce our terms and conditions and protect our rights and interests</li>
                            <li>To comply with legal obligations and regulatory requirements</li>
                        </ul>

                        {/* Section 3 */}
                        <h2 className="font-semibold text-black mt-8 mb-2">How Do We Protect Your Information?</h2>
                        <p className="text-justify">
                            We take reasonable measures to protect your information from unauthorized access, use, disclosure, alteration, or destruction. We use secure servers, encryption, firewalls, and other security technologies to safeguard your information. We also limit access to your information to our employees, agents, and contractors who need it to perform their duties. However, please note that no method of transmission or storage is 100% secure, and we cannot guarantee the absolute security of your information.
                        </p>

                        {/* Section 4 */}
                        <h2 className="font-semibold text-black mt-8 mb-2">How Do We Share Your Information?</h2>
                        <p className="text-justify">
                            We do not sell, trade, or rent your information to third parties for marketing purposes. We may share your information with third parties only in the following situations:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>With your consent or at your request</li>
                            <li>With our service providers, partners, and affiliates who help us provide our services and operate our business</li>
                            <li>With law enforcement, regulators, courts, or other authorities when required by law or necessary to protect our rights and interests</li>
                            <li>With other parties involved in a merger, acquisition, sale, or transfer of our business or assets</li>
                        </ul>

                        {/* Section 5 */}
                        <h2 className="font-semibold text-black mt-8 mb-2">How Do We Use Cookies and Other Tracking Technologies?</h2>
                        <p className="text-justify">
                            We use cookies and other tracking technologies to collect and store information about your visit and use of our website and services. Cookies are small files that are placed on your browser or device by websites you visit. They help us recognize you, remember your preferences, analyze your behavior, and improve our website and services. You can manage your cookie settings in your browser or device, but please note that some features of our website and services may not function properly without cookies.
                        </p>

                        {/* Section 6 */}
                        <h2 className="font-semibold text-black mt-8 mb-2">What Are Your Choices and Rights?</h2>
                        <p className="text-justify">You have the following choices and rights regarding your information:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>You can access, review, update, correct, or delete your information by contacting us at <a href="https://mrpfx.com" className="text-[#e67e22] hover:underline">Mrpfx.com</a> or <a href="tel:+2349076804442" className="text-[#e67e22] hover:underline">+2349076804442</a></li>
                            <li>You can opt-out of receiving marketing emails from us by following the unsubscribe link in the email or contacting us at <a href="https://mrpfx.com" className="text-[#e67e22] hover:underline">Mrpfx.com</a> or <a href="tel:+2349076804442" className="text-[#e67e22] hover:underline">+2349076804442</a></li>
                            <li>You can request a copy of your information or ask us to transfer it to another service provider by contacting us at <a href="https://mrpfx.com" className="text-[#e67e22] hover:underline">Mrpfx.com</a> or <a href="tel:+2349076804442" className="text-[#e67e22] hover:underline">+2349076804442</a></li>
                            <li>You can withdraw your consent or object to our use of your information for certain purposes by contacting us at <a href="https://mrpfx.com" className="text-[#e67e22] hover:underline">Mrpfx.com</a> or <a href="tel:+2349076804442" className="text-[#e67e22] hover:underline">+2349076804442</a></li>
                        </ul>

                        {/* Section 7 */}
                        <h2 className="font-semibold text-black mt-8 mb-2">How Do We Update Our Privacy Policy?</h2>
                        <p className="text-justify">
                            We may update our privacy policy from time to time to reflect changes in our practices, laws, or regulations. We will notify you of any material changes by posting a notice on our website or sending you an email. Your continued use of our website and services after the effective date of the updated policy constitutes your acceptance of the changes.
                        </p>

                        {/* Section 8 */}
                        <h2 className="font-semibold text-black mt-8 mb-2">How To Contact Us?</h2>
                        <p className="text-justify">
                            If you have any questions or concerns about our privacy policy or our handling of your information, please contact us at <a href="https://mrpfx.com" className="text-[#e67e22] hover:underline">Mrpfx.com</a> or <a href="tel:+2349076804442" className="text-[#e67e22] hover:underline">+2349076804442</a>. We are always happy to hear from you and assist you with the best of our abilities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;

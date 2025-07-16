import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Crown, Zap, Shield, Star } from 'lucide-react';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for students and entry-level professionals',
      features: [
        '3 resume templates',
        '1 resume creation',
        'Basic AI suggestions',
        'PDF export',
        'Email support'
      ],
      notIncluded: [
        'Advanced AI optimization',
        'Premium templates',
        'ATS scoring',
        'Priority support'
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
      popular: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'Best for professionals actively job searching',
      features: [
        'All 50+ templates',
        'Unlimited resumes',
        'Advanced AI optimization',
        'ATS scoring & feedback',
        'Multiple export formats',
        'Priority email support',
        'Cover letter builder',
        'LinkedIn optimization'
      ],
      notIncluded: [
        'Phone support',
        'Custom branding'
      ],
      buttonText: 'Start Pro Trial',
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For teams and career services organizations',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom templates',
        'White-label solution',
        'Advanced analytics',
        'Phone support',
        'Custom integrations',
        'Dedicated account manager'
      ],
      notIncluded: [],
      buttonText: 'Contact Sales',
      buttonStyle: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to Pro features until the end of your current billing period.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with our service, contact us within 30 days for a full refund.'
    },
    {
      question: 'How does the AI optimization work?',
      answer: 'Our AI analyzes your resume content, compares it with industry standards, and provides specific suggestions to improve your chances of getting noticed by employers and passing ATS systems.'
    },
    {
      question: 'Can I use my resumes offline?',
      answer: 'Once you export your resume as a PDF, you can use it offline. However, editing and AI features require an internet connection.'
    },
    {
      question: 'Do you offer team discounts?',
      answer: 'Yes, we offer volume discounts for teams of 10 or more users. Contact our sales team for custom pricing.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Choose the plan that fits your needs. All plans include our core features 
              and 30-day money-back guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-sm p-8 relative ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center opacity-50">
                      <div className="h-5 w-5 mr-3 flex items-center justify-center">
                        <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <span className="text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors text-center block ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ResumeAI Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get access to advanced features that can significantly improve your job search success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Advanced AI Optimization
              </h3>
              <p className="text-gray-600">
                Get personalized suggestions based on your industry and target roles.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ATS Optimization
              </h3>
              <p className="text-gray-600">
                Ensure your resume passes Applicant Tracking Systems with confidence.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Premium Templates
              </h3>
              <p className="text-gray-600">
                Access to exclusive templates designed by industry professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Have questions? We've got answers.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Boost Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their careers with ResumeAI.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-block"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
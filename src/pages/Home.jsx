import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Button, Card } from '../components/common/index';

/**
 * Home Page - Landing page for the application
 * Fully responsive design - works on all devices
 * Shows hero section, how it works, features, and call to action
 */
export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Fully Responsive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 sm:mb-6">
          Generate Business Requirements <br className="hidden sm:inline" />
          Documents <br />
          <span className="text-primary">From Conversations</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
          Extract requirements, detect conflicts, and generate comprehensive BRDs
          from your team conversations across all platforms.
        </p>
        <Link to="/signup">
          <Button className="text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3">Get Started Free</Button>
        </Link>
      </section>

      {/* How It Works Section - Fully Responsive */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-text-primary mb-8 sm:mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {/* Step 1 */}
            <Card className="text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔗</div>
              <h3 className="font-semibold text-base sm:text-lg text-text-primary mb-2">
                1. Connect Platforms
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                Connect your communication platforms including Gmail, Slack,
                Discord, and WhatsApp.
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💬</div>
              <h3 className="font-semibold text-base sm:text-lg text-text-primary mb-2">
                2. Select Conversations
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                Choose which conversations and discussions contain your
                requirements.
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🤖</div>
              <h3 className="font-semibold text-base sm:text-lg text-text-primary mb-2">
                3. AI Extracts & Detects
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                Our AI extracts facts and automatically detects conflicting
                requirements.
              </p>
            </Card>

            {/* Step 4 */}
            <Card className="text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📋</div>
              <h3 className="font-semibold text-base sm:text-lg text-text-primary mb-2">
                4. Generate BRD
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                Get a professionally formatted Business Requirements Document
                ready for use.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section - Fully Responsive */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-text-primary mb-8 sm:mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Feature 1 */}
            <Card>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚠️</div>
              <h3 className="font-semibold text-base sm:text-lg text-text-primary mb-2">
                Conflict Detection
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                Automatically identify conflicting requirements from different
                team members.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">👥</div>
              <h3 className="font-semibold text-base sm:text-lg text-text-primary mb-2">
                Human Review
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                Review and resolve conflicts manually with an intuitive
                interface.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔍</div>
              <h3 className="font-semibold text-base sm:text-lg text-text-primary mb-2">
                Traceability
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                Track every requirement back to its original source in your
                conversations.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">✏️</div>
              <h3 className="font-semibold text-base sm:text-lg text-text-primary mb-2">
                Editable BRD
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                Edit your BRD with natural language instructions and let AI
                refine it.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
              <h3 className="font-semibold text-base sm:text-lg text-text-primary mb-2">
                Fast Processing
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                Process conversations and generate BRDs in seconds, not hours.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📊</div>
              <h3 className="font-semibold text-base sm:text-lg text-text-primary mb-2">
                Analytics
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                Get insights on requirements coverage and team consensus rates.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Fully Responsive */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 sm:mb-6">
            Ready to Transform Your Requirements Process?
          </h2>
          <p className="text-base sm:text-lg text-text-secondary mb-6 sm:mb-8">
            Start generating professional BRDs from your team conversations today.
          </p>
          <Link to="/signup">
            <Button className="text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3">Create Free Account</Button>
          </Link>
        </div>
      </section>

      {/* Footer - Fully Responsive */}
      <footer className="bg-surface border-t border-border py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-secondary">
          <p className="text-xs sm:text-sm">© 2024 BRD Agent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

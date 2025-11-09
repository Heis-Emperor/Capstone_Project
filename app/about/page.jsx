import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About DeEmpire</h1>
        <p className="text-lg text-muted-foreground">Redefining Online Shopping Since 2025</p>
      </div>

      {/* Story Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-muted-foreground leading-relaxed">
          DeEmpire began with a simple yet powerful vision: to create an online shopping experience that feels as personal and trustworthy as your favorite local store. Founded in 2025, we've grown from a small startup to a thriving marketplace, serving thousands of satisfied customers worldwide.
        </p>
      </Card>

      {/* Values Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3">
          <Badge variant="secondary" className="w-fit">Quality</Badge>
          <h3 className="text-xl font-semibold">Premium Products</h3>
          <p className="text-muted-foreground">We carefully curate each product to ensure it meets our high standards of quality and value.</p>
        </Card>
        <Card className="p-6 space-y-3">
          <Badge variant="secondary" className="w-fit">Trust</Badge>
          <h3 className="text-xl font-semibold">Customer First</h3>
          <p className="text-muted-foreground">Your satisfaction is our priority. We're committed to providing exceptional service and support.</p>
        </Card>
        <Card className="p-6 space-y-3">
          <Badge variant="secondary" className="w-fit">Innovation</Badge>
          <h3 className="text-xl font-semibold">Always Evolving</h3>
          <p className="text-muted-foreground">We continuously improve our platform and expand our collection to meet your changing needs.</p>
        </Card>
      </div>

      {/* Team Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-muted-foreground leading-relaxed">
          Behind DeEmpire is a passionate team of e-commerce experts, tech enthusiasts, and customer service professionals. Together, we work tirelessly to bring you the best online shopping experience possible.
        </p>
      </Card>

      {/* Mission Section */}
      <Card className="p-6 bg-primary text-primary-foreground">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="leading-relaxed">
          "To provide accessible, high-quality products while creating an enjoyable and trustworthy shopping experience for our global community."
        </p>
      </Card>
    </div>
  );
};

export default About;
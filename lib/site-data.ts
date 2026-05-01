const siteData = {
  hero: {
    eyebrow: 'Brooklyn, NY · Women Only',
    tagline: 'Train Strong.\nLive Loud.',
    subtitle:
      'A women-only strength gym built on the belief that lifting heavy changes more than your body. Join 600+ women rewriting what strong looks like.',
  },
  stats: [
    { value: '600+', label: 'Women' },
    { value: '15', label: 'Coaches' },
    { value: '3', label: 'Locations' },
    { value: '7 yrs', label: 'Est. 2018' },
  ],
  pillars: [
    {
      title: 'Strength Training',
      desc: 'Progressive barbell, dumbbell, and machine programming designed for women at every level — from first deadlift to hitting competition total.',
    },
    {
      title: 'Mindset Coaching',
      desc: "We train the mental game as hard as the physical. Goal-setting workshops, accountability check-ins, and coaches who genuinely celebrate your wins.",
    },
    {
      title: 'Community First',
      desc: 'No judgment. No comparison. No egos. Just women showing up for themselves and each other, six days a week, every week of the year.',
    },
    {
      title: 'Nutrition Support',
      desc: "Fueling for strength is different from fueling for cardio. Our in-house nutrition coach helps you eat in a way that actually supports your goals.",
    },
  ],
  programs: [
    {
      tag: 'Beginner',
      name: 'Lift Like You Mean It',
      desc: '8-week foundational program covering squat, hinge, push, and pull. Small groups, expert coaching, and zero intimidation.',
      duration: '8 weeks',
      format: 'Group · 10 max',
    },
    {
      tag: 'Ongoing',
      name: 'Power Club',
      desc: "Our flagship membership. Daily strength classes programmed by our head coach, open floor access, and monthly strength tests to track progress.",
      duration: 'Ongoing',
      format: 'Class + Open Gym',
    },
    {
      tag: 'Intensive',
      name: '1-on-1 Coaching',
      desc: 'Private sessions with one of our certified strength coaches. Fully personalized programming, weekly check-ins, and direct coach access via app.',
      duration: '60 min',
      format: 'Private',
    },
    {
      tag: 'Anywhere',
      name: 'Online Training',
      desc: "POWER programming delivered to your phone. Video demos, form checks via upload, and weekly messaging with your coach. Train from anywhere.",
      duration: 'Self-paced',
      format: 'Remote',
    },
    {
      tag: 'Competition',
      name: 'Meet Prep',
      desc: 'Structured 12-week peaking cycles for women competing in powerlifting or weightlifting. Attempt selection, weigh-in strategy, and day-of coaching.',
      duration: '12 weeks',
      format: 'Hybrid',
    },
    {
      tag: 'Recovery',
      name: 'Strong & Restored',
      desc: 'Low-load strength training for postpartum, post-injury, or peri-menopausal women. Evidence-based, compassionate, and completely judgment-free.',
      duration: '60 min',
      format: 'Group · 8 max',
    },
  ],
  pricing: [
    {
      name: 'Starter',
      price: 79,
      desc: 'Begin your strength journey',
      featured: false,
      features: [
        '8 classes/month',
        'Access to Power Club classes',
        'Strength tracking app',
        'Community events',
      ],
    },
    {
      name: 'Power',
      price: 129,
      desc: 'Train unlimited — no limits',
      featured: true,
      features: [
        'Unlimited classes',
        'Open gym access',
        'Monthly strength test',
        'Nutrition guidance',
        'Priority booking',
      ],
    },
    {
      name: 'Elite',
      price: 199,
      desc: 'Private coaching included',
      featured: false,
      features: [
        'Unlimited + open gym',
        '2 × 1-on-1 sessions/mo',
        'Custom programming',
        'Meet prep eligible',
        'Unlimited form checks',
      ],
    },
  ],
  cta: {
    subtitle:
      'Your first week is free. Come train, meet the coaches, and feel the difference a real strength community makes.',
  },
  contact: {
    address: '142 N 3rd St, Brooklyn, NY',
    phone: '(718) 555-0382',
  },
};

export default siteData;

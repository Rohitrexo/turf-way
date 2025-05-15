import CounterAnimation from '@/components/CounterAnimation';

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      value: 30,
      suffix: '+',
      title: 'FECs Transformed',
      description: 'Successfully launched and transformed entertainment centers',
      icon: 'fas fa-building',
      color: 'primary'
    },
    {
      id: 2,
      value: 98,
      suffix: '%',
      title: 'Client Retention',
      description: 'Our clients stay with us for ongoing consultation',
      icon: 'fas fa-handshake',
      color: 'secondary'
    },
    {
      id: 3,
      value: 15,
      suffix: '+',
      title: 'Years Experience',
      description: 'Combined expertise in the entertainment industry',
      icon: 'fas fa-calendar-check',
      color: 'accent'
    },
    {
      id: 4,
      value: 250,
      suffix: 'K+',
      title: 'Annual Visitors',
      description: 'To our client venues across North America',
      icon: 'fas fa-users',
      color: 'primary'
    }
  ];

  return (
    <section id="stats" className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-element">
          <h2 className="section-heading relative">
            Our Impact by the Numbers
            <span className="absolute -bottom-2 left-1/2 w-20 h-1 bg-primary transform -translate-x-1/2"></span>
          </h2>
          <p className="section-subheading">
            TurfWay Entertainment has helped transform Family Entertainment Centers
            across North America with measurable results and lasting impact.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 reveal-element">
          {stats.map(stat => (
            <CounterAnimation
              key={stat.id}
              end={stat.value}
              suffix={stat.suffix}
              title={stat.title}
              description={stat.description}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>
        
        {/* CTA Card */}
        <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-xl p-8 shadow-xl text-white text-center reveal-element">
          <h3 className="text-2xl font-bold mb-4">Ready to transform your entertainment venue?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Join the growing list of successful Family Entertainment Centers that have partnered 
            with TurfWay Entertainment to increase revenue and enhance guest experiences.
          </p>
          <a href="#contact" className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-md hover:bg-white/90 transition-all hover:-translate-y-1 hover:shadow-lg">
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
}
const TrustedBy = () => {
  const brands = [
    {
      name: "TELUS Digital",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/TELUS_Communications_Logo.svg/200px-TELUS_Communications_Logo.svg.png",
    },
    {
      name: "Avanti-BG",
      logo: null,
      text: "AVANTI-BG",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Trusted Partners
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Trusted by Leading Brands Across Europe
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center p-6 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 md:h-14 object-contain"
                />
              ) : (
                <span className="text-2xl md:text-3xl font-display font-bold text-foreground/70">
                  {brand.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

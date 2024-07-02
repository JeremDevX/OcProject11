interface featureItemData {
  icon: string;
  title: string;
  description: string;
  alt: string;
}

const featuresItemData: featureItemData[] = [
  {
    icon: "./img/icon-chat.png",
    title: "You are our #1 priority",
    description:
      "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    alt: "Chat Icon",
  },
  {
    icon: "./img/icon-money.png",
    title: "More savings means higher rates",
    description:
      "The more you save with us, the higher your interest rate will be!",
    alt: "Money Icon",
  },
  {
    icon: "./img/icon-security.png",
    title: "Security you can trust",
    description:
      "We use top of the line encryption to make sure your data and money is always safe.",
    alt: "Security Icon",
  },
];

export default function FeatureItem() {
  return (
    <section className="features">
      {featuresItemData.map((feature, index) => (
        <div className="feature-item" key={"featureItem" + index}>
          <img src={feature.icon} alt={feature.alt} className="feature-icon" />
          <h3 className="feature-item-title">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Crown,
  Gem,
  Clock,
  Users,
  Award,
  MapPin,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/commonui/Header";
import Footer from "@/commonui/Footer";
import AnimatedPage from "@/components/AnimatedPage";
import {
  heroTextVariants,
  staggerContainer,
  staggerItem,
  hoverScale,
} from "@/lib/animations";
import { useRouter } from "next/navigation";
import Image from "next/image";

const OurStory = () => {
  const storyChapters = [
    {
      year: "1985",
      title: "The Beginning",
      subtitle: "A Dream in Zaveri Bazaar",
      content:
        "In the heart of Mumbai's iconic Zaveri Bazaar, our founder Mr. M. G. Menon started with a small workshop and a big dream. With just three artisans and a handful of tools, MGM Jewels began its journey of crafting excellence.",
      image: "founding",
      quote:
        "Every piece of jewelry tells a story, and we wanted to create stories that would be cherished for generations.",
    },
    {
      year: "1990",
      title: "First Masterpiece",
      subtitle: "The Royal Heritage Collection",
      content:
        "Our breakthrough came with the Royal Heritage Collection, inspired by traditional South Indian temple jewelry. This collection caught the attention of connoisseurs and established MGM as a name synonymous with authentic craftsmanship.",
      image: "heritage",
      quote:
        "Tradition is not about preserving the ashes, but keeping the fire alive.",
    },
    {
      year: "1995",
      title: "Expansion",
      subtitle: "Growing Beyond Boundaries",
      content:
        "From a small workshop to a flagship store, MGM Jewels expanded its horizons. We brought in master artisans from across India, each bringing their unique techniques and regional specialties to our workshop.",
      image: "expansion",
      quote:
        "Growth is not just about size, but about the depth of our craft and the trust of our customers.",
    },
    {
      year: "2000",
      title: "Digital Revolution",
      subtitle: "Embracing the Future",
      content:
        "As the new millennium dawned, MGM Jewels embraced technology while preserving tradition. We launched our first website, bringing our collections to a global audience and introducing online customization options.",
      image: "digital",
      quote:
        "Technology should enhance tradition, not replace it. We use modern tools to perfect ancient techniques.",
    },
    {
      year: "2010",
      title: "Sustainable Luxury",
      subtitle: "Ethical Craftsmanship",
      content:
        "We pioneered sustainable practices in the jewelry industry, introducing recycled gold, conflict-free diamonds, and fair trade practices. Our commitment to ethical luxury became our signature.",
      image: "sustainable",
      quote:
        "True luxury is not just about beauty, but about responsibility towards our planet and people.",
    },
    {
      year: "2020",
      title: "New Generation",
      subtitle: "Legacy Meets Innovation",
      content:
        "The third generation of the Menon family took the helm, bringing fresh perspectives while honoring our heritage. We introduced contemporary designs that appeal to modern sensibilities while maintaining traditional craftsmanship.",
      image: "innovation",
      quote:
        "Innovation is not about forgetting where we came from, but about taking our heritage forward.",
    },
    {
      year: "2024",
      title: "The Future",
      subtitle: "Crafting Tomorrow's Heirlooms",
      content:
        "Today, MGM Jewels stands as a bridge between tradition and tomorrow. We continue to innovate, create, and craft pieces that will become tomorrow's heirlooms, carrying forward a legacy of excellence.",
      image: "future",
      quote:
        "Our story continues with every piece we create, every customer we serve, and every tradition we honor.",
    },
  ];

  const artisans = [
    {
      name: "JOHN DOE",
      specialty: "Temple Jewelry",
      experience: "35 years",
      story: "Learned the art from his father, who was a court jeweler",
    },
    {
      name: "JOHN DOE",
      specialty: "Kundan Work",
      experience: "28 years",
      story: "Revived ancient Kundan techniques with modern precision",
    },
    {
      name: "JOHN DOE",
      specialty: "Filigree",
      experience: "32 years",
      story: "Master of intricate wire work, creating delicate patterns",
    },
    {
      name: "JOHN DOE",
      specialty: "Stone Setting",
      experience: "25 years",
      story: "Expert in setting precious stones with minimal metal visibility",
    },
  ];

  const achievements = [
    {
      icon: Crown,
      title: "Royal Warrant",
      description: "Official jeweler to royal families across India",
    },
    {
      icon: Award,
      title: "National Recognition",
      description: "Multiple awards for excellence in craftsmanship",
    },
    {
      icon: Gem,
      title: "Purity Certified",
      description: "BIS Hallmark certification for all gold jewelry",
    },
    {
      icon: Star,
      title: "Customer Choice",
      description: "Highest rated jewelry brand for 10 consecutive years",
    },
  ];

  const router = useRouter();
  const handleExploreCollections = () => {
    router.push("/collections");
  };

  // const handleBookConsultation = () => {
  //   navigate("/book-appointment");
  // };
  return (
    <AnimatedPage className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/story-header.png"
              alt="story"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/95 via-foreground/85 to-foreground/75" />
            <div className="absolute inset-0 bg-gradient-mgm opacity-70" />
          </div>

          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              variants={heroTextVariants}
              initial="initial"
              animate="animate"
              className="max-w-4xl text-primary-foreground"
            >
              <span className="inline-block text-gold font-medium tracking-widest uppercase mb-4">
                Our Legacy
              </span>
              <h1 className="font-elegant text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                A Journey of{" "}
                <span className="text-gold-light">Craftsmanship</span> &{" "}
                <span className="text-gold-light">Tradition</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-3xl">
                From a small workshop in Zaveri Bazaar to becoming India &apos;s most
                trusted name in fine jewelry, our story is one of passion,
                perseverance, and the pursuit of perfection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div {...hoverScale}>
                  <Button
                    variant="gold"
                    size="xl"
                    className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-foreground shadow-lg hover:shadow-xl border border-yellow-200/60 hover:border-yellow-300/80 transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                  >
                    <span className="relative z-10">Begin Your Journey</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 via-yellow-200/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 via-yellow-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-transparent to-yellow-600/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-yellow-300/20 opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-bl from-yellow-300/20 via-transparent to-yellow-500/20"></div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story Timeline */}
        <section className="py-20 bg-cream">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Chapters of Excellence
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">
                Our Story Through Time
              </h2>
            </motion.div>

            <div className="space-y-24">
              {storyChapters.map((chapter, index) => (
                <motion.div
                  key={chapter.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`${index % 2 === 1 ? "md:text-right" : ""}`}>
                    <div className="mb-4">
                      <span className="text-gold font-bold text-lg">
                        {chapter.year}
                      </span>
                      <h3 className="font-display text-3xl font-bold text-foreground mt-2 mb-2">
                        {chapter.title}
                      </h3>
                      <p className="text-xl text-muted-foreground mb-4">
                        {chapter.subtitle}
                      </p>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {chapter.content}
                    </p>
                    <blockquote className="border-l-4 border-gold pl-6 italic text-muted-foreground">
                      {chapter.quote}
                    </blockquote>
                  </div>

                  <div className="relative">
                    <div className="aspect-square bg-gradient-mgm rounded-2xl shadow-2xl overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-primary-foreground">
                        <div className="text-center p-8">
                          <Sparkles className="w-16 h-16 mx-auto mb-4 text-gold" />
                          <h4 className="font-display text-xl font-bold mb-2">
                            {chapter.title}
                          </h4>
                          <p className="text-lg">{chapter.year}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl"></div>
                    <div className="absolute -top-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-3xl"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Artisans */}
        <section className="py-20 bg-gradient-mgm">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 text-primary-foreground"
            >
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Masters of Craft
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">
                The Hands Behind Our Heritage
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {artisans.map((artisan, index) => (
                <motion.div
                  key={artisan.name}
                  variants={staggerItem}
                  className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 text-primary-foreground hover:bg-background/20 transition-colors duration-300"
                >
                  <div className="w-20 h-20 bg-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {artisan.name}
                  </h3>
                  <p className="text-gold mb-2">{artisan.specialty}</p>
                  <p className="text-sm text-primary-foreground/80 mb-3">
                    {artisan.experience}
                  </p>
                  <p className="text-sm text-primary-foreground/70 italic">
                    {artisan.story}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Recognition & Trust
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">
                Milestones of Excellence
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  variants={staggerItem}
                  className="text-center p-8 rounded-2xl bg-cream/50 hover:bg-cream transition-colors duration-300"
                >
                  <achievement.icon className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20 bg-[#ece8df]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Our Philosophy
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2 mb-8">
                Crafting More Than Jewelry
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                At MGM Jewels, we believe that jewelry is more than just
                adornment. It&apos;s a celebration of life&apos;s most precious moments, a
                symbol of love and commitment, and a legacy that transcends
                generations. Every piece we create is infused with our passion
                for perfection and our commitment to preserving the rich
                heritage of Indian jewelry craftsmanship.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                  <Heart className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    Made with Love
                  </h3>
                  <p className="text-muted-foreground">
                    Each piece is crafted with passion and attention to detail
                  </p>
                </div>
                <div className="p-6">
                  <Clock className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    Timeless Design
                  </h3>
                  <p className="text-muted-foreground">
                    Creating pieces that never go out of style
                  </p>
                </div>
                <div className="p-6">
                  <Gem className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    Lasting Quality
                  </h3>
                  <p className="text-muted-foreground">
                    Built to be cherished for generations to come
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/story-footer.png"
              alt="Traditional Indian jewelry craftsmanship with gold necklace and accessories"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/90" />
            <div className="absolute inset-0 bg-gradient-mgm opacity-60" />
          </div>

          <div className="relative container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center text-primary-foreground max-w-3xl mx-auto"
            >
              <h2 className="font-elegant text-3xl md:text-5xl font-bold mb-6">
                Become Part of Our Story
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Every piece of jewelry we create becomes part of someone&apos;s
                story. Let us help you write your next chapter with a piece
                that&apos;s as unique as you are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div {...hoverScale}>
                  <Button
                    onClick={() => handleExploreCollections()}
                    variant="gold"
                    size="xl"
                    className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-foreground shadow-lg hover:shadow-xl border border-yellow-200/60 hover:border-yellow-300/80 transition-all duration-300"
                  >
                    Explore Collections
                  </Button>
                </motion.div>
                <motion.div {...hoverScale}>
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-primary-foreground/50 hover:border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Book Consultation
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </AnimatedPage>
  );
};

export default OurStory;

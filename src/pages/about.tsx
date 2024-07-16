import Contact from "@/components/contact";
import Eyecatch from "@/components/eyecatch";
import Hero from "@/components/hero";
import Layout from "@/components/layout";
import TwoColumnLayout from "@/components/two-calumn-layout";

const AboutPage = () => {
  return (
    <Layout>
      <Hero title="About" subtitle="About developjent activities" />
      <Eyecatch src="/image/eyecatch.jpg" width={567} height={288} />
      <TwoColumnLayout>
        <div className="flex flex-col flex-1 text-base">
          <p>Cubeが得意...</p>
        </div>
        <Contact />
      </TwoColumnLayout>
    </Layout>
  );
};

export default AboutPage;

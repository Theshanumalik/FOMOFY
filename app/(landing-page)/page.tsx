import Hero from "./_components/hero";
import FAQ from "./_components/faq";
import PopupScript from "./_components/popup-script";

const Home = () => {
  return (
    <>
      <Hero />
      <FAQ />
      <PopupScript
        projectId="66dd8138cc36f7032ba35d93"
        isAppend={true}
        replayKey={1}
      />
    </>
  );
};

export default Home;

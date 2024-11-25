import Hero from "./_components/hero";
import FAQ from "./_components/faq";
import PopupScript from "./_components/popup-script";

const Home = () => {
  return (
    <>
      <Hero />
      <FAQ />
      <PopupScript
        projectId={process.env.POPUP_ID as string}
        isAppend={true}
        replayKey={1}
      />
    </>
  );
};

export default Home;

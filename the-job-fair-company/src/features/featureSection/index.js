import LeftPhotoSection from "./components/leftPhotoSection";
import RightPhotoSection from "./components/rightPhotoSection";
import leftPic from "./assets/leftPic.png";
import rightPic from "./assets/rightPic.png";

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.";

export default function FeatureSection() {
  return (
    <div className="flex flex-col">
      <RightPhotoSection
        title="Face-to-Face Recruitment"
        description={LOREM_IPSUM}
        image={rightPic}
      />
      <LeftPhotoSection
        title="Cost-effective Recruitment"
        description={LOREM_IPSUM}
        image={leftPic}
      />
      <RightPhotoSection
        title="Speak face-to-face to undreds of candidates"
        description={LOREM_IPSUM}
        image={rightPic}
      />
      <LeftPhotoSection
        title="Cost-effective Recruitment"
        description={LOREM_IPSUM}
        image={leftPic}
      />
      <RightPhotoSection
        title="Face-to-Face Recruitment"
        description={LOREM_IPSUM}
        image={rightPic}
      />
      <LeftPhotoSection
        title="Cost-effective Recruitment"
        description={LOREM_IPSUM}
        image={leftPic}
      />
      <RightPhotoSection
        title="Speak face-to-face to undreds of candidates"
        description={LOREM_IPSUM}
        image={rightPic}
      />
      <LeftPhotoSection
        title="Cost-effective Recruitment"
        description={LOREM_IPSUM}
        image={leftPic}
      />
    </div>
  );
}
